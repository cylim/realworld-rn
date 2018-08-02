import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from './containers/Home';

const HomeNavigator = createStackNavigator({
        Home: { screen: Home },
        Article: {
            screen: Home,
            path: 'articles/:slug'
        }
    }, {
        initialRouteName: 'Home',
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
});

const AppNavigator = createStackNavigator({
        HomeNavigator: { screen: HomeNavigator},
    },{
        initialRouteName: 'HomeNavigator',
        mode: 'modal',
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
});


export default AppNavigator;
