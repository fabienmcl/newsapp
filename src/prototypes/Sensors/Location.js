import Expo from 'expo';
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, timeInterval: 300};

export default class App extends Component {
  state = {
    location: { coords: {latitude: 0, longitude: 0}},
  };

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged = (location) => { 
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
    this.setState({location, region})
    console.log("latitude:"+location.coords.latitude+" longitude:"+location.coords.longitude );  
  }

  render() {
    return (
      
        <Expo.MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={this.state.region}
        />
        
       
    );
  }
}

Expo.registerRootComponent(App);

//https://docs.expo.io/versions/latest/sdk/location