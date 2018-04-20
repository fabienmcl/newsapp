import React, { Component } from 'react';
import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

import SampleBridgeWVCustom from './pages/MessageWebView'


export default StackNavigator({
  
  SampleBridgeWVCustom:{
    screen: SampleBridgeWVCustom
  },
});
