import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';
import ListV from './ListView';
import Movie from './Movie';
import WebV from './WebV';
import TabNav from './TabNavigator';
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'FirstScreen'
  };

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Welcome to the Native News APP!</Text>
        <Button
          title="Go to second screen"
          onPress={this._handlePress}
        />
        <Button
          title="Go to React Native WebView"
          onPress={this._handlePressWebView}
        />
        <Button
          title="Go to React Native TabNavigator"
          onPress={this._handlePressTabNavigator}
        />
      
      </View>
      
    )
  }

  _handlePress = () => {
    this.props.navigation.navigate('ListV');
  }
  _handlePressWebView = () => {
    this.props.navigation.navigate('WebV');
  }
  _handlePressTabNavigator = () => {
    this.props.navigation.navigate('TabNav');
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ListV: {
      screen: ListV
  },
  Movie :{
      screen: Movie
  },
  WebV:{
    screen: WebV
  },
  TabNav:{
    screen: TabNav
  }
});
