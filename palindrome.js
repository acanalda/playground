console.log(isPalindrome('arturo'))
console.log(isPalindrome('artra'))
console.log(isPalindrome('arttra'))

function isPalindrome(str){
   if(str.length === 0)
      return true;
   
   if(str[0] !== str[str.length -1])
   return false;

   return isPalindrome(str.slice(1, str.length - 1));
}
