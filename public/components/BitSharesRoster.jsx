var BitSharesRoster = React.createClass({
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
            <div className='roster'>
            <BitSharesRosterContent team_roster={team_roster}></BitSharesRosterContent>
            </div>
        );
  }
});
