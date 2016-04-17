process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
var config = require(__dirname + '/persistent-storage/options.js');
var express = require('express');

var compression = require('compression');
var app = express(),
    swig = require('swig'),
    people;

var oneDay = 86400000;

app.use(express.static(__dirname + '/public'));

app.use(compression());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);

swig.setDefaults({cache: 'memory'});

app.get('/', function (req, res) {
    res.render('index', {
        app_title: config.app_title,
        http_port: config.http_port,
        http_host: config.http_host
    });
});

var server = app.listen(process.env.PORT || config.http_port, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});