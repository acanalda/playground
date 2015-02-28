var weights = [0.1, 0.2, 0.3, 0.4];
var rep = {}; // repetitions object
var total = 100000; // num iterations
var sum = 0; // total percents

// Store all the results in rep. Use weight as key
for(var i = 0;i<total;i++){
   var val = getRand(weights);
   rep[val] = ((rep[val] * total) + 1) || 1;
   rep[val] = rep[val] / total;
}
console.log(rep);

// Sum all the probalilities (should be equal or close to 1)
for(var weight in rep){
  sum += rep[weight];
}
console.log(sum);

function getRand(weights){
  var sum = weights.reduce(function(prev, cur){
    return prev + cur;
  }),
  rand = Math.random() * sum;

  for(var i = 0;i<weights.length;i++){
    if(rand < weights[i])
	return weights[i];
    rand -= weights[i];
  }
  
  return -1;
}
