console.log(reverse([1,2,3,4,5,6]));

function reverse(arr){
  if(arr.length === 0)
	return [];

  return [arr.pop()].concat(reverse(arr));
}
