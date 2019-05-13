const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/mongo-orm')
  .then(() => {
    const pessoaSchema = mongoose.Schema({
      nome: String,
      cargo: String
    });

    const Pessoa  = mongoose.model('Pessoa', pessoaSchema);

    // INSERT
    // const pessoa1 = new Pessoa({ nome: 'Ernane Toledo', cargo: 'Dev Front-end' })
    // pessoa1.save();
    // console.log(() => console.log('Registro salvo com sucesso!\n'));

    // SELECT
    // Pessoa.find({}, (err, docs) => console.log(docs));  
    
    // DELETE
    // Pessoa.remove({
    //   _id: '5cd9f9a89e9cd723d06617ae'
    // }, (err, docs) => console.log('Usuário removido com sucesso!\n'));
  });