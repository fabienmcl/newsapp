import React from 'react';
import {
  Text,
  View,
  Button,
  NetInfo
} from 'react-native';

import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';


import ListV from './ListView';
import Movie from './Movie';
import WebV from './WebV';
import TabNav from './TabNavigator';
import SampleBridgeWV from './SampleBridgeWV';
import SampleBridgeWVCustom from './MessageWebView'
import Location from './Location';
import Accelerometer from './Accelerometer';
import Gyroscope from './Gyroscope';
import Localization from './Localization';
import Magnetometer from './Magnetometer';
import FlatListDemo from './FlatListDemo';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HomeScren'
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
        <Button
          title="Go to React Native webview-bridge-sample"
          onPress={this._handlePressSampleBridgeWV}
        />
        <Button
          title="Go to React Native webview-bridge-sample custom"
          onPress={this._handlePressSampleBridgeWVCustom}
        />
        <Button
          title="Go to React Native Location w/ MapView"
          onPress={this._handlePressLocation}
        />
        <Button
          title="Go to React Native Localization w/ TXT"
          onPress={this._handlePressLocalization}
        />
        <Button
          title="Go to React Native Accelerometer"
          onPress={this._handlePressAccelerometer}
        />
        <Button
          title="Go to React Native Gyroscope"
          onPress={this._handlePressGyroscope}
        />
        <Button
          title="Go to React Native Magnetometer"
          onPress={this._handlePressMagnetometer}
        />
        <Button
          title="Go to React Native FlatListDemo"
          onPress={this._handlePressFlatListDemo}
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
  _handlePressSampleBridgeWV = () => {
    this.props.navigation.navigate('SampleBridgeWV');
  }
  _handlePressSampleBridgeWVCustom = () => {
    this.props.navigation.navigate('SampleBridgeWVCustom');
  }
  _handlePressLocation = () => {
    this.props.navigation.navigate('SampleLocation');
  }
  _handlePressAccelerometer = () => {
    this.props.navigation.navigate('SampleAccelerometer');
  }
  _handlePressGyroscope = () => {
    this.props.navigation.navigate('SampleGyroscope');
  }
  _handlePressGyroscope = () => {
    this.props.navigation.navigate('SampleGyroscope');
  }
  _handlePressLocalization = () => {
    this.props.navigation.navigate('Localization');
  }
  _handlePressMagnetometer = () => {
    this.props.navigation.navigate('Magnetometer');
  }
  _handlePressFlatListDemo = () => {
    this.props.navigation.navigate('FlatListDemo');
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
  },
  SampleBridgeWV:{
    screen: SampleBridgeWV
  },
  SampleBridgeWVCustom:{
    screen: SampleBridgeWVCustom
  },
  SampleLocation:{
    screen : Location 
  },
  SampleAccelerometer:{
    screen : Accelerometer 
  },
  Magnetometer:{
    screen: Magnetometer
  }, 
  SampleGyroscope:{
    screen : Gyroscope 
  },
  Localization:{
    screen : Localization
  },
  FlatListDemo:{
    screen : FlatListDemo
  }
});
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