var cluster = require('cluster'), os = require('os'), util = require('util');
var CHARS = 'abcdefghijklmnopqrstuvwxyz', TABLE = [], SIZE = 5000, WORD = process.env.word || 'hola',
  start_time = Date.now(), count = 0, row;

// Create random array
for(var i = 0;i < SIZE;i++){
  row = [];
  for(var j = 0;j < SIZE;j++)row.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
  TABLE.push(row);
}
// Word search
function contains(table, word, index, inc_i, inc_j){
  var i = Math.floor(index/TABLE[0].length), j = index - (i * TABLE[0].length);
  i += inc_i; j += inc_j;
  // Check return
  if(word.length == 0)return 1;
  if(i < 0 || i >= table.length || j < 0 || j >= table[0].length || table[i][j] !== word[0]) return 0;
  // Recursive
  if(inc_i === 0 && inc_j === 0){
    return contains(table, word.substr(1), index,  1, 0) +
      contains(table, word.substr(1), index, -1, 0) +
      contains(table, word.substr(1), index, 0,  1) +
      contains(table, word.substr(1), index, 0, -1);
  }else if(inc_i !== 0)
    return contains(table, word.substr(1), index, inc_i + (inc_i / Math.abs(inc_i)), 0);
  else
    return contains(table, word.substr(1), index, 0, inc_j + (inc_j / Math.abs(inc_j)));
}
// Clustering
if(cluster.isMaster){
  var num_results = 0;
  start_time = Date.now();
  for(var i = 0;i < SIZE * SIZE;i++)count += contains(TABLE, WORD, i, 0, 0);
  console.log(util.format('[MASTER] Found %s times ¨%s¨ (%sms)', count, WORD, Date.now() - start_time));
  start_time = Date.now();
  for(i = 0;i < os.cpus().length;i++){
    cluster.fork();
    cluster.workers[i+1].on('message', function(msg){
      var time = Date.now() - start_time;
      console.log(util.format('[PID %s] Found %s times ¨%s¨', this.process.pid, msg, WORD));
      num_results++;
      this.kill();
      if(num_results === os.cpus().length)
        console.log(util.format('[WORKERS] Total time: %sms (avg %sms)', time, time / os.cpus().length));
    });
  }
}else{
  for(var i = 0;i < SIZE * SIZE;i++) count += contains(TABLE, WORD, i, 0, 0);
  cluster.worker.send(count);
}