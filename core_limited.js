/*
* Description: This code creates a new process per each CPU core. Each of those process listen to localhost:8000.
* The balancer takes care of calls to port 8000 and redirects them to one of the available workers. Every worker is
* going to process a request during his lifetime. Then, it suicides. It means you can call localhost:8000 as
* many times as number of cores you have on your CPU.
* Usage: Call localhost:8000 from an http client.
* Libraries: All nodeJS native. Avoided external libraries (async, ...) for an easy deploy/usage
* *** Attention ***: Calls from browsers also request favicon.ico, so you´ll get two calls
* */

var cluster = require('cluster'),
  http = require('http'),
  os = require('os'),
  util = require('util');

// Constant strings
var MESSAGE_CMD = {
  MASTER: {
    UPDATE_NUM_REQUESTS: 'master_update_num_requests'
  },
  WORKER: {
    UPDATE_NUM_REQUESTS: 'worker_update_num_requests'
  }
};

var num_cpu = os.cpus().length,
  num_requests = 0;

// If it´s the master process
if(cluster.isMaster){
  // Create workers (one per CPU)
  console.log(util.format('[%s] Number of CPUs: %s', 'MASTER', num_cpu));
  for(var i = 0; i < num_cpu; i++) cluster.fork();

  // Listen to worker messages
  Object.keys(cluster.workers).forEach(function(id){
    cluster.workers[id].on('message', function(msg){
      if(msg.cmd === MESSAGE_CMD.WORKER.UPDATE_NUM_REQUESTS){
        num_requests++;
        this.send({cmd: MESSAGE_CMD.MASTER.UPDATE_NUM_REQUESTS, value: num_requests});
        console.log(util.format('[%s] Number of requests: %s', 'MASTER', num_requests));
      }
    });
  });

  // On fork created
  cluster.on('fork', function(worker){
    console.log(util.format('[%s] Worker %s (PID-%s): forked', 'MASTER', worker.id, worker.process.pid));
  });

  // On new process listening from ip:port
  cluster.on('listening', function(worker, address){
    console.log(util.format('[%s] Worker %s (PID-%s): listening on %s:%s',
      'MASTER', worker.id, worker.process.pid, address.address, address.port));
  });

  // On process exit
  cluster.on('exit', function(worker, code, signal){
    console.log(util.format('[%s] Worker %s (PID-%s): died', 'MASTER', worker.id, worker.process.pid));
    console.log(util.format('[%s] Number of workers left: %s', 'MASTER', Object.keys(cluster.workers).length));
  });
}
// If it´s a worker
else{
  // Create the http server
  http.createServer(function(req, res){
    // Listen to messages coming from master containing the updated number of requests.
    // Once received, we can proceed to send the reply to the client
    cluster.worker.on('message', function(msg){
      if(msg.cmd === MESSAGE_CMD.MASTER.UPDATE_NUM_REQUESTS){
        res.end(util.format('Worker %s (PID-%s) says: Bye bye\nNum requests: %s',
          cluster.worker.id, cluster.worker.process.pid, msg.value));
        cluster.worker.kill();
      }
    });
    // Send a message to master to update the num of current requests. It will make the master to send a message back
    // with the updated value. So the worker can reply the client´s request
    process.send({cmd: MESSAGE_CMD.WORKER.UPDATE_NUM_REQUESTS});
  }).listen(8000);
}