import Expo, { SQLite, Font, AppLoading, Accelerometer, Gyroscope, Magnetometer, Location } from 'expo';
import React, { Component } from 'react';
import { 
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
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
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
import DiverseRecommendation from '../ListOfArticles/FlatListViewArticle';
import Favorites from '../SideMenuScreens/Favorite';
import History from '../SideMenuScreens/History';
import Account from '../SideMenuScreens/Account';
import Concept from '../SideMenuScreens/SimpleConcept'



export default class Project extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      isLoading: true, 
      isOpen: false, 
      refreshing: true,
      selectedItem: 'recommandation', 
      items: null,
      newscastsState : null,
      newscastSavedState : null,
      isConnected: true,
      time_launch : null,
      y:null,
      paquet : [],

      date : null,
      time : null,
      localisation : null,
      accelerometerData : null,
      gyroscopeData : null,
      magnetometerData : null,
      networkInfo : null,



    }
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
   
  }
  async componentDidMount(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    //console.log(this.state)

   
    
    console.log(this.state)
    //await this._subscription();
    //this.init().then(this.select());
    
  }
  componentWillUnmount() {
  }

  
  
  
  
  
  
  
  
  
  
 

  
  
  

  /*
    Partie side menu
  */
  _sideMenuPress(){
    console.log("le menu le menu le menu");
    this.toggle();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
    console.log("updateMenu")
    /*
    if(this.state.selectedItem != 'recommandation'){
      console.log("chargement de la page "+this.state.selectedItem)
      switch(this.state.selectedItem){
        case 'favoris' : Actions.favoris() 
          break;
        case 'historique' : Actions.historique()
          break;
        case 'compte' : Actions.monCompte()
          break;
        case 'concept' : Actions.concept()
          break;
        case 'param' : Actions.param()
          break;
      }
      this.setState({
        selectedItem: 'recommandation',
      });
    }*/
    
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  


  
  
  
  contentSwitch(){
    switch(this.state.selectedItem){
      case 'recommandation' : 
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          < ActivityIndicator size="large" />
          </View>
        );
      case 'favoris' :
        return (
          <Favorites />
        );
      case 'historique' :
        return (
          <History />
        );
      case 'compte' : 
        return (
          <Account />
        );
      case 'concept' : 
        return (
          <Concept />
        )
    }
    return null;
  }
  
  render() {
    /*
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }*/
    let content = this.contentSwitch();
    
    
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    console.log(this.state.selectedItem)


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
          <Body>
            <Title style={{color:'white'}}>Renewal</Title>
          </Body>
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
    top: 30
  },
  offlineText: { color: '#fff' }
});

/**
 * https://react-native.canny.io/feature-requests/p/scrollview-animation-events-eg-onscrollanimationend
 */