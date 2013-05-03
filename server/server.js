var path     = require('path'),
    express  = require('express'),
    app      = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://'+process.env.MONGOLABUSR+':'+process.env.MONGOLABPW+'@ds061767.mongolab.com:61767/cloud9test');

var User = mongoose.model('User', { name: String, story: String });

app.use(express.bodyParser());

// First looks for a static file: index.html, css, images, etc.
app.use("/app", express.compress());
app.use("/app", express.static(path.resolve(__dirname, "../app")));
app.use("/app", function(req, res, next) {
  res.send(404);
});

app.use(express.logger()); // Log requests to the console

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


// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/', function(req, res) {
  //Just send the index.html for other files to support HTML5Mode
  res.sendfile('index.html', { root: "../app" });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on port ' + port);
