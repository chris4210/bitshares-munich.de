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
            React.createElement(BitSharesTickerContent, {price_list: price_list})
            )
        );
  }
});
