import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';
import ListV from './ListView';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'FirstScreen'
  };

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text onPress={this._handlePress}>HomeScreen!</Text>
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigation.navigate('ListV');
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ListV: {
      screen: ListV
  }
});
