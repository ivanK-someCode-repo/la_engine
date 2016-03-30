import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { logger } from './enhancers/logger'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState
        ,applyMiddleware(logger));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}