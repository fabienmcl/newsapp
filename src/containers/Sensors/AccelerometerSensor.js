import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NetInfo, AsyncStorage } from 'react-native';
import { Accelerometer } from 'expo';
import FetchFunction from '../Fetch/FetchFunction';

const accelerometerSensor = {
    _subscribe : function (){
        this._subscription = Accelerometer.addListener(accelerometerData => {
            let { x, y, z } = accelerometerData;
            try {
                AsyncStorage.getItem('token', (err, result)=>{
                this.setState({token: result});
                console.log("mon token de merde "+result)
                FetchFunction._event(token,'accelerometerData', 'accelerometerX : x,accelerometerY : y, accelerometerZ : z, timestamp : '+Date.now())
                })
            } catch (error) {
                 // Error saving data
                 console.log("oh mon dieu le token a disparu")
            }
            console.log({event : "accelerometerData", accelerometerX : x,accelerometerY : y, accelerometerZ : z, timestamp : Date.now()});
        });
        Accelerometer.setUpdateInterval(20000);
    },
    _unsubscribe : function(){
        accelerometerSensor._subscription && this._subscription.remove();
        accelerometerSensor._subscription = null;
    }
}
export default accelerometerSensor;