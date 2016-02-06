process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var http = require('http');
var https = require('follow-redirects').https;
var request = require('request')
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
        http_host: config.http_host,
        twitter_feed_name: config.datasources.twitter.twitter_feed_name,
        latest_tweet_text: LATEST_TWEET_TEXT,
        price_list: JSON.stringify(TICKER_CONTENT),
        team_roster: JSON.stringify(TEAM_ROSTER)
    });
};

function *oldindex() {
    this.body = yield render('oldindex' , {
        app_title: config.app_title,
        http_port: config.http_port,
        http_host: config.http_host,
        twitter_feed_name: config.datasources.twitter.twitter_feed_name,
        latest_tweet_text: LATEST_TWEET_TEXT,
        price_list: JSON.stringify(TICKER_CONTENT),
        team_roster: JSON.stringify(TEAM_ROSTER)
    });
};

function handlePriceChange (newPrice) {
    logger.silly({functionname: 'handlePriceChange', newPrice: newPrice})
    broadcastPrice(newPrice);
    updatePriceList(newPrice);
};

logger.silly(config.price_list_metadata);

var TEAM_ROSTER = config.team_roster_metadata;
var TICKER_CONTENT = config.price_list_metadata;
var EUR_PER_BTS = -1;
var BTC_PER_BTS = -1;

function selectDistinct(value, index, self) { 
    return self.indexOf(value) === index;
}

function updatePriceList (newPrice) {
    logger.silly({newPrice: newPrice})
    logger.silly(JSON.stringify(TICKER_CONTENT))
    async.map(TICKER_CONTENT, function (priceline) {
        logger.silly(priceline);
        var newTickerContent = [];
        newPriceLine = priceline;
        if ( newPrice.key === 'EUR') {
            if (newPrice.raw_value > 0) {
                if(newPrice.raw_value !== EUR_PER_BTS) {
                    EUR_PER_BTS = newPrice.raw_value
                    logger.silly({EUR_PER_BTS: EUR_PER_BTS})
                }
            }
        }
        if ( newPrice.key === 'BTC') {
            if (newPrice.raw_value > 0) {
                if(newPrice.raw_value !== BTC_PER_BTS) {
                    BTC_PER_BTS = newPrice.raw_value
                    logger.silly({BTC_PER_BTS: BTC_PER_BTS})
                }
            }
        }
        if ( priceline.key === newPrice.key ) {
            if ( priceline.calc_value !== newPrice.calc_value ) {
                logger.silly({updatepricelist: priceline.key})
                newPriceLine = priceline;
                newPriceLine.key = newPrice.key;
                newPriceLine.raw_value = newPrice.raw_value;
                newPriceLine.calc_value = newPrice.calc_value;
                TICKER_CONTENT.push(newPriceLine)
                TICKER_CONTENT = TICKER_CONTENT.filter( selectDistinct )
            }
        }
    })
};

app.use(route.get('/', index));
app.use(route.get('/oldindex', oldindex));

var users = [];
var server = http.createServer(app.callback());
var io = require('socket.io')(server);

var LATEST_TWEET_TEXT = '';
var Twitter = require('twitter')
logger.silly('init twitter');
var twitterclient = new Twitter({
    consumer_key: config.datasources.twitter.twitter_api_key,
    consumer_secret: config.datasources.twitter.twitter_api_secret,
    access_token_key: config.datasources.twitter.twitter_access_token,
    access_token_secret: config.datasources.twitter.twitter_access_token_secret
})

var params = {
    screen_name: config.datasources.twitter.latest_tweet_screen_name, 
    limit: 1
    };

setInterval( function twitterpoller() {
    twitterclient.get('statuses/user_timeline', params, function(error, tweets, response){
        if(error) {logger.debug(error)}
        if (!error) {
            LATEST_TWEET_TEXT = tweets[0].text
            io.emit('tweet', tweets[0].text)
        }
    });
}, parseInt( config.datasources.twitter.poll_delay_seconds * 1000) )

io.sockets.on('connection', function (socket) {
    logger.silly({functionname: 'io.sockets.on - connection'})
    qFeedPollers();

    socket.on('disconnect', function(o) {
        logger.silly({functionname: 'socket.on - disconnect'})
        var index = users.indexOf(socket);
        if(index != -1) {
            users.splice(index, 1);
        }
    })
    if(users.indexOf(socket) === -1) {
        users.push(socket);
        logger.silly({usercount: users.length})
    }
});

//send nothing every second to tick the clock
setInterval( function heartbeat() {
     io.emit('heartbeat', 'o');
},1000)

function broadcastPrice(price) {
    logger.silly({functionname: 'broadcastPrice', price: price });
    io.emit('price', price);
};

//send fake prices every 5 seconds
// setInterval( function heartbeat() {
//      io.emit('price', {
//             symbol: 'bitSILVER_BTC',
//             raw_value: Math.random(),
//             calc_value: Math.random().toFixed(7),
//             key: 'bitSILVER_BTC',
//             source: 'fake'
//         });
// },5000)

