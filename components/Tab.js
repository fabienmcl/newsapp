import React from "react";
import { TabNavigator } from "react-navigation";

import Home from './HomeScreen';
import First from './WebV';
import Second from './ListView';

export const Tab = TabNavigator({
  Home: {
    screen: Home,
  },
  First: {
    screen: First,
  },
  Second: {
    screen: Second,
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#f2f2f2',
    activeBackgroundColor: "#2EC4B6",
    inactiveTintColor: '#666',
    labelStyle: {
      fontSize: 22,
      padding: 12
    }
  }
});