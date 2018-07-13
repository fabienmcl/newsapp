import Expo, { SQLite, Font, AppLoading, Accelerometer, Gyroscope, Magnetometer, Location } from 'expo';
import React, { Component } from 'react';
import { 
  AppState,
  StyleSheet, 
  Platform, 
  View, 
  ActivityIndicator, 
  FlatList, 
  Image,
  Alert, 
  YellowBox, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  NetInfo,
  ScrollView 
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Root, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
const screen = Dimensions.get('window');
import I18n from 'ex-react-native-i18n';
I18n.fallbacks = true
const deviceLocale = I18n.locale
I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};

//Import Screen
import DiverseRecommendation from '../ListOfArticles/DiverseRecommendation';
import Favorites from '../SideMenuScreens/Favorite';
import History from '../SideMenuScreens/History';
import Account from '../SideMenuScreens/Account';
import Concept from '../SideMenuScreens/SimpleConcept';
import Settings from '../SideMenuScreens/Settings';

//import sensors
import accelerometerSensor  from '../Sensors/AccelerometerSensor';
import gyroscopeSensor from '../Sensors/GyroscopeSensor';
import locationSensor from '../Sensors/LocationSensor';

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>{I18n.t('no_connection')}</Text>
  </View>
/*
    <View style={{flex:1,height: 30, alignItems: 'center',}}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>*/
  );
}

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      appState: AppState.currentState,
      isLoading: true, 
      isOpen: false, 
      refreshing: true,
      selectedItem: null,
      items: null,
      loading: true,
    }
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
   
  }
  
  async componentDidMount(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    await I18n.initAsync();
    //console.log(this.props)
    this.setState({ loading: false });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    AppState.addEventListener('change', this._handleAppStateChange);
    //accelerometerSensor._subscribe();
    //gyroscopeSensor._subscribe();
    //locationSensor._subscribe();
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    AppState.removeEventListener('change', this._handleAppStateChange);
    //accelerometerSensor._unsubscribe();
    //gyroscopeSensor._unsubscribe();
    //locationSensor._unsubscribe();
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        this.setState({ networkInfo : 'type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType });
        });
    } else {
      this.setState({ isConnected });
    }
  };
  /*
    Partie side menu
  */
  _sideMenuPress(){
    this.toggle();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  fetchEvent =  async (something, someData)=>{
    return someData === null ? 
      console.log("[{Event : "+something+", timestamp :"+Date.now()+"}]")
      :
      console.log("[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]")
  }
  onMenuItemSelected = item =>{
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    this.fetchEvent("menuItemSelected", "goToScreen : "+item+", from : "+this.props.navigation.state.params.screen)
    this.props.navigation.state.params.screen = item;
  }

  contentSwitch(){
    if(this.state.isConnected === false){
      return <View style={{flex:1}} ><MiniOfflineSign /></View>
    }
    switch(this.props.navigation.state.params.screen){
      case "Favorite" :
        return (
          <Favorites />
        );
      case "History" :
        return (
          <History />
        );
      case "Account" : 
        return (
          <Account />
        );
      case "SimpleConcept" : 
        return (
          <Concept />
        );
      case "Settings" : 
        return (
          <Settings />
        );
      default : 
        return (
          this.state.isConnected === false ? <View style={{flex:1}} ><MiniOfflineSign /></View> : <DiverseRecommendation />
        );
      
    }
    return null;
  }
  contentHeaderSwitch(){
    switch(this.props.navigation.state.params.screen){
      case "Favorite" :
        return (
          <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
            <Button transparent>
              <Icon name='ios-star' style={{ color: '#fff'}}   />
            </Button>
            <Title style={{color:'white'}}>{I18n.t('side_menu_fav')}</Title>
          </Body>
        );
      case "History" :
        return (
          <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
            <Button transparent>
              <Icon name='ios-stats' style={{ color: '#fff'}}   />
            </Button>
            <Title style={{color:'white'}}>{I18n.t('side_menu_history')}</Title>
          </Body>
        );
      case "Account" : 
        return (
          <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
            <Button transparent>
              <Icon name='ios-person' style={{ color: '#fff'}}    />
            </Button>
            <Title style={{color:'white'}}>{I18n.t('side_menu_account')}</Title>
          </Body>
        );
      case "SimpleConcept" : 
        return (
          <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
            <Button transparent>
              <Icon name='ios-cafe' style={{ color: '#fff'}}   />
            </Button>
            <Title style={{color:'white'}}>{I18n.t('side_menu_concept')}</Title>
          </Body>
          
        );
      case "Settings" : 
        return (
          <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
            <Button transparent>
              <Icon name='ios-settings' style={{ color: '#fff'}}    />
            </Button>
            <Title style={{color:'white'}}>{I18n.t('side_menu_account')}</Title>
          </Body>
        );
      default : 
        return (
          <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
            <Button transparent>
              <Icon name='ios-home' style={{ color: '#fff'}}    />
            </Button>
            <Title style={{color:'white'}}>RENEWAL</Title>
          </Body>
      );
      
    }
    return null;
  }
  
  render() {
    let content = this.contentSwitch();
    let contentHeader = this.contentHeaderSwitch();
    
    
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    //console.log(this.state.selectedItem)

    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    /*
    if(this.state.appState==="background" ){
      this.componentWillUnmount();
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }*/
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
      <View style={{ justifyContent: 'center', flex:1,backgroundColor : "#212121",paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}} >
        <Header style={{backgroundColor: '#212121'}}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent>
              <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
            </Button>
          </Left>
          {contentHeader}
          <Right>
          </Right>
        </Header>
        {content}
      </View>
      </SideMenu>
    );
  }
}

 
const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    backgroundColor : "white"
    //margin: 5,
    //marginTop: (Platform.OS === 'ios') ? 20 : 0,  
  },
  imageView: {
    height: screen.height / 5,

    margin: 7,
    borderRadius : 7,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textView: { 
    textAlignVertical:'center',
    textAlign: 'center',
    padding:10,
    color: '#000',
    width : '80%',
    margin:0,
    padding:0

  },
  iconStyle:{
    color: 'black',
    width :'10%',
    paddingLeft: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop : 0,
    paddingBottom : 0
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width : screen.width,
    position: 'absolute',
  },
  offlineText: { 
    color: '#fff', }
});