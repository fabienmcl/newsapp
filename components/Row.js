import React, { Component } from 'react';
import {
  ImageBackground,              // Renders background image
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Handles row presses
  View                // Container component
} from 'react-native';
import Dimensions from 'Dimensions';
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
        // Row press handler
        <TouchableOpacity
          // Pass row style
          style={styles.row}
          // Call onPress function passed from List component when pressed
          onPress={onPress}
          //onPress={() => {this.props.rootNavigation.navigation.navigate('Vide');
          //}}
        
          // Dim row a little bit when pressed
          activeOpacity={0.7}
          
          //onPress={() => this.props.navigation.navigate("Vide", {screen: "Vide"})}>
          >
          {/* Background image */}
          <ImageBackground source={{uri: image}} style={styles.imageBackground}>
            {/* Title */}
            <View style={[styles.bloc]}>
              <Text style={[styles.text, styles.title]}>{title.toUpperCase()}</Text>
              {/* Rating */}
              <View style={styles.rating}>
              {/* Icon */}    
                <Text style={[styles.text, styles.value]}>{rating}</Text>
              </View>
            </View>
          </ImageBackground>
          
        </TouchableOpacity>
      );
    }
  }

  const styles = StyleSheet.create({
    // Row
    row: {
      paddingBottom: 4,                   // Add padding at the bottom
    },
    // Background image
    imageBackground: {
      height: screen.height / 4,          // Divide screen height by 3
      justifyContent: 'center',           // Center vertically
      alignItems: 'center',               // Center horizontally
    },
    // Shared text style
    text: {
      width: '100%',
      color: '#fff',                      // White text color
      backgroundColor: 'black',     // No background
      fontFamily: 'Avenir',               // Change default font
      fontWeight: 'bold',                 // Bold font
      textAlign: 'center',
      // Add text shadow
      textShadowColor: '#222',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 4,

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