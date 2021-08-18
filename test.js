function swapItems(first, second){
  let [tmp] = test.splice(first,1); 
  test.splice(second,0, tmp);
  return test; 
}

let test = ['one', 'two', 'three', 'four']
console.log(swapItems(1,0));