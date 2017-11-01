var express = require('express');
var app = express();
var path = require('path');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.render('main-page.html');

});

app.listen(8080);