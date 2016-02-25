/*! @license React-SimpleHtmlParser - v1.0.0 - 2015-10-19
 * https://github.com/poqdavid/react-simplehtmlparser/
 *
 * Copyright (c) 2015 poqdavid;
 * Licensed under the MIT license */

React.SHP = (function () {
    var SHP = function () {
        //var self = this;
    };

    SHP.prototype.createMarkup = function (ihtml) {
        return {__html: ihtml};
    };

    SHP.prototype.convertAttrToObj = function (AttrArray) {
        var thisEleObj = {};

        for (var i in AttrArray) {
            if (AttrArray.hasOwnProperty(i)) {
                if (AttrArray[i].name == 'class') {
                    thisEleObj['className'] = AttrArray[i].value;
                }
                else {
                    thisEleObj[AttrArray[i].name] = AttrArray[i].value;
                }

            }
        }
        return thisEleObj;
    };

    SHP.prototype.getText = function (elem) {
        if (typeof elem.textContent !== "undefined") {
            return elem.textContent;
        } else {
            return elem.innerText;
        }
    };

    SHP.prototype.createElement = function (html, text, attr, dangerouslycreate) {
        var self = this;
        var temp_html;
        var temp_text;
        var temp_attr = {};

        if (typeof html === 'string' || html instanceof String) {
            var dom = document.createElement('div');
            dom.innerHTML = html;
            temp_html = dom.firstChild;
        }
        else {
            temp_html = html;
        }

        if (text != null) {
            temp_text = text;
        }
        else {
            temp_text = this.getText(temp_html);
        }


        if (attr != null) {
            temp_attr = self.convertAttrToObj(temp_html.attributes);

            for (var key in attr) {
                if (attr.hasOwnProperty(key)) {
                    if (key == 'class') {
                        temp_attr['className'] = attr[key];
                    }
                    else {
                        temp_attr[key] = attr[key];
                    }

                }
            }
        }
        else {
            temp_attr = self.convertAttrToObj(temp_html.attributes);
        }

        if (dangerouslycreate) {
            temp_attr['dangerouslySetInnerHTML'] = self.createMarkup(temp_text);
            return React.createElement(temp_html.nodeName, temp_attr);
        }
        else {
            return React.createElement(temp_html.nodeName, temp_attr, temp_text);
        }

    };

    SHP.prototype.render = function (html, text, attr, dangerouslycreate, rendernode) {
        var self = this;
        ReactDOM.render(self.createElement(html, text, attr, dangerouslycreate), rendernode);
    };

    return SHP;
})();
React.SHP = new React.SHP();