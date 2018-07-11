import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NetInfo } from 'react-native';
import { Accelerometer } from 'expo';

const accelerometerSensor = {
    _subscribe : function (){
        this._subscription = Accelerometer.addListener(accelerometerData => {
            let { x, y, z } = accelerometerData;
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