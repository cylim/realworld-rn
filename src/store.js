import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';

import reducer from './reducers';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(promiseMiddleware, localStorageMiddleware),
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept(() => {
            store.replaceReducer(require('./reducers').default);
        });
    }
    return store;
}