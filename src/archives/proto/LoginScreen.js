import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    Keyboard,
    Platform,
    WebView,
    TouchableHighlight
} from "react-native";

import { Icon } from 'native-base'
const SCREEN_HEIGHT = Dimensions.get('window').height
import * as Animatable from 'react-native-animatable'

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super()

        this.state = {
            placeholderText: 'Enter your mobile number'
        }
    }
    componentWillMount() {

        this.loginHeight = new Animated.Value(150)

        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)

        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)

        this.keyboardHeight = new Animated.Value(0)
        this.forwardArrowOpacity = new Animated.Value(0)
        this.borderBottomWidth = new Animated.Value(0)
    }

    keyboardWillShow = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        }
        else {
            duration = event.duration
        }

        Animated.parallel([

            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: event.endCoordinates.height + 10
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 1
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 1
            })

        ]).start()

    }

    keyboardWillHide = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        }
        else {
            duration = event.duration
        }

        Animated.parallel([

            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: 0
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 0
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: event.duration,
                toValue: 0
            })

        ]).start()
    }



    increaseHeightOfLogin = () => {

        this.setState({ placeholderText: '092123456789' })
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {

            //this.refs.textInputMobile.focus()
        })
    }

    decreaseHeightOfLogin = () => {

        Keyboard.dismiss()
        Animated.timing(this.loginHeight, 
            {
            toValue: 150,
            duration: 500
            }).start()
    }
    render() {
        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [1, 0]
        })
        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 100]
        })
        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })
        const titleTextLeft = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [100, 25]
        })
        const titleTextBottom = this.loginHeight.interpolate({
            inputRange: [150, 400, SCREEN_HEIGHT],
            outputRange: [0, 0, 100]
        })
        const titleTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })




        return (
            <View style={{ flex: 1 }}>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        top: 60,
                        left: 25,
                        zIndex: 100,
                        opacity: headerBackArrowOpacity//animated
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}
                    >
                        <Icon name="md-close" style={{ color: 'black' }} />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 30, width: 60,
                        right: 10,
                        bottom: this.keyboardHeight, // animated
                        opacity: this.forwardArrowOpacity,//animated
                        zIndex: 100,
                        backgroundColor: '#54575e',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30
                    }}
                >
                    <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                </Animated.View>
                    <WebView
                        source={{uri:'https://www.numerama.com/tech/271299-les-capteurs-dempreinte-digitale-sous-lecran-existent-mais-ils-sont-super-lents.html'}}  
                    />    
                    {/** BOTTOM HALF **/}
                    <Animatable.View animation="slideInUp" iterationCount={1}>

                        <Animated.View
                            style={{
                                height: this.loginHeight,//animated
                                backgroundColor: 'white'

                            }}
                        >
                            <Animated.View
                                style={{
                                    opacity: headerTextOpacity,//animated
                                    alignItems: 'flex-start',
                                    paddingHorizontal: 25,
                                    marginTop: marginTop//animated
                                }}
                            >
                                <Text
                                    style={{ fontSize: 24 }}
                                >Get moving with Uber</Text>
                            </Animated.View>

                            <TouchableOpacity
                                onPress={() => this.increaseHeightOfLogin()}
                            >
                                <Animated.View
                                    style={{
                                        marginTop: marginTop,//animated
                                        paddingHorizontal: 25,
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Animated.Text
                                        style={{
                                            fontSize: 24,
                                            position: 'absolute',
                                            bottom: titleTextBottom,//animated
                                            left: titleTextLeft,//animated
                                            opacity: titleTextOpacity//animated
                                        }}
                                    >
                                        Partage l'article :
                                    </Animated.Text>
                                    
                                  


                                    <Image
                                        source={require('../images/india.png')}
                                        style={{ height: 24, width: 24, resizeMode: 'contain' }}
                                    />
                                    <Animated.View
                                        pointerEvents="none"
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            borderBottomWidth: this.borderBottomWidth//animated
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 20,
                                            paddingHorizontal: 10

                                        }}>+91</Text>

                                        <TextInput
                                            keyboardType="numeric"
                                            ref="textInputMobile"
                                            style={{ flex: 1, fontSize: 20 }}
                                            placeholder={this.state.placeholderText}
                                            underlineColorAndroid="transparent"
                                        />
                                    </Animated.View>
                                </Animated.View>
                            </TouchableOpacity>

                        </Animated.View>
                        
                    </Animatable.View>
                

            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});