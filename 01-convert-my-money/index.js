const express = require('express');
const app = express();
const path = require('path');

const convert = require('./libs/convert');

// set view engine
app.set('view engine', 'ejs');
// set views directory
app.set('views', path.join(__dirname, 'views'));
// set static files directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cotacao', (req, res) => {
    const {cotacao, valor} = req.query;
    const resultado = convert.convert(cotacao, valor);

    console.log(`Valor dolar: ${valor}`)
    console.log(`Cotacao: ${cotacao}`)
    console.log(`Resultado: ${resultado}`)

    if(cotacao && valor){
        res.render('cotacao', {
            error: false,
            valor: convert.toMoney(valor),
            cotacao: convert.toMoney(cotacao),
            resultado: convert.toMoney(resultado)
        });
    } else{
        res.render('cotacao', {
            error: 'Valores inválidos!'
        });
    }
});

const port = 3333;
app.listen(port, err =>{
    if(err) console.log('Ocorreu algum erro :(');
    else console.log(`ConvertMyMoney rodando na porta ${port}`);
})