function notBlacklisted(price, blacklist) {
    if ( blacklist.length > 0 ) {
        return blacklist.indexOf(price.symbol) < 1;
    }
    else {
        return true;
    }
};

function isWhitelisted(price, whitelist ) {
    if ( whitelist.length > 0 ) {
        return whitelist.indexOf(price.symbol) > 0;
    }
    else {
        return true;
    }
};

function qFeedPollers() {

    logger.silly({functionname: 'qFeedPollers'})
    async.map( config.datasources.json_api , function( options ) {
        if (options.feed_name === 'poloniex') {
            logger.silly({functionName: 'qFeedPollers~poloniex', running: qPoloniex.running()})
            //one poller per datasource at a time please.
            if ( qPoloniex.running() < 1 ) {
                // download section line 221 doesn't work yet, so disabled here
                qPoloniex.push( options )
            }
        }
        if (options.feed_name === 'ccedk') {
            logger.silly({functionName: 'qFeedPollers~ccedk', running: qCcedk.running()})
            //one poller per datasource at a time please.
            if ( qCcedk.running() < 1 ) {
                // download section line 221 doesn't work yet, so disabled here
                qCcedk.push( options )
            }
        }
        if (options.feed_name === 'metaexchange') {
            logger.silly({functionName: 'qFeedPollers~metaexchange', running: qMetaExchange.running()})
            //one poller per datasource at a time please.
            if ( qMetaExchange.running() < 1 ) {
                qMetaExchange.push( options )
            }
        }
        if (options.feed_name === 'bitsharesblocks') {
            logger.silly({functionName: 'qFeedPollers~bitsharesblocks', running: qBitSharesBlocks.running()})
            //one poller per datasource at a time please.
            if ( qBitSharesBlocks.running() < 1 ) {
                qBitSharesBlocks.push( options )
            }
        }
    })
};

var qPoloniex = async.queue(function (options, callback) { 
    logger.silly({functionname: 'qPoloniex', options: options})
    var feed_host = options.feed_host;
    var feed_path = options.feed_path;
    var feed_name = options.feed_name;
    var polling_interval_seconds = options.polling_interval_seconds;
    logger.silly({host: feed_host, path: feed_path});
    var req = https.request({hostname: feed_host, path: feed_path, method: 'get' },
        function (response) {
            var jsonstr = '';
            response.on('data', function (chunk) {
                jsonstr += chunk;
            });
            response.on('end', function () {
                logger.silly(jsonstr)
                handlePoloniex(jsonstr)
            })
    })
    req.end();
    
    setTimeout(function() {
        logger.silly('just be')
        callback()
    }, polling_interval_seconds * 1000);
} , 1);

qPoloniex.drain = function() {
    logger.silly({functionname: 'qPoloniex~drain'})
    if (parseInt(users.length) > 0) {
        qFeedPollers()
    }
}

function handlePoloniex (newPoloniex) {
    logger.silly({functionname: 'handlePoloniex', newPoloniex: newPoloniex})
    poloniexObj = JSON.parse((newPoloniex))
    poloniexProps = Object.getOwnPropertyNames(poloniexObj);
    async.map(poloniexProps, function(poloniexSymbol) {
        logger.silly(poloniexSymbol + '*****' +  JSON.stringify(poloniexObj[poloniexSymbol]));
        poloniex = poloniexObj[poloniexSymbol];
        price = {
            symbol: poloniexSymbol,
            raw_value: poloniex.last,
            calc_value: (poloniex.last * 1.0).toFixed(7),
            key: poloniexSymbol,
            source: 'poloniex'
        }
        logger.silly(price);
        if(isWhitelisted(price, config.datasources.json_api.poloniex.whitelist)) {
            if(notBlacklisted(price, config.datasources.json_api.poloniex.blacklist)) {
                handlePriceChange(price)
            }
        }
    })
};

var qCcedk = async.queue(function (options, callback) { 
    logger.silly({functionname: 'qCcedk', options: options})
    var feed_host = options.feed_host;
    var feed_path = options.feed_path;
    var feed_name = options.feed_name;
    var polling_interval_seconds = options.polling_interval_seconds;
    
    var n = require('nonce')();
    queryn = parseInt( n() / 100000 ) ;
    var feed_query = '?nonce=' + queryn ; 
    logger.silly({host: feed_host, path: feed_path + feed_query });
    
    var req = https.request({hostname: feed_host, path: feed_path + feed_query, method: 'get' },
        function (response) {
            var jsonstr = '';
            response.on('data', function (chunk) {
                jsonstr += chunk;
            });
            response.on('end', function () {
                logger.silly(jsonstr)
                handleCcedk(jsonstr)
            })
    })
    req.end();
    
    setTimeout(function() {
        logger.silly('just be')
        callback()
    }, polling_interval_seconds * 1000);
} , 1);

