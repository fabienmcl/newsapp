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
  Button,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import s1 from '../../images/slide1.png'
import s2 from '../../images/slidey.png'
import s3 from '../../images/slidez.png'
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
import I18n from 'ex-react-native-i18n';
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
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};
export default class SwiperConcept extends Component {
    constructor(props) {
        super(props);
        this.state = {isModalVisible: false, isConnected : false, isLoading: true,}
    }
    async componentDidMount(){
       
        try {
    
          //AsyncStorage.setItem('userInformationBasic', JSON.stringify(userInformation[0]));
          AsyncStorage.getItem('userInformationBasic', (err, result)=>{
            console.log(result)
            var json = JSON.parse(result)
            //console.log(json)
            console.log(json.mail)
            json.mail === 1 ? this.setState({isConnected : true}) : console.log();
          })
          
          
        } catch (error) {
          // Error saving data
        }
        await I18n.initAsync();
        this.setState({isLoading:false})
      }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    _skipConcept = () =>
        Actions.loginapp();

  render(){
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    return (
      <Swiper style={styles.wrapper} loop={false} showsButtons={true}>
        <View style={styles.slide1}>
            
                <TouchableOpacity onPress={() => this._skipConcept()}>
                    <Text style={{color: '#fff'}}> {!this.state.isConnected? I18n.t('concept_skip'): ""} </Text>
                </TouchableOpacity>
            
            
            <Image style={{width:SCREEN_WIDTH}} source={s1}/> 
            <Text style={styles.text}>{I18n.t('concept_welcome')}</Text>
            <Text style={{color:'#fff', textAlign: 'center'}}> {I18n.t('concept_welcome_explain')}</Text>
        </View>
        <View style={styles.slide2}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> {!this.state.isConnected? I18n.t('concept_skip'): ""} </Text>
            </TouchableOpacity>
            <Image style={{width: SCREEN_WIDTH }} source={s2}/> 
            <Text style={styles.text}>{I18n.t('concept_discover')}</Text>
            <Text style={{color:'#fff', textAlign: 'center'}}> {I18n.t('concept_discover_explain')} </Text>
        </View>
        <View style={styles.slide3}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> {!this.state.isConnected? I18n.t('concept_skip'): ""} </Text>
            </TouchableOpacity>
            <Image style={{width: SCREEN_WIDTH }} source={s3}/> 
            <Text style={styles.text}>{I18n.t('concept_sn')} </Text>
            <TouchableOpacity onPress={() => this._toggleModal()}>
                <Text style={{color:'#fff', textAlign: 'center'}}> {I18n.t('concept_sn_explain')} </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isModalVisible}
                onRequestClose={() => {alert('Modal has been closed.');}}>
                <Text>
                    Comment sont utilisées mes données ?

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