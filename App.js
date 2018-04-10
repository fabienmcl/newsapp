import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
  

import Header from './components/Header'; 
import ListS from './components/List'; 
import ListV from './components/ListView' 
import Movie from './components/Movie';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
        <ListV/>
        
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