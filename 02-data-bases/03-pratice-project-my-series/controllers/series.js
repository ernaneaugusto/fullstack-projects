const index = ({ Series }, req, res) => {
  Series.find({}, (err, docs) => {
    res.render('series/index', { series: docs });
  });
}
const novaProcess = ({ Series }, req, res) => {
  const series = new Series(req.body);
  series.save(() => {
    res.redirect('/series');
    console.log('Salvo /o/');
  });
}

const novaForm = (req, res) => {
  res.render('series/nova');
}

module.exports = {
  index,
  novaProcess,
  novaForm,
}