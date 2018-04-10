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
        <ListViewDemo /> 
          <Text>project news app master</Text>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
          <FlatList
          data = {[
            { key: 1, name: 'Alice' },
            { key: 2, name: 'Bob' },
            { key: 3, name: 'Claire' },
            { key: 4, name: 'David' },
            ]}
            renderItem={({item}) => <Text>{item.key} : {item.name}</Text>}
          />
          
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