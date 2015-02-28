var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  var worker = cluster.fork();

  cluster.on('online', function(worker) {
    worker.send('hi there');
  });

} else if (cluster.isWorker) {
  process.on('message', function(msg) {
    console.log()
  });
}