const labelsSerie = [
  { name: 'Para assistir', status: 'to-watch' }, 
  { name: 'Assistido', status: 'watched' }, 
  { name: 'Assistindo', status: 'watching' }
];     

const index = async ({ Series }, req, res) => {
  const series = await Series.find({});
  res.render('series/index', { series, labelsSerie });
}
const novaProcess = async ({ Series }, req, res) => {
  const series = new Series(req.body);
  await series.save();
  res.redirect('/series');
}

const novaForm = (req, res) => {
  res.render('series/nova');
}

const editarForm = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  const serie = await Series.findOne({ _id: idSerie }); 
  res.render('series/editar', { serie, labelsSerie });  
}

const editarProcess = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  await Series.findOne({ _id: idSerie });
  serie.name   = req.body.name;
  serie.status = req.body.status;
  await serie.save();
  res.redirect('/series');
}

const excluir = async ({ Series }, req, res) => {
  const idSerie = req.params.id;
  await Series.remove({ _id: idSerie });
  res.redirect('/series');
}

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  editarForm,
  editarProcess
}