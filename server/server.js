var path = require('path');
var express = require('express');
var app = express();


// First looks for a static file: index.html, css, images, etc.
app.use("/app", express.compress());
app.use("/app", express.static(path.resolve(__dirname, "../app")));
app.use("/app", function(req, res, next) {
  res.send(404);
});

app.use(express.logger()); // Log requests to the console

app.get('/users', function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}]);
});
app.get('/users/:id', function(req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
});

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/', function(req, res) {
  //Just send the index.html for other files to support HTML5Mode
  res.sendfile('index.html', { root: "../app" });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on port ' + port);
