const port = process.env.PORT || 3333; // add default port to deploy or local
const mongoURL = process.env.MONGODB || 'mongodb://localhost/minhas-series'; // add default mongoDB URL to deploy or local

// configuration Express
const express = require('express');
const app = express();
app.use(express.static('public')); // define assets directory

// configuration ROUTES
const pages = require('./routes/pages');

// configuration Body Parser(request body)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// configuration Mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// configuration EJS
const path = require('path');
app.set('view engine', 'ejs'); // define EJS as view engine
app.set('views', path.join(__dirname, 'views')); // define default directory to views

// ROUTES
app.use('/', pages);

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}...`);
    })
  })
  .catch(err => {
    console.log('Erro: '+err)
  });