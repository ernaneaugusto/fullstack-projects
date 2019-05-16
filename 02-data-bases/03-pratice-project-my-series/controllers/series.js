const labelsSerie = [
  { name: 'Para assistir', status: 'to-watch' }, 
  { name: 'Assistido', status: 'watched' }, 
  { name: 'Assistindo', status: 'watching' }
];     

const pagination = async (model, conditions, params) => {
  const total = await model.countDocuments(conditions);
  const pageSize = parseInt(params.pageSize) || 5;
  const currentPage = parseInt(params.page) || 0;
  const results = await model
                          .find(conditions)
                          .sort({dateInsertAt: -1})                          
                          .skip(currentPage * pageSize)
                          .limit(pageSize);

  const pagination = {
    pageSize,
    currentPage,
    total,
    pages: parseInt(total/pageSize)
  }
  return {
    data: results,
    pagination
  }
}

const index = async ({ Series }, req, res) => {
  const results = await pagination(Series, {}, req.query);
  res.render('series/index', { results, labelsSerie });
}
const novaProcess = async ({ Series }, req, res) => {    
  const series = new Series(req.body);
  series.dateInsertAt = new Date();
  series.dateModifiedAt = new Date();
  
  try{
    await series.save();
    res.redirect('/series');
  } catch(e){
    res.render('series/nova', { errors: Object.keys(e.errors) });    
  }
}

const novaForm = (req, res) => {
  res.render('series/nova', { errors: false });
}

const editarForm = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  const serie = await Series.findOne({ _id: idSerie }); 
  res.render('series/editar', { serie, labelsSerie, errors: false });  
}

const editarProcess = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  const serie = await Series.findOne({ _id: idSerie });
  serie.name   = req.body.name;
  serie.status = req.body.status;
  serie.dateModifiedAt = new Date();
  try{
    await serie.save();
    res.redirect('/series');
  } catch(e){
    res.render('series/editar', { serie, labelsSerie, errors: Object.keys(e.errors) });
  }
}

const excluir = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  await Series.remove({ _id: idSerie });
  res.redirect('/series');
}

const info = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  const serie = await Series.findOne({ _id: idSerie });
  res.render('series/info', { serie });
}

const addComentario = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  const comentarioSerie = req.body.comentario;
  await Series.updateOne(
    { _id: idSerie },
    { 
      $push: { comments: comentarioSerie } 
    }
  );
  res.redirect('/series/info/'+idSerie);
}

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  editarForm,
  editarProcess,
  info,
  addComentario
}