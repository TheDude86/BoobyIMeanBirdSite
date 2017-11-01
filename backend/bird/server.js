var express = require('express');
var app = express();
var path = require('path');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.render('main-page.html');

});

app.get('/ratings', function(req, res) {
    res.render('rating-page.html');

});

app.get('/law', function(req, res) {
    res.render('law-page.html');

});

app.listen(8080);