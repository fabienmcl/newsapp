import React, { Component } from 'react'
import { StyleSheet, Alert,AsyncStorage,ActivityIndicator } from 'react-native'
import { View } from 'react-native-animatable'
import { Container, Content, Left,Button, Right, Body, Icon, Text} from 'native-base';
import { AuthSession, Constants, Font  } from 'expo';
import {Actions} from 'react-native-router-flux';
import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'
const FB_APP_ID = '2073630512892455';
import Expo from "expo";
import I18n from 'ex-react-native-i18n';
I18n.fallbacks = true

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};

export default class Opening extends Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: true,}
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    try {
     AsyncStorage.getItem('userInformationBasic', (err, result)=>{
      var json = JSON.parse(result)
      this.setState({userInformationBasic : json})
      })
    } catch (error) {
      // Error saving data
    }
    await I18n.initAsync();
    this.setState({isLoading:false})
  }
  async logInFB() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2073630512892455', {
        permissions: ['public_profile','email','user_birthday', 'user_friends'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
        /*Alert.alert(
          'Logged in!',
          `Hi ${(await response.json()).name}!`,
        );
        const userInfo = await response.json().then(this.setState({ userInfo }));
        console.log(userInfo);*/
        let userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email,birthday`
        );
        const userInfo = await userInfoResponse.json();
        //this.setState({ userInfo });
        //console.log(userInfo)
        this.updateWithFacebook(userInfo)
        Actions.flatListViewArticle()
    }
  }
  updateWithFacebook(userInfo){
    console.log(userInfo)
    console.log(userInfo.name)
    const u = this.state.userInformationBasic;
    u.firstName = userInfo.name.split(" ")[0];
    u.lastName = userInfo.name.split(" ")[1];
    u.email = userInfo.email;
    u.image = userInfo.picture.data.url;
    u.birth = userInfo.birthday.split("/")[1]+"-"+userInfo.birthday.split("/")[0]+"-"+userInfo.birthday.split("/")[2];
    u.facebook = 1;
    u.mail=1;
    this.setState({
      userInformationBasic : u,
    });
    console.log(u)
    try {
      AsyncStorage.setItem('userInformationBasic', JSON.stringify(this.state.userInformationBasic));
      
    } catch (error) {
      // Error saving data
      console.log("error")
    }
    Actions.flatListViewArticle()
  }
  async  signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '18527368615-6muuu4pvirifog1ufdei401tsgivm55f.apps.googleusercontent.com',
        iosClientId: '18527368615-5rkmhp6aum543q94mlrsrftio5naue04.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        //console.log(result)
        this.updateWithGoogle(result)
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }
  updateWithGoogle(result){
    console.log(result)
    const u = this.state.userInformationBasic;
    u.firstName = result.user.givenName;
    u.lastName = result.user.familyName;
    u.email = result.user.email;
    u.image = result.user.photoUrl;
    u.google = 1;
    u.mail=1;
    this.setState({
      userInformationBasic : u,
    });
    console.log(u)
    try {
      AsyncStorage.setItem('userInformationBasic', JSON.stringify(this.state.userInformationBasic));
      
    } catch (error) {
      // Error saving data
      console.log("error")
    }
    Actions.flatListViewArticle()
  }
  loginG = async () => {
    const result = await this.signInWithGoogleAsync()
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        
        <View animation={'zoomIn'} delay={600} duration={400}>
        
        <Button iconLeft block onPress={this.props.onSignInPress} style={{backgroundColor:'#212121'}} > 
          <Icon name="ios-at-outline" /> 
          <Text style={{color:'white'}}>{I18n.t('opening_email')}</Text>
        </Button>
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{I18n.t('opening_or')}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={700} duration={400}>
          <Button iconLeft block  danger onPress={()=>this.loginG()}><Icon name="logo-google" /> <Text> Google </Text></Button>
        </View>
        <View style={{ marginVertical: 20}} animation={'zoomIn'} delay={700} duration={400}>
          <Button iconLeft block primary onPress={()=>this.logInFB()}><Icon name="logo-facebook" /> <Text> Facebook </Text></Button>
        </View>
        <View animation={'zoomIn'} delay={700} duration={400}>
        <Button iconLeft block info onPress={() => Alert.alert(
                  'lifehack',
                  'Delete Twitter from your phone, because it is the worst',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: this.onDeleteBTN},
                  ],
                  { cancelable: false }
                )}><Icon name="logo-twitter" /> <Text> Twitter </Text></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: '#9B9FA4'
  },
  createAccountButtonText: {
    color: 'white'
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4'
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: '#1976D2'
  },
  signInButtonText: {
    color: 'white'
  }
})
