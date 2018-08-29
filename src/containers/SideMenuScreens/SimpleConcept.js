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
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Expo, { Font, AppLoading } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Footer, FooterTab } from 'native-base';
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
    backgroundColor : 'orange'
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
    textAlign: 'center'
  }
})
let settings = [
  {
  location : true,
  pedometer : true,
  gyroscope : true,
  accelerometer : true,
  magnetometer : true,
  networks : true,
  activity : true, 
  access :true,
  target:true,
  notification : true

}];
const userInformation = [ {
  firstName : "Empty",
  lastName : "Empty",
  image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Empty_set.svg/500px-Empty_set.svg.png",
  sex : "Empty",
  birth : "01-01-1949",
  location : "Empty",
  email : "Empty",
  phone : "Empty",
  mail : 0,
  facebook : 0,
  twitter : 0,
  google : 0,
}];
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

const infoGeoloc = [ {
  last_connect : date + '-' + month + '-' + year,
  last_dm: null,
  last_access : null
}];

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};
export default class SwiperConcept extends Component {
    constructor(props) {
        super(props);
        this.state = {isModalVisible: false, isConnected : false, isLoading: true, userInformationBasic : null}
    }

    async componentDidMount(){
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Arial: require('native-base/Fonts/Roboto.ttf')
        });
        try {
          //AsyncStorage.setItem('userInformationBasic', JSON.stringify(userInformation[0]));
          AsyncStorage.getItem('userInformationBasic', (err, result)=>{
            console.log(result)

            if(result === null){
              //if user not connected, we need to init async storage 
              console.log("c'est vide")
              this._initAsyncStorage();
            }else{
              console.log("c est pas vide")
              var json = JSON.parse(result)
              console.log(json)
              this.setState({userInformationBasic : json })
              if(this.state.userInformationBasic.email === "Empty"){
                console.log("email est vide")
              }else{
                setTimeout(() => this.setState({ isConnected:true }))// this.setState({isConnected : true})
              }
            }


          })
          
          
        } catch (error) {
          // Error saving data
        }
        await I18n.initAsync();
        
        setTimeout(() => this.setState({ isLoading:false }))//this.setState({isLoading:false})
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    }
    _initAsyncStorage = async () =>{
      //AsyncStorage.removeItem('infoGeoloc',(error, result));
      //console.log(new Date().getDate())
      //console.log(settings);
      //console.log(settings[0])
      AsyncStorage.setItem('settings', JSON.stringify(settings[0]));
      //console.log(userInformation)
      //console.log(userInformation[0])
      AsyncStorage.setItem('userInformationBasic', JSON.stringify(userInformation[0]));
      //console.log(infoGeoloc)
      //console.log(infoGeoloc[0])
      AsyncStorage.setItem('infoGeoloc', JSON.stringify(infoGeoloc[0]));

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
      <Swiper style={styles.wrapper} loop={!this.state.isConnected? true:false} showsButtons={true} autoplay={!this.state.isConnected? true:false} showsPagination={false} >
        <View style={styles.slide1}>
            
                <TouchableOpacity onPress={() => this._skipConcept()}>
                    <Text style={{color: '#fff'}}> {!this.state.isConnected? I18n.t('concept_skip'): ""} </Text>
                </TouchableOpacity>
            
            <Image style={ this.state.isConnected? {width:SCREEN_WIDTH, height:SCREEN_HEIGHT*3.5/5} : {width:SCREEN_WIDTH}} source={s1}/> 
            <Text style={styles.text}>{I18n.t('concept_welcome')}</Text>
            <Text style={{color:'#fff', textAlign: 'center'}}> {I18n.t('concept_welcome_explain')}</Text>
            
        </View>
        <View style={styles.slide2}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> {!this.state.isConnected? I18n.t('concept_skip'): ""} </Text>
            </TouchableOpacity>
            <Image style={ this.state.isConnected? {width:SCREEN_WIDTH, height:SCREEN_HEIGHT*3.5/5} : {width:SCREEN_WIDTH}} source={s2}/> 
            <Text style={styles.text}>{I18n.t('concept_discover')}</Text>
            <Text style={{color:'#fff', textAlign: 'center'}}> {I18n.t('concept_discover_explain')} </Text>
        </View>
        <View style={styles.slide3}>
            <TouchableOpacity onPress={() => this._skipConcept()}>
                <Text style={{color: '#fff'}}> {!this.state.isConnected? I18n.t('concept_skip'): ""} </Text>
            </TouchableOpacity>
            <Image style={ this.state.isConnected? {width:SCREEN_WIDTH, height:SCREEN_HEIGHT*3.5/5} : {width:SCREEN_WIDTH}} source={s3}/> 
            <Text style={styles.text}>{I18n.t('concept_sn')} </Text>
            <TouchableOpacity onPress={() => this._toggleModal()}>
                <Text style={{color:'#fff', textAlign: 'center'}}> {I18n.t('concept_sn_explain')} </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isModalVisible}
                style={{backgroundColor:'#212121'}}
                onRequestClose={() => {alert('Modal has been closed.');}}>
                <Container >
        <Header style={{backgroundColor:'#212121',}}>
          <Left>
            
          </Left>
          <Body>
            <Title style={{ color: 'white'}}>RENEWAL</Title>
          </Body>
          <Right>
            <Button onPress={() =>this._toggleModal()} transparent>
              <Text style={{ color: 'white'}} >Cancel</Text>
            </Button>
          </Right>
        </Header>
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
                <Footer style={{backgroundColor:'#212121'}}>
          <FooterTab>
          <Button full danger  onPress={() =>this._toggleModal()} ><Text style={{ color: 'white'}}> Close </Text></Button>
          </FooterTab>
          </Footer>
                
      </Container>
                
            </Modal>
        </View>
        
      </Swiper>
      
    );
  }
}
