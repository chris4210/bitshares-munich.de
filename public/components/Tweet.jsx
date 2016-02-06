var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var Tweet = React.createClass({
    render: function () {
        var tweet=this.props.tweet;
        return (
            <span className='ticker'><table><tr><td><img src="img/twitter.png"></img></td><td>{tweet}&nbsp;&nbsp;</td></tr></table></span>
        );
    }
});
