/*import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from "react-native";
import { Ionicons } from '@expo/vector-icons'
import {Actions} from 'react-native-router-flux';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


export default class Anim extends Component {

  componentWillMount() {
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })

  }
  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }
    return (
      <Animated.View style={{ flex: 1, backgroundColor: 'white' }}>
        <Animated.View style={[animatedHeight, { position: 'absolute', left: 0, right: 0, zIndex: 10, backgroundColor: 'orange', height: SCREEN_HEIGHT }]} >
          <Animated.View 
            style={{height:80, borderTopWidth:1, borderTopColor:'#ebe5e5', flexDirection: 'row', alignItems:'center'}} >
            <View style={{flex:4,flexDirection:'row', alignItems:'center'}}>
              <Animated.View>

              </Animated.View>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
*/
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider,
  WebView,
  TouchableHighlight
} from "react-native";
import { Ionicons } from '@expo/vector-icons'
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
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class AppleMusicUI extends Component {
  constructor(props) {
    super(props)
    this.postMessage = this.postMessage.bind(this)
}
postMessage(action) {
    try{
        this.WebView.postMessage(JSON.stringify(action))
    }catch(error){
        console.error(error);
    }
} 
  state = {
    isScrollEnabled: false
  }
  componentWillMount() {

    this.scrollOffset = 0

    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })

    this.panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: (evt, gestureState) => {

        if ((this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) || !this.state.isScrollEnabled && gestureState.dy < 0) {
          return true
        } else {
          return false
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove: (evt, gestureState) => {

        this.animation.setValue({ x: 0, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.moveY > SCREEN_HEIGHT - 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.moveY < 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true })

          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start()
        }
        else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false })
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start()
        }
      }

    })
  }

  render() {
    const { html, source, url, onMessage, ...props } = this.props
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: "clamp"
    })
    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    })
    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2 - 100, 10],
      extrapolate: "clamp"
    })
    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT / 3, 90],
      extrapolate: "clamp"
    })
    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })
    animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: ['rgba(0,0,0,0.5)', 'white'],
      extrapolate: "clamp"
    })
    
    return (
      
      <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor }}>
      <WebView
        {...props}
        javaScriptEnabled
        injectedJavaScript={patchPostMessageJsCode} 
                source={{uri:'https://www.youtube.com/watch?v=fA7iovZz5Uk'}}
                ref={x => {this.WebView = x}}
                onMessage={e => console.log(JSON.parse(JSON.stringify(e.nativeEvent.data)))}   
            />
        <Animated.View
          {... this.panResponder.panHandlers}
          style={[animatedHeight, { position: 'absolute', left: 0, right: 0, zIndex: 10, backgroundColor: 'white', height: SCREEN_HEIGHT }]}

        >
          
          <ScrollView
            //scrollEnabled={this.state.isScrollEnabled}
            //scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y
            }}
          >
            <Animated.View
              style={{ height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor: '#ebe5e5', flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Ionicons name="md-arrow-round-up" size={32} />
                </Animated.View>
                <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                  <Image style={{ flex: 1, width: null, height: null }}
                    source={require('../images/news.png')} />
                </Animated.View>
                <Animated.Text style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10 }}>Hotel California(Live)</Animated.Text>
              </View>
              <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Ionicons name="md-arrow-round-up" size={32} />
              </Animated.View>
            </Animated.View>
            <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Partage l'article : </Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableHighlight onPress={()=>console.log("facebook")}>
                  <Image style={{ width: 60, height: 60 }}
                    source={require('../images/facebook.png')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>console.log("twitter")}>
                  <Image style={{ width: 60, height: 60 }}
                    source={require('../images/twitter.png')}/>
                </TouchableHighlight>  
                <TouchableHighlight onPress={()=>console.log("linkedin")}>
                  <Image style={{ width: 60, height: 60 }}
                    source={require('../images/linkedin.png')}/>
                </TouchableHighlight>  
                <TouchableHighlight onPress={()=>console.log("whatsapp")}>
                  <Image style={{ width: 60, height: 60 }}
                    source={require('../images/whatsapp.png')}/>
                </TouchableHighlight> 
              </View>
              <View style={{ flex: 0, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>A découvrir : </Text>
              </View>
            </Animated.View>
            <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity }}>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Hotel California (Live)</Text>
                <Text style={{ fontSize: 18, color: '#fa95ed' }}>Eagles - Hell Freezes Over</Text>
              </View>

              <View style={{ height: 40, width: SCREEN_WIDTH, alignItems: 'center' }}>
              
                <Slider
                  style={{ width: 300 }}
                  step={1}
                  minimumValue={18}
                  maximumValue={71}
                  value={18}

                />
              </View>

              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Ionicons name="md-rewind" size={40} />
                <Ionicons name="md-pause" size={50} />
                <Ionicons name="md-fastforward" size={40} />
                
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                <Ionicons name="md-add" size={32} style={{ color: '#fa95ed' }} />
                <Ionicons name="md-more" size={32} style={{ color: '#fa95ed' }} />
              </View>
            </Animated.View>
            <View style={{ height: 1000 }} />
          </ScrollView>
        </Animated.View>

      </Animated.View>
    );
  }
}
export default AppleMusicUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});