qCcedk.drain = function() {
    logger.silly({functionname: 'qCcedk~drain'})
    if (parseInt(users.length) > 0) {
        qFeedPollers()
    }
}

function handleCcedk (newCcedk) {
    //logger.debug({functionname: 'handleCcedk', newCcedk: newCcedk})
    JSON.parse(newCcedk).response.entities.map(function(ccedk) {
        return (
            {
                symbol: ccedk.pair_name,
                raw_value: ccedk.last_price,
                calc_value: (ccedk.last_price * 1.0).toFixed(5),
                key: ccedk.pair_name,
                source: 'ccedk'
            }
        )
    })
    .filter(function(price) {
        return isWhitelisted(price, config.datasources.json_api.ccedk.whitelist )
        }
    )
    .filter(function(price) {
        return notBlacklisted(price, config.datasources.json_api.ccedk.blacklist )
        }
    )
    .map(function ( price ) {
        //logger.debug({handleccedk: price})
        handlePriceChange(price)
    })
};

var qMetaExchange = async.queue(function (options, callback) { 
    logger.silly({functionname: 'qMetaExchange', options: options})
    feed_url = options.feed_url,
    feed_name = options.feed_name,
    polling_interval_seconds = options.polling_interval_seconds,
    request.get(feed_url, function (err, response, body) {
        if(err) { console.log(err)}
        handleMetaExchange( body );
    });
    setTimeout(function() {
        logger.silly('just be')
        callback()
    }, polling_interval_seconds * 1000);
} , 1);

qMetaExchange.drain = function() {
    logger.silly({functionname: 'qMetaExchange~drain'})
    if (parseInt(users.length) > 0) {
        qFeedPollers
    }
}

function handleMetaExchange (newMetaExchange) {
    logger.silly({functionname: 'handleMetaExchange', newMetaExchange: newMetaExchange})
    JSON.parse(newMetaExchange).map(function(metaexchange) {
        return (
            {
                symbol: metaexchange.symbol_pair,
                btc_per_bts: BTC_PER_BTS,
                eur_per_bts: EUR_PER_BTS,
                raw_value: metaexchange.last_price,
                calc_value: (metaexchange.last_price / BTC_PER_BTS * EUR_PER_BTS).toFixed(5),
                key: metaexchange.symbol_pair,
                source: 'metaexchange'
            }
        )
    })
    .filter(function(price) {
        logger.silly({'handlemetaexchange': price})
        return isWhitelisted(price, config.datasources.json_api.metaexchange.whitelist )
        }
    )
    .filter(function(price) {
        return notBlacklisted(price, config.datasources.json_api.metaexchange.blacklist )
        }
    )
    .map(function ( price ) {
        logger.silly({handlemetaexchange: price})
        handlePriceChange(price)
    })

};

var qBitSharesBlocks = async.queue(function (options, callback) {
    logger.silly({functionname: 'qBitSharesBlocks', options: options})
    feed_url = options.feed_url,
    feed_name = options.feed_name,
    polling_interval_seconds = options.polling_interval_seconds,
    request.get(feed_url, function (err, response, body) {
        if(err) { console.log(err)}
        handleBitSharesBlocks( body );
    });
    setTimeout(function() {
        logger.silly('just be')
        callback()
    }, polling_interval_seconds * 1000);
} , 1);

qBitSharesBlocks.drain = function() {
    logger.silly({functionname: 'qBitSharesBlocks~drain'})
    if (parseInt(users.length) > 0) {
        qFeedPollers()
    }
}

function handleBitSharesBlocks (newBitSharesBlocks) {
    logger.silly({functionname: 'handleBitSharesBlocks', newBitSharesBlocks: newBitSharesBlocks})
    JSON.parse(
        newBitSharesBlocks
        .replace(/\\/g, "")
        .replace(/"{/g, '{')
        .replace(/}"/g, '}')
    ).assets.map(function(bsblock) {
        return (
            {
                symbol: bsblock.symbol,
                btc_per_bts: BTC_PER_BTS,
                eur_per_bts: EUR_PER_BTS,
                raw_value: bsblock.price,
                calc_value: ( bsblock.price / EUR_PER_BTS ).toFixed(5),
                key: bsblock.symbol,
                source: 'bitsharesblocks'
            }
        )
    })
    .filter(function(price) {
        logger.silly(price)
        return isWhitelisted(price, config.datasources.json_api.bitsharesblocks.whitelist )
        }
    )
    .filter(function(price) {
        return notBlacklisted(price, config.datasources.json_api.bitsharesblocks.blacklist )
        }
    )
    .map(function ( price ) {
        logger.silly({bitsharesblocks: price})
        handlePriceChange(price)
    })
};

var port = process.env.PORT || config.http_port;
qFeedPollers()
server.listen(port);
logger.silly('Listening at port ' + config.http_port + ' ...');
