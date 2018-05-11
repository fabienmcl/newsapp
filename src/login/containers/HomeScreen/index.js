import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import CustomButton from '../../components/CustomButton'
import {Actions} from 'react-native-router-flux';
/**
 * Just a centered logout button.
 */
export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }
  flatListViewArticle(){
    Actions.flatListViewArticle();
  }
  
  render () {
    return (
      <View style={styles.container}>
        <CustomButton
          text={'Logout'}
          onPress={this.props.logout}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'ListView'}
          onPress={()=>this.flatListViewArticle()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'Accelerometer'}
          onPress={()=>Actions.accelerometer()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'gyroscope'}
          onPress={()=>Actions.gyroscope()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'magnetometer'}
          onPress={()=>Actions.magnetometer()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'localization'}
          onPress={()=>Actions.localization()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'location'}
          onPress={()=>Actions.location()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'ma première liste <3'}
          onPress={()=>Actions.listView()}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
