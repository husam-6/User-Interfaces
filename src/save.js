export function saveFile(){
  let fs = require('fs');
  let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  fs.write("data.txt", blob);
}

