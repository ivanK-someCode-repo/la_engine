var React = require('react');

var Error = require('./error');
var Site = require('./site');
var Panel = require('./admin-panel');

var Layout = React.createClass({
    render: function() {
        var bodyContent = <Site/>;

        if (this.props.page == 'error'){
            bodyContent = <Error/>;
        }

        if (this.props.page == 'admin-panel'){
            bodyContent = <Panel/>;
        }

        return (
            <html>
                <head>
                    <title>
                        {this.props.title}
                    </title>
                    <link rel="stylesheet" type="text/css" href="styles/style.css"/>
                </head>

                <body>
                    {bodyContent}

                    <script src={this.props.frontRootComponentPath}></script>
                </body>
            </html>
        );
    }
});

module.exports = Layout;