var React = require('react');
var ReactDOM = require('react-dom');

class RootComponent extends React.Component{
    render() {
        return (
            <span>
                hello, i'm root front-end component!
            </span>
    )}
}

var cmp = <span>
                hello, i'm root front-end component!
            </span>;

ReactDOM.render(cmp, document.getElementById('root'));
