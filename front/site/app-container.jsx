import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'

import * as categoriesActions from '../actions/categories'

class App extends Component {
    render() {
        const { currentUser, currentCathegory, currentItem} = this.props;
        const { setActive } = this.props.categoriesActions;

        return <div>
            <Header data={currentUser} setYear={setActive}/>
            <Footer data={currentUser.name}/>
        </div>
    }
}

function mapStateToProps (state) {
    return {
        currentUser: state.currentUser,
        currentCathegory: state.currentCathegory,
        currentItem : state.currentItem,
        cathegories: state.cathegories,
        items: state.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(categoriesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
