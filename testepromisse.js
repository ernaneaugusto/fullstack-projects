// ***** 01. Promisses ***** //

// function tempo(ms){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// }

// function tempo2(ms){
//   return new Promise((resolve, reject) => {
//     resolve();
//   });
// }

// tempo(2000)
// .then(() => console.log('deu certo /o/'));

// tempo2(2100)
// .then(() => console.log("\ndeu certo 2 /o/"));


// ***** 02. Async/Await ***** //
const fs = require('fs');

function readDir(path){
  return new Promise((resolve, reject) => {
    fs.readdir(path, function(err, listFiles) {
      if(err) reject(err);
      else resolve(listFiles);
    });
  });
}

// fncao assincrona
async function readCurrentDirectory(){
  const listItems = await readDir('./');
  console.log(listItems);
}

readCurrentDirectory();