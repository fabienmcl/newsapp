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
  AsyncStorage, 
  ListView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Switch, Separator, Card, CardItem} from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
const screen = Dimensions.get('window');

let settings = [
  {
  location : true,
  gyroscope : true,
  accelerometer : true,
  magnetometer : true,
  networks : true,
  activity : true, 
  access :true

}];


export default class Param extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isLoading: true, isOpen: false, selectedItem: 'param', location:false, settings:null}
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }

  async componentDidMount(){
    console.log(settings)
    console.log(settings[0].location)
       
    try {
     // AsyncStorage.setItem('settings', JSON.stringify(settings));
      AsyncStorage.getItem('settings', (err, result)=>{
        console.log(result)
        var json = JSON.parse(result)
        console.log(json[0].location)
        this.setState({settings : json[0], isLoading: false })
        console.log(this.state.settings.location)

      })
      //AsyncStorage.removeItem('settings',(error, result));
      
    } catch (error) {
      // Error saving data
    }
    
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
    if(this.state.selectedItem != 'param'){
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
        case 'concept' : Actions.concept()
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
 
  changeStateLocation(){
    const s = this.state.settings;
    console.log(s)
    s.location = s.location === 0 ? 1:0;
    console.log(s)
    this.setState({
      settings : s
    })
  }
  handleChangePhone(){
    console.log(this.state.dialogText)
    const userInformationBasic = this.state.userInformationBasic;
    userInformationBasic.phone = this.state.dialogText;
    this.setState({
      userInformationBasic,
      dialogPhoneIsVisible:false
    });
  }
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
      <Content>
          <List>
          <ListItem itemDivider style={{backgroundColor:'#eeeeee'}}>
              <Text style={{fontWeight: 'bold'}}>Gestion des capteurs</Text>
            </ListItem> 
            <ListItem itemDivider style={{backgroundColor:'#e0e0e0'}}>
            <Text style={{color:'#a4a4a4', fontSize:14}}>
                Certaines articles sont basées sur l'analyse fine de votre comportement.
                L'accès a ses capteurs permet une recommandation d'article.
            </Text>
            </ListItem> 
            <List style={{backgroundColor:'#ffffff'}}>
            
            <ListItem icon >
              <Left>
              <Text>Localisation</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Switch value={this.state.settings.location === 0 ? false : true} onChange={()=>this.changeStateLocation()}/>
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Gyroscope</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Switch value={this.state.settings.gyroscope === 0 ? false : true} />
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Accelerometer</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Switch value={this.state.settings.accelerometer === 0 ? false : true}  />
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Magnetometer</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Switch value={this.state.settings.magnetometer === 0 ? false : true}  />
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Qualité du réseaux</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Switch value={this.state.settings.networks === 0 ? false : true}  />
              </Right>
            </ListItem>
            
            </List>
            
            <ListItem itemDivider style={{backgroundColor:'#eeeeee'}}>
              <Text  style={{fontWeight: 'bold'}}>Gestion des recommandations</Text>
            </ListItem> 
          <ListItem itemDivider style={{backgroundColor:'#e0e0e0'}}>
          <Text style={{color:'#a4a4a4', fontSize:14}}>
                Certaines articles sont basées sur ce que vous faites ailleurs. 
                Mais vous verrez toujours des articles sur votre utilisation au sein de l'application.
              </Text>
            </ListItem> 
            <List style={{backgroundColor:'#ffffff'}}>
            
            <ListItem icon >
              <Left>
              <Text>Basé sur votre activé</Text>
              </Left>
              <Body>
              </Body>
              <Right>
                <Switch value={this.state.settings.activity === 0 ? false : true}  />
              </Right>
            </ListItem>
            </List>

            <List style={{backgroundColor:'#ffffff'}}>
            <ListItem itemDivider style={{backgroundColor:'#f5f5f5'}}>
            <Text style={{color:'#a4a4a4', fontSize:14}}>
              Certaines recommandation d'articles sont basées sur activité en ligne sur les réseaux sociaux .   
            </Text>
            </ListItem> 
            <ListItem icon >
              <Left>
              <Text>Conservation et accès aux informations</Text>
              </Left>
              <Body>
              </Body>
              <Right>
                <Switch value={this.state.settings.access === 0 ? false : true}  />
              </Right>
            </ListItem>
            
            <ListItem itemDivider style={{backgroundColor:'#f5f5f5'}}>
            <Text style={{color:'#a4a4a4', fontSize:14}}>
              La conservation d'informations ou l'accès à des informations déjà conservées sur votre appareil, par exemple des identifiants de l'appareil
            </Text>
            </ListItem>
            </List>

            
            <ListItem itemDivider style={{backgroundColor:'#eeeeee'}}>
              <Text style={{fontWeight: 'bold'}}>Plus d'information</Text>
            </ListItem> 
            <List style={{backgroundColor:'#ffffff'}}>
            
            <ListItem icon >
              <Left>
              <Text>Assistance</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Icon name="arrow-forward" />
               </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Politique de confidentialité</Text>
              </Left>
              <Body>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Condition de Service</Text>
              </Left>
              <Body>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
              <Text>Juridique(autres)</Text>
              </Left>
              <Body>
              </Body>
              <Right>
              <Icon name="arrow-forward" />
               </Right>
            </ListItem>
            
            
            </List>




          </List>
          <Button
                block danger> 
              <Text>Demander mes données </Text>
              </Button>
        </Content>
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