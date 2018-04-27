import React, { Component } from 'react';
import {
  ImageBackground,              // Renders background image
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  Image,              // renders img
  TouchableOpacity,   // Handles row presses
  View                // Container component
} from 'react-native';
import Dimensions from 'Dimensions';
import { Icon } from 'native-base'
import {
  StackNavigator,
  NavigationActions 
} from 'react-navigation';
// Detect screen size to calculate row height
const screen = Dimensions.get('window');
let {navigate} = NavigationActions;
export default class Row extends React.Component {
    static navigationOptions = {
      title: "Row"
    }
    
    // Extract movie and onPress props passed from List component
    render({ movie, onPress } = this.props) {
      // Extract values from movie object
      const { title, rating, image } = movie;
      return (
        <View
          // Pass row style
          style={styles.row}>
        // Row press handler
        <TouchableOpacity
          
          // Call onPress function passed from List component when pressed
          onPress={onPress}
          //onPress={() => {this.props.rootNavigation.navigation.navigate('Vide');
          //}}
        
          // Dim row a little bit when pressed
          activeOpacity={0.7}
          
          //onPress={() => this.props.navigation.navigate("Vide", {screen: "Vide"})}>
          >
          {/* Background image */}
          <ImageBackground source={{uri: image}}  style={styles.imageStyle} blurRadius={0}>
            {/* Title */}
          </ImageBackground>
          
        </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width:screen.width, height : (screen.height/5)/2.5, backgroundColor:'white' }}>
          <Text  adjustsFontSizeToFitWidth={true} style={styles.text}  >{title.toUpperCase()}</Text>
        </View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    // Row
    row: {
      paddingBottom: 4,                   // Add padding at the bottom
      backgroundColor:'black'
    },
    // Background image
    imageBackground: {
      height: screen.height / 4,          // Divide screen height by 3
    },
    imageStyle: {
      height: screen.height / 5,          // Divide screen height by 3
      justifyContent: 'center',           // Center vertically
      alignItems: 'center',
    },
    // Shared text style
    text: {
      width: '100%',
      textAlign: 'center',
    },
    // Movie title
    title: {
      fontSize: 16,                       // Bigger font size
    },
    // Rating row
    rating: {
      flexDirection: 'row',               // Arrange icon and rating in one line
    },
    // Certified fresh icon
    icon: {
      width: 22,                          // Set width
      height: 22,                         // Set height
      marginRight: 5,                     // Add some margin between icon and rating
    },
    // Rating value
    value: {
      fontSize: 12,                       // Smaller font size
      textAlign: 'left',
    },
    bloc:{
      position: 'absolute',
      bottom: 0,
      width: '100%'
    }
  });