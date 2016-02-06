var Timestamp = React.createClass({
    render: function() {
        var lastupdate = this.props.lastupdate;
        return (<span className='ticker'>{lastupdate}&nbsp;&nbsp;</span>);
    }
});