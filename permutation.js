var req = require('./inheritance');
console.log('LOOOOOOOK' + global.y);
var ARR = ['a', 'b', 'c'];

perm(ARR);

function perm(arr, cur_list){
   if(!cur_list) cur_list = [];

   if(cur_list.length === arr.length)
   {
      console.log(cur_list);
      return;
   }

   for(var i = 0;i<arr.length;i++){
     var cur_char = arr[i];

     if(cur_list.indexOf(cur_char) < 0)
         perm(arr, cur_list.concat([cur_char]));
   }
}
