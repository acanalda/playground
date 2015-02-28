
console.log(countSpaces('esto es una broma'));

function countSpaces(str){
  if(str.length === 0)
    return 0;
  
  return ((str[0] === ' ')?1:0) + countSpaces(str.slice(1));

}
