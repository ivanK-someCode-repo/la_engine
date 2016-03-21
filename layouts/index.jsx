var React = require('react');

var Html = React.createClass({
  render: function () {
    return (
        <html>
            <head>
                <title>{this.props.title}</title>
                <link rel='stylesheet' type='text/css' href='/stylesheets/style.css' />
            </head>
            <body>
                <div id='view' dangerouslySetInnerHTML={{__html: this.props.foo}} />
                Home html!
            </body>
        </html>
    );
  }
});

//<script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.props)}} />

//<script src='/javascripts/bundle.js' />

module.exports = Html;