import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';

const HomeNavigator = new StackNavigator({
        Home: {  screen:  Home },
    }, {
        initialRouteName: 'Home',
        navigationOptions: {
            gesturesEnabled: false,
        },
});

const AppNavigator = new StackNavigator({
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
