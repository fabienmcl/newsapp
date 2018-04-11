import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
  
import {
  StackNavigator,
} from 'react-navigation';

import Header from './Header'; 
import ListS from './List'; 
import ListV from './ListView' 
import Movie from './Movie';


export default class App extends React.Component {
  static navigationOptions = {
    title: 'SecondScreen'
  };
  render() {
    return (
      <View style={styles.body}>
        <ListV/> 
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