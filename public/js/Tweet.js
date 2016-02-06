var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var Tweet = React.createClass({displayName: "Tweet",
    render: function () {
        var tweet=this.props.tweet;
        return (
            React.createElement("span", {className: "ticker"}, React.createElement("table", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("img", {src: "img/twitter.png"})), React.createElement("td", null, tweet, "  "))))
        );
    }
});
