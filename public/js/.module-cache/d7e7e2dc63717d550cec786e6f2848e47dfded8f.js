var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var PriceItem = React.createClass({displayName: "PriceItem",
    
    componentDidMount: function() {
      this.setState({ mounted: true });
    },
    handlePriceChange: function(newPrice) {
        console.log(JSON.stringify(newPrice));
        if ( this.state.symbol === newPrice.symbol) {
            if (this.state.calc_value !== newPrice.calc_value) {
                var newState = this.state;
                newState.key = newPrice.key;
                newState.symbol = newPrice.symbol;
                newState.calc_value = newPrice.calc_value;
                if (this.state.calc_value < newPrice.calc_value) {
                    this.state.priceIncrease = true;
                }
                else {
                    this.state.priceIncrease = false;
                }
                this.setState(newState);
            }
        }
    },   
    componentWillMount: function() {
        var socket = io.connect();
        var self = this;
        socket.on('price', function (data) {
            self.handlePriceChange(data);
        });
    },
    getInitialState: function() {
        return {
            alt: this.props.alt,
            border: this.props.border,
            height: this.props.height,
            img_src: this.props.img_src,
            key: this.props.key,
            label: this.props.label,
            raw_value: this.props.raw_value,
            calc_value: this.props.calc_value,
            width: this.props.width,
            align: this.props.align,
            mounted: false 
        };
    },
    render: function() {
        var text = this.state.priceIncrease ? "up" : "down";
        var transitionName = this.state.priceIncrease ? "Up" : "Down";
        transitionName = "priceChange" + transitionName;
        console.log(transitionName);
        var key = this.state.symbol;
        var child = this.state.mounted ?
      	React.createElement("div", {key: key}, " ", React.createElement("span", {className: "ticker"}, React.createElement("table", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("img", {src: this.props.img_src}, " ")), React.createElement("td", null, this.props.label, ":  ", this.props.calc_value))))) :
        null;

      return (
        React.createElement(ReactTransitionGroup, {transitionName: transitionName}, 
          child
        )
      );
    }
});