var BitSharesTicker = React.createClass({displayName: "BitSharesTicker",
    getDefaultProps: function() {
        return {
            timestamp: new Date().getTime(),
            price_list: document.getElementByID('price_list'),
            tweet: 'BitShares Ticker'
        };
    },
    render: function () {
        return (
            React.createElement("div", {className: "ticker"}, 
            React.createElement(BitSharesTickerContent, {price_list: price_list, timestamp: timestamp})
            )
        );
  }
});
