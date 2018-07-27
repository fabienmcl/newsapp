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
import FlatListViewArticle from '../ListOfArticles/FlatListViewArticleRecommandation';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
import TimerMixin from 'react-timer-mixin';
const SCREEN_HEIGHT_CUSTOM_HEADER = SCREEN_HEIGHT/20;
const SCREEN_HEIGHT_CUSTOM_REST= SCREEN_HEIGHT - SCREEN_HEIGHT_CUSTOM_HEADER;
const PropTypes = require('prop-types');


const fetchFunction = {
    _initialize : async function (){
    },
    _add : async function (){
        
    },
    _verify : async function(){
        let res = undefined;
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            res = connectionInfo.type === none ? res : connectionInfo.type
        });
        return res;
    },
    _event : async function (token, something, someData){
        console.log("inside function : "+token+','+something+","+someData)
        let userData = null;
        someData === null ? 
          userData = "[{Event : "+something+", timestamp :"+Date.now()+"}]"
          :
         userData="[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]";
         const urlConst = 'https://api.renewal-research.com/user/events/'+token+'/'+userData;
         
         console.log(urlConst)
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
    },
}
export default fetchFunction;