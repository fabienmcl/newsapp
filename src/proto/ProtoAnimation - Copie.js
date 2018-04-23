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

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


export default class Prototype extends Component {
    componentWillMount(){
        this.animation = new Animated.ValueXY({x:0, y:SCREEN_HEIGHT-80})
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder:()=>true,
            onPanResponderGrant:(evt, gestureState)=>{
                this.animation.extractOffset()
            },
            onPanResponderMove:(evt,gestureState)=>{
                this.animation.setValue({x:0,y:gestureState.dy})
            },
            onPanResponderRelease: (evt, gestureState) => {

            }
        })
    }
    render () {
        const animatedHeight = {
            transform : this.animation.getTranslateTransform()
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
          animatedHeaderHeight = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - 90],
            outputRange: [SCREEN_HEIGHT / 3, 90],
            extrapolate: "clamp"
          })
        return (
        
        <Animated.View 
            style={{
                flex:1, 
                backgroundColor:'black'}}>
            
            <Animated.View 
                style={[animatedHeight,{
                    position:'absolute', 
                    left:0,
                    right:0,
                    zIndex:10,
                    backgroundColor:'orange',
                    height: SCREEN_HEIGHT}]}>
                <Animated.View 
                    {... this.panResponder.panHandlers}
                    style={{
                        height: animatedHeaderHeight, 
                        borderTopWidth:1,
                        borderTopColor:'white',
                        flexDirection:'row',
                        alignItems:'center'}}>
                    <View 
                        style={{
                            flex:4,
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                        <Animated.View 
                            style={{
                                height:animatedImageHeight,
                                width: animatedImageHeight,
                                marginLeft : 10
                            }}>
                            <Image 
                                style={{flex:1, height:null, width:null}}
                                source={require('../images/swipeTop.png')} />
                        </Animated.View>
                        <Animated.Text 
                            style={{opacity:animatedSongTitleOpacity,fontSize:18}}>
                            sdfg
                        </Animated.Text>
                    </View>
                </Animated.View>

            </Animated.View>
        </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
