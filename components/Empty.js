import React, { Component } from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';


export default class Empty extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> header </Text>
        <View style={styles.body}>
            <Text> body </Text>
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

