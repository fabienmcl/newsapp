import React, { Component } from "react";
import {
    Text,
    Button,
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
    WebView
} from "react-native";
import {Actions} from 'react-native-router-flux';
import { View } from 'react-native-animatable';
import { Icon } from 'native-base'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.47;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/20);
import CardSwipe from '../components/CardSwipe';

const SCREEN_HEIGHT_CUSTOM_HEADER = SCREEN_HEIGHT/20;
const SCREEN_HEIGHT_CUSTOM_REST= SCREEN_HEIGHT - SCREEN_HEIGHT_CUSTOM_HEADER;

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
    window.onscroll = function(){
        //alert("scroll "+this.scrollY)
        window.counter++;
        var elapsed = new Date() - start;
        if(this.scrollY > maxScrollReached){
            maxScrollReached
        }
        maxScrollReached = (this.scrollY > maxScrollReached) ? this.scrollY : maxScrollReached;
        window.postMessage(JSON.stringify('['+window.counter+'] message_from_webview : scroll_detect x='+this.scrollX+' y='+this.scrollY+' time='+msToTime(elapsed)))
        window.postMessage(JSON.stringify('['+window.counter+'] message_from_webview : maxScrollReached='+maxScrollReached))
    } 
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();` 
 
export default class MessageWebView extends React.Component {
    constructor(props) {
        super(props)
        this.postMessage = this.postMessage.bind(this)
        this.state = {isOpen: false, title : this.props.navigation.state.params.title};
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.otherParam : 'Details Screen',
          headerStyle:{height:SCREEN_HEIGHT_CUSTOM_HEADER},
          headerRight: (
            <TouchableOpacity onPress={() => Actions.listview()}>
                <Icon name="md-close" style={{ color: 'black' }} />
            </TouchableOpacity>
          ),
        }
      };
    postMessage(action) {
        try{
            this.WebView.postMessage(JSON.stringify(action))
        }catch(error){
            console.error(error);
        }
    }
    _onPress= (event) => {
        console.log(event.nativeEvent)
        this.scrollView.scrollTo({x: 0, y: SCREEN_HEIGHT_CUSTOM_REST - SCREEN_HEIGHT_CUSTOM_HEADER , animated: true})
      }
      _handleScroll = (event) => {
        if(this.state.isOpen == false){
          console.log(event.nativeEvent.layoutMeasurement.height);
          console.log(event.nativeEvent.contentOffset.y);
          console.log(this.state.isOpen)
          this.setState(previousState => {
            return { isOpen: true };
          });
          //event.nativeEvent.contentOffset = { y: SCREEN_HEIGHT_CUSTOM }
          this.scrollView.scrollTo({x: 0, y: SCREEN_HEIGHT_CUSTOM_HEADER, animated: true})
        }else{
          console.log("is open true")
          console.log(event.nativeEvent.contentOffset.y);
          this.setState(previousState => {
            return { isOpen: false };
          });
          
        }
      }
    render() {
        //console.log(this.props.navigation.state.params.data); 
        const { html, source, url, onMessage, ...props } = this.props
        console.log(this.props)
        this.props.navigation.setParams({otherParam: this.props.navigation.state.params.title})
        return (
            <ScrollView scrollEnabled={true} ref={x => {this.scrollView = x}} //onScroll={this._handleScroll} 
            >  
            <WebView
                {...props}
                javaScriptEnabled
                injectedJavaScript={patchPostMessageJsCode}
                source={{uri:this.props.navigation.state.params.url}}
            
                ref={x => {this.WebView = x}}
                onMessage={e => console.log(JSON.parse(JSON.stringify(e.nativeEvent.data)))}
                style={{height: SCREEN_HEIGHT_CUSTOM_REST-(SCREEN_HEIGHT_CUSTOM_HEADER+(SCREEN_HEIGHT_CUSTOM_HEADER/2)) }}
            />
            <View> 
                <TouchableOpacity onPress={this._onPress}>
                    <Icon name="md-arrow-dropup" style={{ color: 'black', marginLeft:SCREEN_WIDTH_CUSTOM_PADDING}}/>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Ton avis sur l'article : </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => this.increaseHeight()}> 
                            <Icon name="md-heart-outline" style={{ color: 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log("slider")}>
                            <Slider
                                style={{ width: 150 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={100}
                                value={50}
                            />
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={() => this.increaseHeight()}> 
                            <Icon name="md-heart" style={{ color: 'black' }} />
                        </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} onScroll={()=>this.decreaseHeight()} >
                        <TouchableOpacity onPress={() => this.increaseHeight()}> 
                            <Icon name="md-sad" style={{ color: 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log("slider")}>
                            <Slider
                                style={{ width: 150 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={100}
                                value={50}
                            />
                        </TouchableOpacity>  
                        <TouchableOpacity  > 
                            <Icon name="md-happy" style={{ color: 'black' }} />
                        </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Partage l'article : </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={this.decreaseHeight}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../images/facebook.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log("twitter")}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../images/twitter.png')}/>
                            </TouchableOpacity>  
                        <TouchableOpacity onPress={()=>console.log("linkedin")}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../images/linkedin.png')}/>
                            </TouchableOpacity>  
                        <TouchableOpacity onPress={()=>console.log("whatsapp")}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../images/whatsapp.png')}/>
                        </TouchableOpacity> 
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, paddingBottom:SCREEN_HEIGHT/6 }}>Recommandations d'articles : </Text>
                </View>
            </View>
            <CardSwipe>
            </CardSwipe>
      
            </ScrollView>
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
       height: '92%',
    }
 })