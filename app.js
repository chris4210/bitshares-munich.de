process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require('express');
var config = require(__dirname + '/persistent-storage/options.js');

var compression = require('compression');
var app = express(),
    swig = require('swig'),
    people;

var oneDay = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);

swig.setDefaults({ cache:  'memory'  });


app.get('/', function (req, res) {
    res.render('index' , {
         app_title: config.app_title,
         http_port: config.http_port,
         http_host: config.http_host
     });
});


var port = process.env.PORT || config.http_port;
app.listen(port);
console.log('Listening at port ' + config.http_port + ' ...');