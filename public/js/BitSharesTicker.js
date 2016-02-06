var BitSharesTicker = React.createClass({displayName: "BitSharesTicker",
    getDefaultProps: function() {
        return {
            timestamp: new Date().getTime()
        };
    },
    getInitialState: function() {
        return {
            price_list: this.props.price_list,
            latest_tweet_text: this.props.latest_tweet_text,
        };
    },
    render: function () {
        return (
            React.createElement("div", {className: "ticker"}, 
            React.createElement(BitSharesTickerContent, {latest_tweet_text: latest_tweet_text, price_list: price_list})
            )
        );
  }
});
