import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Header from './components/Header';  
import Score from './components/Score'; 
import ListViewDemo from './components/ListViewDemo1';
import List from './components/List'; 
import { establishments }     from './components/fixtures'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
        <List />
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