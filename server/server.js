var path     = require('path'),
    express  = require('express'),
    app      = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://'+process.env.MONGOLABUSR+':'+process.env.MONGOLABPW+'@ds061767.mongolab.com:61767/cloud9test');


app.use(express.bodyParser());

// First looks for a static file: index.html, css, images, etc.
app.use("/app", express.compress());
app.use("/app", express.static(path.resolve(__dirname, "../app")));
app.use("/app", function(req, res, next) {
  res.send(404);
});
app.use(express.logger()); // Log requests to the console

// Setup models and controllers
// Both Model and Controller is kept in same file for simplicity sake
var users = require('./controllers/users');
users.setup(app, mongoose);

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/', function(req, res) {
  //Just send the index.html for other files to support HTML5Mode
  res.sendfile('index.html', { root: "../app" });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on port ' + port);
