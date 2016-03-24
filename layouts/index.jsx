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
                    <link rel="stylesheet" type="text/css" href="common/dist/style.css"/>
                </head>

                <body>
                    {bodyContent}

                    <script src="jquery/dist/jquery.min.js"></script>
                    <script src="site/dist/app.js"></script>
                </body>
            </html>
        );
    }
});

module.exports = Layout;