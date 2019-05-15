const index = ({ Series }, req, res) => {
  Series.find({}, (err, docs) => {
    res.render('series/index', { series: docs });
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
  excluir
}