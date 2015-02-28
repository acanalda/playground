var str = 'abcdefghijklmno';
var char = 'k';
var u = 0;
var l = str.length - 1;
var exists = false;

while(u <= l && !exists){
   var pivot_i = u + Math.floor((l - u)/2);

   if(str[pivot_i] === char)
 	exists = true;

   if(str[pivot_i] > char)
	l = pivot_i - 1;
   else
        u = pivot_i + 1;
}

console.log(exists);
