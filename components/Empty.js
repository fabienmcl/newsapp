import React, { Component } from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  });
  function handleFirstConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  NetInfo.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  ); 

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

