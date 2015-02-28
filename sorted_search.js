var str = 'abcdefghijklmnop';
var char = 'k';

console.log(searchIn(char, str));

function searchIn(char, str){
  var pivot_i; 

  if(str.length === 0)
      return false;
   
  pivot_i = Math.floor(str.length / 2);
  if(str[pivot_i] === char) return true;
  if(str[pivot_i] > char) return searchIn(char, str.substr(0, pivot_i));
  return searchIn(char, str.substr(pivot_i+1));
}
