import React, { Component } from "react";
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
    WebView 
} from "react-native";
import { View } from 'react-native-animatable';
import { Icon } from 'native-base'
//event.nativeEvent.contentOffset.y


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.43;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/20);


export default class WebV extends Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: false};
  }
 
  
  _onPress= (event) => {
    console.log(event.nativeEvent)
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
      this.scrollView.scrollTo({x: 0, y: SCREEN_HEIGHT_CUSTOM, animated: true})
    }else{
      console.log("is open true")
      console.log(event.nativeEvent.contentOffset.y);
      this.setState(previousState => {
        return { isOpen: false };
      });
      
    }
  }
  render() {
    
    return (
        <ScrollView scrollEnabled={true} onScroll={this._handleScroll} ref={x => {this.scrollView = x}}>    
          <WebView
		        source={{uri: 'https://github.com/facebook/react-native/issues/10723'}}
		        style={{height: SCREEN_HEIGHT_CUSTOM }}
	          /> 
            <View style={{height: 1200}}> 
              <TouchableOpacity onPress={this._onPress}>
                <Icon name="md-arrow-dropup" style={{ color: 'black'}}/>
              </TouchableOpacity>
            </View >
           
        </ScrollView>



    ) 
  }
} 
