var BitSharesTicker = React.createClass({displayName: "BitSharesTicker",
    getDefaultProps: function() {
        return {
            timestamp: new Date().getTime(),
            tweet: 'BitShares Ticker'
        };
    },
    getInitialState: function() {
        return {
            price_list: this.props.price_list,
        };
    },
    render: function () {
        return (
            React.createElement("div", {className: "ticker"}, 
            React.createElement(BitSharesTickerContent, {tweet: tweet, timestamp: timestamp})
            )
        );
  }
});
