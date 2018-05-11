/*import React from 'react';
import { StackNavigator } from 'react-navigation';

import WelcomeView from './components/App';
import Movie from './components/Movie';
import Vide from './components/Vide';
import Home from './components/HomeScreen'

const App = StackNavigator({
    WelcomeView: {screen: WelcomeView},
    Movie: {screen: Movie},
    Vide: {screen: Vide},
    Home: { screen: Home}
},
{
    initialRouteName: 'Home',
    headerMode: 'none'
});

export default App;*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar 
} from 'react-native';


import Routes from './src/Routes';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});