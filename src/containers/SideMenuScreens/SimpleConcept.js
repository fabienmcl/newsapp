import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';
import s1 from '../../images/slide1.png'
import s2 from '../../images/slidey.png'
import s3 from '../../images/slidez.png'
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#67daff',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03a9f4',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007ac1',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default class SwiperConcept extends Component {
    constructor(props) {
        super(props);
        this.state = {isModalVisible: false}
      }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    _skipConcept = () =>
        Actions.loginapp();

  render(){
    return (
      <Swiper style={styles.wrapper} loop={false} showsButtons={true}>
        <View style={styles.slide1}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> skip </Text>
            </TouchableOpacity>
            <Image style={{width:SCREEN_WIDTH}} source={s1}/> 
            <Text style={styles.text}>Welcome to Renewal</Text>
            <Text style={{color:'#fff'}}> an evaluation platform for news recommender systems </Text>
        </View>
        <View style={styles.slide2}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> skip </Text>
            </TouchableOpacity>
            <Image style={{width: SCREEN_WIDTH }} source={s2}/> 
            <Text style={styles.text}>Discover</Text>
            <Text style={{color:'#fff'}}> explore news according to your interest center </Text>
        </View>
        <View style={styles.slide3}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> skip </Text>
            </TouchableOpacity>
            <Image style={{width: SCREEN_WIDTH }} source={s3}/> 
            <Text style={styles.text}>use your social networks </Text>
            <TouchableOpacity onPress={() => this._toggleModal()}>
                <Text style={{color:'#fff'}}> click here for more information </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isModalVisible}
                onRequestClose={() => {alert('Modal has been closed.');}}>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor dictum auctor. 
                    Aliquam sagittis orci eu tristique fermentum. Fusce in dictum metus. 
                    Sed mollis facilisis quam, at dignissim felis maximus a. Morbi quis pellentesque lectus. 
                    Aliquam laoreet massa at nibh mattis, in fermentum leo viverra. 
                    Praesent molestie lectus congue tristique dictum. Integer viverra consequat convallis. 
                    Donec condimentum, nulla in porta consectetur, dui risus molestie arcu, id faucibus diam felis vel lectus. 
                    Sed venenatis lorem ex, ut sagittis ligula interdum vel. Integer sodales odio ex, eu fermentum quam luctus malesuada. 
                    Proin eget est quis sem ultrices placerat. Suspendisse potenti. Praesent mollis vitae magna eget luctus. 
                    Aliquam consectetur sem nec velit tincidunt efficitur. Praesent leo sem, fringilla at nibh vel, lobortis consectetur velit. 
                </Text>
                <Button
                    onPress={() =>this._toggleModal()}
                    title="Close"
                    color="#007ac1"
                    accessibilityLabel="Learn more about this purple button"
                />
            </Modal>
        </View>
        
      </Swiper>
      
    );
  }
}
