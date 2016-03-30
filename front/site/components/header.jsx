import React, { PropTypes, Component } from 'react'

export default class Header extends Component {
    onYearBtnClick(e) {
        this.props.setActive(+e.target.textContent)
    }

    render() {
        const { login } = this.props.data.login;

        return <div className="header">
            <p><button onClick={this.onYearBtnClick}>2016</button></p>
            <div className="user">
                <a href="#">{login}</a>
            </div>
        </div>
    }
}

Header.propTypes = {
    name: PropTypes.string.isRequired,
    setActive: PropTypes.func.isRequired
};