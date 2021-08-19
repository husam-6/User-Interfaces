function swapItems(first, second){
  let [tmp] = test.splice(first,1); 
  test.splice(second,0, tmp);
  return test; 
}

let test = ['one', 'two', 'three', 'four'];
//console.log(swapItems(1,0));

let bruh = new Date();
let te = new Date();
console.log(te.getDate())
//console.log(bruh);
console.log(String(bruh.getDate()));