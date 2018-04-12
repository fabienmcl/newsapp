import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import WebV from './WebV';
import ListV from './ListView'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>test mise en place de tarnavigator!</Text>
        <Text>avec une webView dans</Text>
      </View>
    );
  } 
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <WebV />
    );
  }
}

class Recommended extends React.Component {
    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>liste des articles en rapport!</Text>
          </View> 
        );
    }
}

export default TabNavigator({
  Homme: { screen: HomeScreen },
  WebView: { screen: SettingsScreen },
  recommended: { screen: Recommended}
},
{
    swipeEnabled:false,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    tabBarTopComponent: props => {
    },
});

//https://reactnavigation.org/docs/tab-based-navigation.html