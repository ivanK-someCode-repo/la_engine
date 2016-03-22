var React = require('react');

var error = require('./error');
var site = require('./site');
var panel = require('./panes');

var DefaultLayout = React.createClass({
    render: function() {
        return (
            <html>
            <head><title>{this.props.title}</title></head>
            <body>{this.props.children}</body>
            </html>
        );
    }
});

module.exports = function(page){
    return Layout;
};