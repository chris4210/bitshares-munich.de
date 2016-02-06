var Tweet = React.createClass({displayName: "Tweet",
    handleTweet: function(newTweet) {
        function pad(width, string, padding) { 
            return (width <= string.length) ? string : pad(width, padding + string, padding);
        }
        if (this.state.tweet !== newTweet.text) {
            var newState = this.state;
            newState.tweet = pad(25, newTweet.text, ' ').slice(25);
            this.setState(newState);
        }
    },
    componentWillMount: function() {
        var socket = io.connect();
        var self = this;
        socket.on('tweet', function (data) {
            self.handleTweet(data);
        });
    },
    getInitialState: function() {
        return {
            tweet: 'BitShares Ticker'
        };
    },
    render: function () {
        tweet=this.state.tweet;
        return (
            React.createElement("span", {className: "ticker"}, tweet)
        );
    }
});