var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var Tweet = React.createClass({displayName: "Tweet",
    render: function () {
        var tweet=this.props.tweet;
        return (
            React.createElement("span", {className: "ticker"}, React.createElement("div", null, React.createElement("ul", {className:"tickeritems"}, React.createElement("li", null, React.createElement("img", {src: "img/twitter.png", className:"tickeritems"})),  React.createElement("li", null, tweet, "  "))))
        );
    }
});
