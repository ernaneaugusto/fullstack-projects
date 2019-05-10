const express = require('express');
const app = express();
const path = require('path');

// project modules
const convert = require('./libs/convert');
const apiBCB = require('./libs/apiBCB');

// set view engine
app.set('view engine', 'ejs');
// set views directory
app.set('views', path.join(__dirname, 'views'));
// set static files directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao();       
    console.log(cotacao);

//  cotacaoCompra: 3.9224,
//  cotacaoVenda: 3.923,
//  dataHoraCotacao: '2019-04-22 13:09:34.804'

    if(cotacao) {
        const cotacaoValorVenda = cotacao.cotacaoVenda;
        const cotacaoValorCompra = cotacao.cotacaoCompra;
        const cotacaoData = cotacao.dataHoraCotacao;
        const cotacaoValorVazio = ''; 
        console.log(cotacaoValorVenda, cotacaoValorCompra, cotacaoData)
        res.render('home', { cotacaoValorVenda, cotacaoValorCompra, cotacaoData, cotacaoValorVazio });
    }else{
        const cotacaoValorVenda = '';
        const cotacaoValorCompra = '';
        const cotacaoData = '';
        const cotacaoValorVazio = ''; 
        res.render('home', { cotacaoValorVenda, cotacaoValorCompra, cotacaoData, cotacaoValorVazio });
    }
});

app.get('/cotacao', (req, res) => {
    const {cotacao, valor} = req.query;
    const resultado = convert.convert(cotacao, valor);

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