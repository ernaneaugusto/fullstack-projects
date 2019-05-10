const axios = require('axios');

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;


const getCotacaoBancoCentralAPI = (urlBCB) => axios.get(urlBCB); // retorna objeto json com valores
const getValoresCotacao = res => res.data.value[0]; // retorna valores em forma de objeto
const getToday = () =>  {
  const date = new Date();
  const today = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
  return today;
}
const getCotacao = async() => {
  try{
    const today = getToday();    
    const dadosCotacao = await getCotacaoBancoCentralAPI('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2705-09-2019%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao');
    // const url = getUrl(today);
    // const dadosCotacao = await getCotacaoBancoCentralAPI(url);
    const cotacao      = getValoresCotacao(dadosCotacao);    
    return cotacao;
  } catch(err){
    return false;
  }
  
}

module.exports = {
  getCotacaoBancoCentralAPI,
  getValoresCotacao,
  getCotacao
}
