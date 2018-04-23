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
    FlatList
} from "react-native";

import { Icon } from 'native-base'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import FlatListDemo from './FlatListDemo';

export default class Prototype extends Component {
    static navigationOptions = {
        header: null
    }
    componentWillMount(){
        this.bottomHeight = new Animated.Value(70)
    }
    increaseHeight = () =>{
        Animated.timing(this.bottomHeight,{
            toValue:SCREEN_HEIGHT,
            duration:300
        }).start()
    }
    decreaseHeight = () => {
        Animated.timing(this.bottomHeight, {
            toValue: 70,
            duration: 300
        }).start()
    }
    render(){
        const backOpacity = this.bottomHeight.interpolate({
            inputRange:[70,SCREEN_HEIGHT],
            outputRange: [0,1]
        })
        const openOpacity = this.bottomHeight.interpolate({
            inputRange: [70, SCREEN_HEIGHT],
            outputRange: [1, 0]
        })
        return (
            <View style={{flex:1}}>
                <Animated.View
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
                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: SCREEN_WIDTH,
                        top: 60,
                        zIndex: 100,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Partage l'article : </Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: SCREEN_WIDTH,
                        top: 130,
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
                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: SCREEN_WIDTH,
                        top: 160,
                        zIndex: 170,
                        opacity: backOpacity//animated
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Recommandations d'articles : </Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 210, width: SCREEN_WIDTH,
                        top: 250,
                        zIndex: 270,
                        opacity: backOpacity//animated

                    }}
                >
                    <FlatListDemo>
                    </FlatListDemo>
                    
                </Animated.View>


                <ImageBackground style={{flex:1}} source={require('../images/login_bg.jpg')}>
                   
                   <View style={{flex:1, backgroundColor:'grey', justifyContent:'center', alignItems:'center'}}>
                        
                    </View>



                    {/* bottom */}
                    
                    <Animatable.View 
                        style={{
                        height:this.bottomHeight,
                        backgroundColor:'white',
                        alignItems : 'center',
                        justifyContent: 'center',
                        borderTopColor : '#e8e8ec', 
                        borderWidth : 1,
                        paddingHorizontal : 25
                        }}>
                        <TouchableOpacity
                                onPress={() => this.increaseHeight()}
                            > 
                        <Text style={{
                            opacity: 1,
                            color:'#5a7fdf',
                            fontWeight:'bold'
                        }}
                            > suprise !</Text>
                        </TouchableOpacity>
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
