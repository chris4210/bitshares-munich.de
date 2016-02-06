var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var RosterItem = React.createClass({displayName: "RosterItem",
    getInitialState: function() {
        return {
            img_src: this.props.img_src,
            name: this.props.name,
            jobtitle: this.props.jobtitle,
            description00: this.props.description00.replace("&amp;", "&"),
            description01: this.props.description01.replace("&amp;", "&"),
            description02: this.props.description02.replace("&amp;", "&")
        };
    },
    render: function() {
        img_src = this.props.img_src;
        name = this.props.name;
        jobtitle = this.props.jobtitle;
        description00 = this.props.description00.replace("&amp;", "&");
        description01 = this.props.description01.replace("&amp;", "&");
        description02 = this.props.description02.replace("&amp;", "&");
        return (
            React.createElement("div", null, 
            React.createElement("table", {className: "shade"}, 
            React.createElement("tr", null, 
            React.createElement("td", {styles: "width:20% height: 320px"}, React.createElement("img", {src: img_src, className: "slider", height: "320"})), 
            React.createElement("td", {styles: "width:30% height: 320px className: SliderFont"}, 
                React.createElement("h3", null, name, React.createElement("br", null), jobtitle), 
                description00, React.createElement("br", null), React.createElement("br", null), 
                description01, React.createElement("br", null), React.createElement("br", null), 
                description02, React.createElement("br", null), React.createElement("br", null)
            )
            )
            )
            )
      );
    }
});