module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/users', require('./users'))
  app.use('/collect', require('./collect'))
  app.use('/focus', require('./focus'))
  app.use('/comments', require('./comments'))

  // 后台管理模板
  app.use('/admin', require('./admin/index'))
  app.use('/admin/posts', require('./admin/posts'))
  app.use('/admin/ad_manage', require('./admin/ad_manage'))


  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
