import React, { Component } from "react";
import {
    View,
    Text,
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
    ScrollView 
} from "react-native";

import { Icon } from 'native-base'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.43;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/14);
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import FlatListDemo from './FlatListDemo';
import HorizontalFlatListDemo from './HorizontalFlatList';
import CardSwipe from '../components/CardSwipe';

export default class Prototype extends Component {
    static navigationOptions = {
        header: null
    }
    componentWillMount(){
        this.bottomHeight = new Animated.Value(30)
        this.bottomWidth = new Animated.Value(50)
        this.bottomPaddingLeft = new Animated.Value(SCREEN_WIDTH_CUSTOM_PADDING)
    }
    increaseHeight = () =>{
        Animated.timing(this.bottomHeight,{
            toValue:SCREEN_HEIGHT_CUSTOM,
            duration:300
        }).start()
        Animated.timing(this.bottomWidth,{
            toValue:SCREEN_WIDTH,
            duration:300
        }).start()
        Animated.timing(this.bottomPaddingLeft,{
            toValue:0,
            duration:100
        }).start()
        
    }
    decreaseHeight = () => {
        Animated.timing(this.bottomHeight, {
            toValue: 30,
            duration: 300
        }).start()
        Animated.timing(this.bottomWidth, {
            toValue: 50,
            duration: 300
        }).start()
        Animated.timing(this.bottomPaddingLeft, {
            toValue: SCREEN_WIDTH_CUSTOM_PADDING,
            duration: 100
        }).start()
    }
    render(){
        const backOpacity = this.bottomHeight.interpolate({
            inputRange:[30,SCREEN_HEIGHT_CUSTOM],
            outputRange: [0,1]
        })
        const openOpacity = this.bottomHeight.interpolate({
            inputRange: [30, SCREEN_HEIGHT_CUSTOM],
            outputRange: [1, 0]
        })
        return (
            <View style={{flex:1}}>
                <Animated.ScrollView onScroll={() => this.decreaseHeight()}
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        top: 60,
                        left: 25,
                        zIndex: 100,
                        opacity: backOpacity//animated
                    }}
                >
                    <TouchableOpacity onPress={() => this.decreaseHeight()}>
                        <Icon name="md-close" style={{ color: 'black' }} />
                    </TouchableOpacity>
                </Animated.ScrollView>

                <Animated.ScrollView onScroll={() => this.decreaseHeight()} 
                    style={{
                        position: 'absolute',
                        height: 25, width: SCREEN_WIDTH,
                        top: 100,
                        zIndex: 100,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Ton avis sur l'article : </Text>
                    </View>
                </Animated.ScrollView>  
                <Animated.ScrollView onScroll={() => this.decreaseHeight()} 
                    style={{
                        position: 'absolute',
                        height: 35,
                        width: SCREEN_WIDTH,
                        top: 132,
                        zIndex: 110,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
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
                </Animated.ScrollView>
                <Animated.ScrollView onScroll={() => this.decreaseHeight()} 
                    style={{
                        position: 'absolute',
                        height: 35, 
                        width: SCREEN_WIDTH,
                        top: 170,
                        zIndex: 130,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} onScroll={()=>this.decreaseHeight()} >
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
                </Animated.ScrollView> 
                
                <Animated.ScrollView onScroll={() => this.decreaseHeight()} 
                    style={{
                        position: 'absolute',
                        height: 25, width: SCREEN_WIDTH,
                        top: 210,
                        zIndex: 100,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Partage l'article : </Text>
                    </View>
                </Animated.ScrollView>
                <Animated.ScrollView onScroll={() => this.decreaseHeight()} 
                    style={{
                        position: 'absolute',
                        height: 60, width: SCREEN_WIDTH,
                        top: 240,
                        zIndex: 150,
                        opacity: backOpacity//animated
                    }}
                >
                    
                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
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
                    
                    
                </Animated.ScrollView>
                <Animated.ScrollView onScroll={() => this.decreaseHeight()} 
                    style={{
                        position: 'absolute',
                        height: 25, width: SCREEN_WIDTH,
                        top: 305,
                        zIndex: 170,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Recommandations d'articles : </Text>
                    </View>
                </Animated.ScrollView>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 210, width: SCREEN_WIDTH,
                        top: 390,
                        zIndex: 370,
                        opacity: backOpacity//animated

                    }}
                >
                    <CardSwipe>
                    </CardSwipe>
                    
                </Animated.View>

               

                <ImageBackground style={{flex:1}} source={require('../images/login_bg.jpg')}>
                   
                   <View style={{flex:1, backgroundColor:'#EEEEEE', justifyContent:'center', alignItems:'center'}}>
                        
                    </View>



                    {/* bottom */}
                    <Animatable.View 
                        style={{
                            width:SCREEN_WIDTH,
                            height:this.bottomHeight,
                            paddingLeft:this.bottomPaddingLeft, 
                            paddingBottom:this.bottomHeight
                    }}>
                    <Animatable.View 
                        style={{
                        height:this.bottomHeight,
                        width:this.bottomWidth,
                        alignItems : 'center',
                        backgroundColor:'white',
                        justifyContent: 'center',
                        //borderTopColor : '#e8e8ec', 
                        //borderWidth : 1,
                        //paddingHorizontal : 25,

                        
                        borderRadius: 25,
                        

                        }}> 
                        
                        <Animated.ScrollView onScroll={() => this.increaseHeight()} >
                            <Animatable.View  style={{opacity: openOpacity}}>
                                <Icon name="md-arrow-dropup" style={{ color: 'black'}} onPress={() => this.increaseHeight()}/>
                            </Animatable.View >
                        </Animated.ScrollView> 

                    </Animatable.View>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
