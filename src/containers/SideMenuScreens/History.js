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

export default class Historique extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, languages: []}
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }
 
  async componentWillMount() {
    await I18n.initAsync();
    setTimeout(() => this.setState({ isLoading:false })) 
  }

  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      
      
      
      
      <View style={{justifyContent: 'center',alignItems: 'center',  height : Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height-100 : Dimensions.get('window').height, width:'100%'}}>
        
        <Image
          style={{width: 150, height: 150}}
          source={require('../../images/coming-soonn.png')}
        />
        <Button block rounded danger  onPress={() => console.log("fr")} ><Text>This feature will arrive quickly</Text> </Button> 
      </View>
               
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