import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { NavigationActions } from 'react-navigation/src/react-navigation';
import AppNavigator from '../navigator';

class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return <AppNavigator />;
  }
}

export default App;