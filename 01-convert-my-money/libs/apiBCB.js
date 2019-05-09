const axios = require('axios');

const url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2704-22-2019%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao';


const getCotacaoBancoCentralAPI = () => axios.get(url); // retorna objeto json com valores
const getCotacaoCompra = res => res.data.value[0].cotacaoCompra; // retorna valor de compra
const getCotacao = async() => {
  try{
    const dadosCotacao = await getCotacaoBancoCentralAPI();
    const cotacao      = getCotacaoCompra(dadosCotacao);
    return cotacao;
  } catch(err){
    return '';
  }
  
}

module.exports = {
  getCotacaoBancoCentralAPI,
  getCotacaoCompra,
  getCotacao
}
