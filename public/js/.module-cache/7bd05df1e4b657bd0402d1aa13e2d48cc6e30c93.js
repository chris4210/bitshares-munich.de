var BitSharesTickerContent = React.createClass({displayName: "BitSharesTickerContent",
    
    render: function() {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 3500,
            variableWidth: true
        };

        var priceList = JSON.parse(this.props.price_list
            .replace(/\&quot\;/g,'"')
            .replace(/\\/g, "")
            .replace(/"{/g, '{')
            .replace(/}"/g, '}')
        );
        
        function notSurpressed(priceitem) {
          return priceitem.label !== 'SURPRESS';
        }
        var filteredPriceList = priceList.filter(notSurpressed);
        
        return (
            React.createElement("div", null, 
                React.createElement(Slider, React.__spread({},  settings), 
                    React.createElement("div", null, React.createElement(Tweet, null), "  "), 
                    React.createElement("div", null, React.createElement(Timestamp, null), "  "), 
                    
                        filteredPriceList.map( function (priceitem) {
                            return(
                                React.createElement("div", {key: priceitem.key}, 
                                    React.createElement(PriceItem, {
                                        alt: priceitem.alt, 
                                        border: priceitem.border, 
                                        height: priceitem.height, 
                                        img_src: priceitem.img_src, 
                                        key: priceitem.key, 
                                        label: priceitem.label, 
                                        calc_value: priceitem.calc_value, 
                                        raw_value: priceitem.raw_value, 
                                        width: priceitem.width, 
                                        align: priceitem.align}
                                    ), 
                                "  ")
                            );
                        })
                    
                )
            )
        );
    }
});

