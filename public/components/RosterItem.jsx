var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var RosterItem = React.createClass({
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
            <div>
            <table className="shade">
            <tr>
            <td styles="width:20% height: 320px"><img src={img_src} className="slider" height="320"></img></td>
            <td styles="width:30% height: 320px className: SliderFont">
                <h3>{name}<br />{jobtitle}</h3>
                {description00}<br></br><br></br>
                {description01}<br></br><br></br>
                {description02}<br></br><br></br>
            </td>
            </tr>
            </table>
            </div>
      );
    }
});