import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { Permissions, Notifications } from 'expo';
const timer = require('react-native-timer');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notification: null,
      title: 'Hello World',
      body: 'Say something!',
      showMsg: false
    };
  }
  componentDidMount(){
      this.showConsoleLog();
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }
  
  showConsoleLog() {
      this.recoltData()
      timer.setTimeout(this, 'consolelog', () => this.showConsoleLog(), 2000);
  }
  recoltData(){
      console.log(this.state.body)
  }
  showMsg() {
      timer.clearTimeout('consolelog');
      timer.timeoutExists('consolelog');
    this.setState({showMsg: true}, () => timer.setTimeout(
      this, 'hideMsg', () => this.setState({showMsg: false}), 2000
    ));
  }
 

  
  render() {
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => requestAnimationFrame(() => this.showMsg())}>
          <Text>Press Me</Text>
        </TouchableOpacity>

        {this.state.showMsg ? (
          <Text>stop console.log </Text>
        ) : (
          null
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 8,
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  },
});