import React, { Component } from 'react'
import {
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
    ScrollView,
    WebView,
    AsyncStorage
} from "react-native";
import { View } from 'react-native-animatable';
import HomeScreen from './HomeScreen/HomeScreen'
import AuthScreen from './AuthScreen'
import Expo, { SQLite, Font, AppLoading } from 'expo';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.43;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/20);


export default class WebV extends Component {
  constructor(props) {
    super(props)
    //this.state = {isOpen: false};
    this.state = {
      isLoggedIn: false, // Is the user authenticated?
      isLoading: false, // Is the user loggingIn/signinUp?
      isAppReady: false, // Has the app completed the login animation?
      loading: true
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }
  _simulateLogin = (username, password) => {
    this.setState({ isLoading: true })
    fetch('https://api.renewal-research.com/auth/'+username+'/'+password)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        try {
          AsyncStorage.setItem('token', JSON.stringify(responseJson));
          
        } catch (error) {
          // Error saving data
          console.log("Error saving data")
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _simulateSignup = async (username, password, fullName) => {
    
    this.setState({ isLoading: true })
    
      
    await fetch('https://api.renewal-research.com/auth/'+username+'/email/'+password, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },   
      body:JSON.stringify({
        username,
        password
      })
    })
    .then( await fetch('https://api.renewal-research.com/auth/'+username+'/email/'+password, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },   
      body:undefined
    })
    .then((response) => 
      response.json()
    ).then((responseJson)=>console.log(responseJson["user_token"]))
    
  ).catch((error) => {
      console.error(error);
    });
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
     
    
    /*
    
    fetch('https://api.renewal-research.com/auth/'+username+'/email/'+password, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },   
      body:JSON.stringify({
        username,
        password
      })
    })
      .then((response) => 
        fetch('https://api.renewal-research.com/auth/'+username+'/email/'+password, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },   
          body:undefined
        }).then((resp) => resp.json())
        .then((responseJson) => {
          console.log(responseJson)}
        )
        /*.then((responseJson) => {
          console.log(responseJson)
          try {
            AsyncStorage.setItem('token', JSON.stringify(responseJson));
            
          } catch (error) {
            // Error saving data
            console.log("Error saving data")
          }
        })*//*
      
      )
      
      .catch((error) => {
        console.error(error);
      });
      */
    
  }
  render() {
    
    if (this.state.isAppReady) {
      return (
        <HomeScreen
          logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
        />
      )
    } else {
      return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      )
    }
    
   
  }
} 