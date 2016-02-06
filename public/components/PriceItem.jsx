var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var PriceItem = React.createClass({
    
    componentDidMount: function() {
      this.setState({ mounted: true });
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        priceIncrease: nextProps.calc_value > this.props.calc_value,
        priceFlat: nextProps.calc_value === this.props.calc_value
      });
    },
    
    getInitialState: function() {
        return {
            img_src: this.props.img_src,
            key: this.props.key,
            label: this.props.label,
            calc_value: this.props.calc_value,
            mounted: false,
            priceFlat: true
        };
    },
    render: function() {
        var transitionDirection = this.state.priceIncrease ? "Up" : "Down";
        if ( this.state.priceFlat ) {
            transitionName = 'priceChangeFlat'
        }
        else {
            transitionName = "priceChange" + transitionDirection;
        }
        var child = this.state.mounted ?
      	<div key={this.props.calc_value}><span className="ticker"><table><tr><td><img src={this.props.img_src}> </img></td><td>{this.props.label}:&nbsp;&nbsp;{this.props.calc_value || '?'}&nbsp;&nbsp;</td></tr></table></span></div>:
        null;

        return (
            <ReactTransitionGroup transitionName={transitionName}>
              {child}
            </ReactTransitionGroup>
        );
    }
});
