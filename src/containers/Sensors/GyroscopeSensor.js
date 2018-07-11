import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NetInfo } from 'react-native';
import { Gyroscope } from 'expo';

const gyroscopeSensor = {
    _subscribe : function (){
        this._subscription = Gyroscope.addListener(gyroscopeData => {
            let { x, y, z } = gyroscopeData;
            console.log({event : "gyroscopeData", gyroscopeX : x,gyroscopeY : y, gyroscopeZ : z, timestamp : Date.now()});
        });
        Gyroscope.setUpdateInterval(20000);
    },
    _unsubscribe : function(){
        gyroscopeSensor._subscription && this._subscription.remove();
        gyroscopeSensor._subscription = null;
    }
}
export default gyroscopeSensor;