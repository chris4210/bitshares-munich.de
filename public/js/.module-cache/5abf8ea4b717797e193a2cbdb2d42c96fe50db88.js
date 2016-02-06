var Timestamp = React.createClass({displayName: "Timestamp",
    componentWillMount: function() {
        var socket = io.connect();
        var self = this;
        socket.on(['tweet','price'], function () {
            forceUpdate();
        });
    },
    render: function() {
        return (React.createElement("span", {className: "ticker"}, (new Date(parseInt(new Date().getTime()))).toLocaleString(), "  "));
    }
});