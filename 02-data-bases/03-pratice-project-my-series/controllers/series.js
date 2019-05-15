const labelsSerie = [
  { name: 'Para assistir', status: 'to-watch' }, 
  { name: 'Assistido', status: 'watched' }, 
  { name: 'Assistindo', status: 'watching' }
];     

const index = ({ Series }, req, res) => {
  Series.find({}, (err, docs) => {
    res.render('series/index', { series: docs, labelsSerie });
  });
}
const novaProcess = ({ Series }, req, res) => {
  const series = new Series(req.body);
  series.save(() => {
    res.redirect('/series');
  });
}

const novaForm = (req, res) => {
  res.render('series/nova');
}

const editarForm = ({ Series }, req, res) => {
  const idSerie = req.params.id;
  Series.findOne({ _id: idSerie }, (err, serie) => {            
    res.render('series/editar', { serie, labelsSerie });
  });  
}

const editarProcess = ({ Series }, req, res) => {
  const idSerie = req.params.id;
  Series.findOne({ _id: idSerie }, (err, serie) => {
    serie.name   = req.body.name;
    serie.status = req.body.status;
    serie.save();
    res.redirect('/series');
  })
}

const excluir = ({ Series }, req, res) => {
  const idSerie = req.params.id;
  Series.remove({
    _id: idSerie
  }, (err) => res.redirect('/series'));
}

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  editarForm,
  editarProcess
}