var Timestamp = React.createClass({displayName: "Timestamp",
    render: function() {
        var lastupdate = this.props.lastupdate;
        return (React.createElement("span", {className: "ticker"}, lastupdate, "  "));
    }
});