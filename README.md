<<<<<<< HEAD
# BitShares Ticker
 
We're almost done with it! 
The BitShares Ticker is a tiny script that connects to the BitShares decentralized exchange, and to Twitter, to bring in the latest BitAsset to Fiat currency pairs and latest streaming tweets (if desired).
 
The BitShares Ticker is free for all BitShares account holders to use. 
 
Donations gladly accepted: bts:payment.kencode
 
It is pure Javascript and runs on any Node.js server (like evennode.com). It uses React.js and socket.io to get the live price feed information and tweets, the second they are updated.
 
The BitShares Ticker scrolls across your page like a regular stock market ticker tape. 
 
If a price changes during the scroll across the screen, the background color of that pair flashes in and fades out to draw your eye to the price change on that pair.
 
All modern browsers and devices can run it as it is exceptionally tiny in filesize and also allows for parameter mods so that you can pick and choose which pairs you prefer, what your Twitter tokens are, etc. 
 
Please retweet: https://twitter.com/kenCode_de/status/632142948050857984 


## Installation
#### install dependencies
```npm install```  
#### set up environment specific configuration
```cp ./persistent-storage/options.js.example ./persistent-storage/options.js```  
#### transpile react components
```cd public/components```  
```jsx --harmony -x jsx ../js``` 

## Configuration
edit options.js file:   

####datasources.twitter:   
obtain twitter read only access token from apps.twitter.com   

####datasources.[metaexchange|bitsharesblocks]    
blacklist and/or whitelist the assets you wish to display in the ticker.  The list of assets can be considered by visiting the address assigned to "feed_url"

## Usage

```node --harmony app.js```   

or this   
```supervisor --harmony app.js```

=======
# BitShares-Munich.de
Our website files will go here
>>>>>>> c5fcb36cd69dae084f02d7682357e764243f1eca
