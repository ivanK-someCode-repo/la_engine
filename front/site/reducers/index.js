import { combineReducers } from 'redux'
import currentUser from './current-user'
import currentCathegory from './current-category'
import currentItem from './current-item'
import cathegories from './cathegories'
import items from './items'

/*
const initialState = {
    currentUser: {
        name:'User',
        login:'guest'
    },
    currentCathegory:{},
    currentItem:{},
    cathegories: [],
    items:[]
};
*/

export default combineReducers({
    currentUser,
    currentCathegory,
    currentItem,
    cathegories,
    items
})