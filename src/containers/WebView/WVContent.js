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
    Linking
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
import I18n from 'ex-react-native-i18n';
I18n.fallbacks = true
const deviceLocale = I18n.locale

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};

// fix https://github.com/facebook/react-native/issues/10865
// thx https://github.com/kyle-ilantzis !
const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    window.counter = 0;
    function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }
    var start = new Date();
    var maxScrollReached = 0;
    window.onload = function(){ 
        window.postMessage(JSON.stringify({ appTag : 'renewal', event: 'onload', timestamp : Date.now(),  contentSizeX : document.documentElement.scrollWidth,contentSizeY : document.documentElement.scrollHeight}))
        //window.postMessage("{ appTag : 'renewal', event: 'onload', timestamp : '"+Date.now()+"'}")
    }
    window.onscroll = function(){
        //alert("scroll "+this.scrollY)
        window.counter++;
        var elapsed = new Date() - start;
        if(this.scrollY > maxScrollReached){
            maxScrollReached
        }
        maxScrollReached = (this.scrollY > maxScrollReached) ? this.scrollY : maxScrollReached;
        window.postMessage(JSON.stringify({ appTag : 'renewal', event: 'scroll', timestamp : Date.now(),  positionX : this.scrollX, positionY : this.scrollY, maxScrollReachedY : maxScrollReached}))
        //window.postMessage(JSON.stringify('['+window.counter+'] : [{application : renewal, timeOnPage :'+ msToTime(elapsed)+', positionX : '+this.scrollX+', positionY : '+this.scrollY+', maxScrollReachedY : '+maxScrollReached+',}]'))
    } 
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();` 
 
export default class MessageWebView extends Component {
    constructor(props) {
        super(props)
        this.postMessage = this.postMessage.bind(this)
        this.state = {
            isOpen: false, 
            isOpenB:false,
            selectedItem: 'wv',
            isClickScroll : false,
            isInScroll:false,
            isScrollPositionY:"0",
            isScrollToDown : false,
            //title : this.props.navigation.state.params.title, 

            icon : "md-arrow-dropup", 
            scrollEventAnimation : false,
            scrollIsEnabled : true,
            scrollStartFrom : "bottom"
        };
        console.log(props)
    }
    async componentDidMount(){
        await I18n.initAsync();
        this.setState({isLoading:false})
      }
    
    ShareMessage=()=>{
        Share.share({
            title: this.props.navigation.state.params.title,
            message: `Bonjour, \n je pense que l'article : ${this.props.navigation.state.params.title} pourrait t'interresser. \n `,
            url: this.props.navigation.state.params.url,
            subject: `Je recommande l'article : ${this.props.navigation.state.params.title}` //  for email 
        }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
    
    onMessageFromWebView (something){
        try{
            let mess = JSON.parse(something)
            //console.log(mess)
            //console.log(mess.appTag)
            if(mess.appTag === "renewal"){
                switch (mess.event){
                    case "onload" : 
                        console.log({title : this.props.navigation.state.params.title, url : this.props.navigation.state.params.url, event : mess.event, timestamp : mess.timestamp, contentSizeX : mess.contentSizeX, contentSizeY : mess.contentSizeY}) 
                        break;
                    case "scroll" : 
                        console.log({title : this.props.navigation.state.params.title, url : this.props.navigation.state.params.url, event : mess.event, timestamp : mess.timestamp, positionX : mess.positionX, positionY:mess.positionY, maxScrollReachedY : mess.maxScrollReached})
                        break;
                    default : 
                        console.log("other event not catched");

                }
            }
        }catch(e){

        }
        
    }
   
    postMessage(action) {
        try{
            this.WebView.postMessage(JSON.stringify(action))
        }catch(error){
            console.error(error);
        }
    }
    fetchEvent =  async (something, someData)=>{
        return someData === null ? 
            console.log("[{Event : "+something+", timestamp :"+Date.now()+"}]")
            :
            console.log("[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]")
    }
    
  
    
    
    
    render() {
        //console.log(this.props.navigation.state.params.data); 
        const { html, source, url, onMessage, ...props } = this.props
        console.log(this.props)
        console.log(this.props.props)
        //this.props.navigation.setParams({otherParam: this.props.navigation.state.params.title})
        
        return (
             <WebView
               {...props}
                javaScriptEnabled
                injectedJavaScript={patchPostMessageJsCode}
                source={{uri:this.props.props.navigation.state.params.url}}
               
                ref={x => {this.WebView = x}}
                onMessage={e => 
                    //console.log(JSON.stringify(e.nativeEvent.data))
                    this.onMessageFromWebView(e.nativeEvent.data)
                    //this.onMessageFromWebView(JSON.parse(e.nativeEvent.data))
                    //this.onMessageFromWebView(JSON.parse(JSON.stringify(e.nativeEvent.data)))
                }
                style={{height: SCREEN_HEIGHT_CUSTOM_REST-(SCREEN_HEIGHT_CUSTOM_HEADER+(SCREEN_HEIGHT_CUSTOM_HEADER)), width:'100%' }}
            />
            
        )
    }
}
const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        flex:1,
        backgroundColor : "white"
        //margin: 5,
        //marginTop: (Platform.OS === 'ios') ? 20 : 0,  
    },
    container: {
       height: '92%',
    }
 })
/*
<TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
                <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
                    style={styles.FloatingButtonStyle} />
            </TouchableOpacity>
            , 
    TouchableOpacityStyle:{
 
    position: 'relative',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 150,
  },
 
  FloatingButtonStyle: {
 
    //resizeMode: 'contain',
    width: 50,
    height: 50,
    zIndex: 999
  }
  */