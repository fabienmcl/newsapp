import React, { Component } from 'react';
import { Text, View,WebView } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
        <WebView
            source={{uri:"www.google.fr"}}
        />
    );
  }
}