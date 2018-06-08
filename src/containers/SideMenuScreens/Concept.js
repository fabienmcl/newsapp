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
  Modal,
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem,Thumbnail } from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
import SConcept from './SimpleConcept';
const screen = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import logo from '../../images/Renewal.png'
import arbre from '../../images/arbre.png'

export default class Concept extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isLoading: true, isOpen: false, selectedItem: 'concept', isModalVisible: false}
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }
 
  
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

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
    if(this.state.selectedItem != 'concept'){
      console.log("chargement de la page "+this.state.selectedItem)
      switch(this.state.selectedItem){
        case 'favoris' : Actions.favoris() 
          break;
        case 'historique' : Actions.historique()
          break;
        case 'compte' : Actions.monCompte()
          break;
        case 'recommandation' : Actions.flatListViewArticle()
          break;
        case 'param' : Actions.param()
          break;
      }
      this.setState({
        selectedItem: 'concept',
      });
    }
    
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });
 
  render() {
   
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        disableGestures={false}
      
      >
      
      <View style={{justifyContent: 'center', flex:1, backgroundColor : "#212121",paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
      
      <Header style={{backgroundColor: '#212121'}}>
        <StatusBar barStyle="light-content"/>
        <Left >
          <Button transparent>
            <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
          </Button>
        </Left>
        <Body >
         
          <Title style={{color:'white'}}>{this.props.navigation.state.params.title}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
        <SConcept>
        </SConcept>
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

  },
  iconStyle:{
    color: 'black',
    width :'10%',
    paddingLeft: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 620
  },
  slide1: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#212121'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#212121'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
}
});

/**
 * https://react-native.canny.io/feature-requests/p/scrollview-animation-events-eg-onscrollanimationend
 */