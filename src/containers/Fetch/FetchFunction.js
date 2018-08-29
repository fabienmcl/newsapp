import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Animated,
    Dimensions,
    Keyboard,
    Platform,
    FlatList,
    Slider,
    ScrollView,
    WebView,
    View,
    StatusBar,
    Share,
    Linking,
    NetInfo
} from "react-native";
import {Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
{/*import { Header } from 'react-native-elements';*/}
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.47;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/20);
const SCREEN_HEIGHT_CUSTOM_HEADER = SCREEN_HEIGHT/20;
const SCREEN_HEIGHT_CUSTOM_REST= SCREEN_HEIGHT - SCREEN_HEIGHT_CUSTOM_HEADER;
const PropTypes = require('prop-types');

const timer = require('react-native-timer');
const fetchFunction = {
    _auth : async function (username,password, wayOfConnection){
        await fetch('https://api.renewal-research.com/auth/'+username+'/'+wayOfConnection+'/'+password, 
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },   
            body:JSON.stringify
                ({
                    username,
                    password
                })
            }
        )
        
        .then( 
            await fetch('https://api.renewal-research.com/auth/'+username+'/'+wayOfConnection+'/'+password, 
                {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },   
                body:undefined
                }
            )
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson["user_token"])
                AsyncStorage.setItem('token', JSON.stringify(responseJson["user_token"]));
            })
        ).catch((error) => {
            console.error(error);
        });
    },
    _register : async function (username,password, wayOfConnection){
        await fetch('https://api.renewal-research.com/auth/'+username+'/'+wayOfConnection+'/'+password, 
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },   
            body:JSON.stringify
                ({
                    username,
                    password
                })
            }
        )
        
        .then( 
            await fetch('https://api.renewal-research.com/auth/'+username+'/'+wayOfConnection+'/'+password, 
                {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },   
                body:undefined
                }
            )
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson["user_token"])
                AsyncStorage.setItem('token', JSON.stringify(responseJson["user_token"]));
            })
        ).catch((error) => {
            console.error(error);
        });
    },
    _verify : async function(){
        console.log("let s start verify")
        let response = undefined;
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            //res = connectionInfo.type === none ? res : connectionInfo.type
            console.log(connectionInfo.type)
            response = connectionInfo.type;
            //return connectionInfo.type === none ? false : true
        });
        response = response === "none" ? false : true;
        return response;
    },
    _event : async function (token, something, someData){
        console.log("inside function : "+token+','+something+","+someData)
        
        console.log(await fetchFunction._verify());
        await fetchFunction._verify() ? 
            fetchFunction._fetchURL(token, something, someData)
            :
            timer.setTimeout(
                this, 'sendMsgEvent', () => fetchFunction._event(token,something, someData), 4000
              );
        /*
        if(fetchFunction._verify()===true){
            fetchFunction._fetchURL(urlConst);
        }else{
            timer.setTimeout(
                this, 'sendMsgEvent', () => fetchFunction._fetchURL(urlConst), 4000
              ); 
        }
        console.log(urlConst) */
    },
    _fetchURL : async function (token, something, someData){
        let userData = null;
        someData === null ? 
          userData = "[{Event : "+something+", timestamp :"+Date.now()+"}]"
          :
         userData="[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]";
         
        //const url = 'https://api.renewal-research.com/user/events/'+token+'/'+userData;
        //console.log(url)


        fetch('https://api.renewal-research.com/user/events/'+token+'/'+userData, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },   
          body:JSON.stringify({
            something,
            userData
          })
        })
        .then((response)=> console.log(response))
    }
}
export default fetchFunction;