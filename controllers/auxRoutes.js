
module.exports = (app) => {
app.get('/contact', (req, res, next) => {
      var currentUser = req.user;
      res.render('contact', {currentUser});
    })

app.get('/resources', (req, res, next) => {
      var currentUser = req.user;
      res.render('resources', {currentUser});
    })
}// END OF MODULE EXPORT
