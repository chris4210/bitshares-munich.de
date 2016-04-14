process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var http = require('http');
var https = require('follow-redirects').https;
var request = require('request');
var koa = require('koa');
var app = koa();
var route = require('koa-route');
var views = require('co-views');
var config = require(__dirname + '/persistent-storage/options.js');
var staticCache = require('koa-static-cache');
var path = require('path');
var logger = require('winston');
var render = views(__dirname + '/views', { map: { html: 'swig' }});


var async = require('async');

logger.level = config.winston_log_level;
app.use(staticCache(path.join(__dirname, 'public')));


function *index() {
    this.body = yield render('index' , {
        app_title: config.app_title,
        http_port: config.http_port,
        http_host: config.http_host
    });
};

app.use(route.get('/', index)); 

var users = [];
var server = http.createServer(app.callback());
var io = require('socket.io')(server);


var port = process.env.PORT || config.http_port;

server.listen(port);
logger.silly('Listening at port ' + config.http_port + ' ...');





