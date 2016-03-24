var React = require('react');
var ReactDom = require('react-dom');

var RootComponent = React.createClass({
    render: function(){return (
        <span>
            hello, i'm root front-end component!
        </span>
    )}
});

ReactDOM.render(RootComponent,document.getElementById('root'));
