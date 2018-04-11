import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableHighlight} from 'react-native';
  
import {
  StackNavigator,
} from 'react-navigation';

import Header from './Header'; 
import ListS from './List'; 
import ListV from './ListView' 
import Movie from './Movie';


export default class Vide extends React.Component {
    static navigationOptions = {
        title: "Welcome"
    }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
        
        <TouchableHighlight
            onPress={() => navigate("WelcomeView", {screen: "WelcomeView"})}>
            <Text> link vers App.js </Text>
        </TouchableHighlight>
        
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});