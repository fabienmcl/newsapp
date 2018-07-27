import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NetInfo, AppState } from 'react-native';
import { Accelerometer } from 'expo';

const appStateSensor = {
    _subscribe : function (){
        AppState.addEventListener('change', appStateSensor._handleAppStateChange);
    },
    _unsubscribe : function(){
        AppState.removeEventListener('change', appStateSensor._handleAppStateChange);
    },
    _handleAppStateChange = (nextAppState) => {
        if (AppState.currentState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
        }else{
            console.log('New app state is '+nextAppState)
        }
        //this.setState({appState: nextAppState});
    },
    _getCurrentState(){
        return AppState.currentState;
    }
}
export default appStateSensor;