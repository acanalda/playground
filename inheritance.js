function A(a){
  this.varA = a;
  console.log('A created');
}

// What is the purpose of including varA in the prototype when A.prototype.varA will always be shadowed by
// this.varA, given the definition of function A above?
A.prototype = {
  varA : null,  // Shouldn't we strike varA from the prototype as doing nothing?
      // perhaps intended as an optimization to allocate space in hidden classes?
      // https://developers.google.com/speed/articles/optimizing-javascript#Initializing instance variables
      // would be valid if varA wasn't being initialized uniquely for each instance
  doSomething : function(){
    // ...
  }
}

function B(a, b){
  A.call(this, a);
  this.varB = b;
  console.log('B created');
}
B.prototype = Object.create(A.prototype, {
  varB : {
    value: null, 
    enumerable: true, 
    configurable: true, 
    writable: true 
  },
  doSomething : { 
    value: function(){ // override
      A.prototype.doSomething.apply(this, arguments); // call super
      console.log('asdasd');
    },
    enumerable: true,
    configurable: true, 
    writable: true
  }
});
B.prototype.constructor = B;

console.log(B.prototype.constructor());
var b = new B(1, 2);
b.doSomething();

console.log(b);

console.log(B.prototype.constructor === B);

var C = function(){
  this.x = 1;
};

var D = function(){
  C.call(this);
  this.y = 2;
};

D.prototype = new C();
D.prototype.constructor = D;
var d = new D();

console.log('theTree.constructor is ' + d.constructor);
console.log(d);

D();
//console.log(global);
