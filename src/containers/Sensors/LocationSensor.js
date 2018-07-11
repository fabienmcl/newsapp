import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NetInfo } from 'react-native';
import { Constants, Location, Permissions } from 'expo';


const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, timeInterval: 300};

const locationSensor = {
    _subscribe : async function (){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log({event : "locationPermission", access :"denied", timestamp : Date.now()} );
            let location = await Location.getCurrentPositionAsync({});
            console.log({event : "locationChanged", latitude : location.coords.latitude, longitude: location.coords.longitude, timestamp : Date.now()} );
            await Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
        }else{
            console.log({event : "locationPermission", access :"ok", timestamp : Date.now()} );
            let location = await Location.getCurrentPositionAsync({});
            console.log({event : "locationChanged", latitude : location.coords.latitude, longitude: location.coords.longitude, timestamp : Date.now()} );
            await Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
        }
    },
    locationChanged : async function (location){ 
        region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
        }
        console.log({event : "locationChanged", latitude : location.coords.latitude, longitude: location.coords.longitude, timestamp : Date.now()} );
    },
    _unsubscribe : function(){
        accelerometerSensor._subscription && this._subscription.remove();
        accelerometerSensor._subscription = null;
    }
}
export default locationSensor;