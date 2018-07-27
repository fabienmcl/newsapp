import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NetInfo } from 'react-native';
import { Constants } from 'expo';
const deviceInfoSensor = {
    _deviceName : function(){
        return Constants.deviceName
    },
    _manifest : function(){
        return Constants.manifest
    },
    isDevice : function(){
        return Constants.isDevice
    },
    _platform : function(){
        return Constants.deviceYearClass
    }
}
export default deviceInfoSensor;