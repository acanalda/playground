var cluster = require('cluster'),
  os = require('os'),
  util = require('util');

var CHARS = 'abcdefghijklmnopqrstuvwxyz', TABLE = [], SIZE = 5000, WORD = 'hola';

// Create random array
for(var i = 0;i < SIZE;i++){
  var ROW = [];
  for(var j = 0;j < SIZE;j++)
    ROW.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
  TABLE.push(ROW);
}

function contains(table, word, index, inc_i, inc_j){
  var i = Math.floor(index/TABLE[0].length);
  j = index - (i * TABLE[0].length);
  i += inc_i;
  j += inc_j;
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

var start_time = Date.now(),
  count = TABLE.reduce(function(prev, cur, i){
    return prev + TABLE[i].reduce(function(prev, cur, j){
      return prev + contains(TABLE, WORD, TABLE[0].length * i + j, 0, 0);
    }, 0)
  }, 0);
console.log(util.format('Found %s times %s in %sms', count, WORD, Date.now() - start_time));