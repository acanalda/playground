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

var num_cpu = os.cpus().length, num_requests = 0;

// If it´s the master process
if(cluster.isMaster){
  // Create workers (one per CPU)
  for(var i = 0; i < num_cpu; i++) cluster.fork();

  // Listen to worker messages
  Object.keys(cluster.workers).forEach(function(id){
    cluster.workers[id].on('message', function(msg){
      if(msg.cmd === MESSAGE_CMD.WORKER.UPDATE_NUM_REQUESTS){
        num_requests++;
        this.send({cmd: MESSAGE_CMD.MASTER.UPDATE_NUM_REQUESTS, value: num_requests});
      }
    });
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