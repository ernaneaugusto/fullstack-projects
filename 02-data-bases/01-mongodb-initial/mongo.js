const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/intro-mongo', (err, database) => {
  const db = database.db('intro-mongo') 
  const pessoas = db.collection('pessoas');
  
  // INSERT
  pessoas.insert({ 
    nome: 'Teste apenas um teste',
    nascimento: '2000-08-05'
  }, (err, res) => { 
    console.log(err, res) 
  });

  // SELECT
  const cursorPessoas = pessoas.find({});
  cursorPessoas.forEach(item => {
    console.log(item);
  });

  // UPDATE
  // pessoas.update(
  //   {
  //     _id: mongodb.ObjectID('5cd9e88d6ff11900c81b8422')
  //   },
  //   {
  //     $set: {
  //       nome: 'Ernane Cipriano'        
  //     }
  //   }, (err, res) => console.log(res)
  // );

  // DELETE
  // pessoas.remove(
  //   {
  //     _id: mongodb.ObjectID('5cd9f32359f2912e8ca8ec98')
  //   }, (err, res) => console.log(res)
  // );
});