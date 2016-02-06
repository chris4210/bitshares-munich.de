var BitSharesRoster = React.createClass({displayName: "BitSharesRoster",
    getDefaultProps: function() {
        return {
            timestamp: new Date().getTime()
        };
    },
    getInitialState: function() {
        return {
            team_roster: this.props.team_roster,
            
        };
    },
    render: function () {
        return (
            React.createElement("div", {className: "roster"}, 
            React.createElement(BitSharesRosterContent, {team_roster: team_roster})
            )
        );
  }
});
