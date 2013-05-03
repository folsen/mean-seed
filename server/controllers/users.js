exports.setup = function(app, mongoose) {

  var User = mongoose.model('User', { name: String, story: String });

  // The routes below define what is used by AngularJS's ngResource module for
  // automatic backend resource management.

  // query
  app.get('/users', function(req, res) {
    User.find({}, function(err, docs) {
      res.send(docs);
    });
  });

  // get
  app.get('/users/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function(err, data) {
      res.send(data);
    });
  });

  // save (existing)
  app.post('/users/:id', function(req, res) {
    delete req.body._id;
    User.update({_id: req.params.id}, req.body, function(err, affected) {
      res.send(err);
    });
  });

  // save (new)
  app.post('/users', function(req, res) {
    User.create(req.body, function(err, user) {
      res.send(user);
    });
  });

  // remove
  app.del('/users/:id', function(req, res) {
    User.remove({_id: req.params.id}, function(err) {
      res.send(err);
    });
  });
}
