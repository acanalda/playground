var str = 'Arturo';

console.log(replaceChar(str, 'o', 'a'));


function replaceChar(str, from, to, index){
  index = index || 0;
  
  if(index === str.length) return str;
  if(str[index] === from){
   str = str.substr(0, index) + to + str.substr(index + 1);
  } 
  return replaceChar(str, from, to, index+1);
}
