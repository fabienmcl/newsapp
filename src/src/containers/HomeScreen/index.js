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
