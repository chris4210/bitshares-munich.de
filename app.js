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
var mime = require('mime-types');


var async = require('async');

function handler(req, res) {
    var url = convertURL(req.url);

    if (okURL(url)) {
        fs.readFile(url, function(err, data) {
            if (err) {
                res.writeHead(404);
                return res.end("File not found.");
            }
            res.setHeader("Content-Type", mime.lookup(url));
            res.writeHead(200);
            res.end(data);
        });
    } else {
        res.writeHead(403);
        return res.end("Forbidden.");
    }
}

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
app.use(route.get('/', function(req, res){
    handler(reg, res);
}));
var server = http.createServer(app.callback());



var port = process.env.PORT || config.http_port;

server.listen(port);
logger.silly('Listening at port ' + config.http_port + ' ...');





