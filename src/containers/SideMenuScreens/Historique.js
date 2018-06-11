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
  ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, DeckSwiper, Card, CardItem,Thumbnail} from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
import TreePicker from 'react-native-tree-picker';
import I18n from 'ex-react-native-i18n';
I18n.fallbacks = true
const deviceLocale = I18n.locale

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};

const screen = Dimensions.get('window');
const data = [
  {
      "id":1, 
      "key":1,
      "Title":"title",

      "Children": [
          {
              "id":2,
              "Id":2,
              "key":2, 
              "Key":2,
              "Title":"title children",
              
          }
      ]
  },
  {
      "id":3, 
      "Id":3,
      "key":3,
      "Key":3,
      "Title":"title other"
  }
];
const family = [
  {
    id: 'Grandparent',
    key : 1,
    name: 'Grandpa',
    age: 78,
    children: [
      {
        id: 'Me',
        key:2,
        name: 'Me',
        age: 30,
        children: [
          {
            id: 'Erick',
            key:3,
            name: 'Erick',
            age: 10,
          },
          {
            id: 'Rose',
            key:4,
            name: 'Rose',
            age: 12,
          },
        ],
      },
    ],
  },
];
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: "https://picsum.photos/200",
  },
  
];
export default class Historique extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isLoading: true, isOpen: false, selectedItem: 'historique', languages: []}
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }
 
  async componentWillMount() {
    await I18n.initAsync();
    this.setState({isLoading:false})
  }
  
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
    if(this.state.selectedItem != 'historique'){
      console.log("chargement de la page "+this.state.selectedItem)
      switch(this.state.selectedItem){
        case 'favoris' : Actions.favoris() 
          break;
        case 'concept' : Actions.concept()
          break;
        case 'compte' : Actions.monCompte()
          break;
        case 'recommandation' : Actions.flatListViewArticle()
          break;
        case 'param' : Actions.param()
          break;
      }
      this.setState({
        selectedItem: 'historique',
      });
    }
    
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
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
        <Left>
          <Button transparent>
            <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
          </Button>
        </Left>
        <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
          <Button transparent>
            <Icon name='ios-stats' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
          </Button>
          <Title style={{color:'white'}}>{I18n.t('side_menu_history')}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <Content  style={{backgroundColor:'#212121'}} >
      {/*
      <View style={{ flex: 1 }}>
                <TreePicker 
                    title="Select" 
                    data={data}
                    onPress={()=>console.log("onPress")}
                    selectParent={true} />
                    
         
            </View>
        */}
        <Text>{I18n.t('greeting')}</Text>
        </Content>
        <Footer style={{ backgroundColor: '#212121'}} >
          <FooterTab>
            <Button full>
              <Text >footer </Text>
            </Button>
          </FooterTab>
        </Footer>
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
  }
});

/**
 * https://react-native.canny.io/feature-requests/p/scrollview-animation-events-eg-onscrollanimationend
 */