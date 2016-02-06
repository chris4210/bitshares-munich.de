var BitSharesRosterContent = React.createClass({displayName: "BitSharesRosterContent",
    
    getInitialState: function() {
        var teamRoster = JSON.parse(this.props.team_roster
            .replace(/\&quot\;/g,'"')
            .replace(/\\/g, "")
            .replace(/"{/g, '{')
            .replace(/}"/g, '}')
        );
        return {
            teamRoster: teamRoster
        }
    },
    render: function() {
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 15000,
            speed: 1000,
            variableWidth: false
        };
        var teamRoster = this.state.teamRoster;
        return (
            React.createElement("div", null, 
                React.createElement(Slider, React.__spread({},  settings), 
                    
                        teamRoster.map( function (rosteritem) {
                            return(
                                React.createElement("div", {key: rosteritem}, 
                                    React.createElement(RosterItem, {
                                        img_src: rosteritem.img_src, 
                                        name: rosteritem.name, 
                                        jobtitle: rosteritem.jobtitle, 
                                        description00: rosteritem.description00, 
                                        description01: rosteritem.description01, 
                                        description02: rosteritem.description02
                                       }
                                    )
                                )
                            );
                        })
                    
                )
            )
        );
    }
});

