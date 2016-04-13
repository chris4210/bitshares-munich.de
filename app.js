//var http = require('http');
//var https = require('follow-redirects').https;
//var request = require('request');
//var koa = require('koa');
//var app = koa();
//var route = require('koa-route');
//var views = require('co-views');
//var router = express.Router();
//var url = require('url');
//var staticCache = require('koa-static-cache');
//var staticCache = require('express-static-cache');
//var fs    = require("fs")
 //var path = require('path');
//var logger = require('winston');
//var render = views(__dirname + '/views', { map: { html: 'swig' }});
//var mime = require('mime-types');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require('express');
var config = require(__dirname + '/persistent-storage/options.js');

var app = express(),
    swig = require('swig'),
    people;

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