/** @format */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { name as appName } from '../app.json';
import App from './containers/App';
import configureStore from './store';

const store = configureStore();

const RealWorld = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => RealWorld);