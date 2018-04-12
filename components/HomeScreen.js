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
  },
  Movie :{
      screen: Movie
  }
});
