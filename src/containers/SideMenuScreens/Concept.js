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
      <Content  style={{backgroundColor:'#212121'}} >
        <Swiper style={styles.wrapper} loop={false} showsButtons>
          <View style={styles.slide1}>


          <Content>
          
          <Card style={{flex: 0}}>
          <CardItem header bordered>
              <Text>Renewal</Text>
          </CardItem>
          <CardItem bordered>
              <Body>
                <Text>
                  Analyse intelligente de votre comportement blabla et blabla avec son meilleur ami blabla
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor dictum auctor. Aliquam sagittis orci eu tristique fermentum. Fusce in dictum metus. Sed mollis facilisis quam, at dignissim felis maximus a. Morbi quis pellentesque lectus. Aliquam laoreet massa at nibh mattis, in fermentum leo viverra. Praesent molestie lectus congue tristique dictum. Integer viverra consequat convallis.

                </Text>
              </Body>
            </CardItem>
          <CardItem header bordered>
              <Text>Utilise vos reseaux sociaux</Text>
            </CardItem>
            <CardItem>
              <Icon active name="logo-google" />
              <Text>Google Plus</Text>
             </CardItem>
             <CardItem>
              <Icon active name="logo-facebook" />
              <Text>Facebook</Text>
             </CardItem>
             <CardItem>
              <Icon active name="logo-twitter" />
              <Text>Twitter</Text>
             </CardItem>
           </Card>
           <Button onPress={() => {
                  this._toggleModal();
                }}  block danger> 
              <Text>En savoir plus </Text>
            </Button>
           </Content>
            
            
            
          </View>
          {/*<View style={styles.slide2}>
            <Text style={styles.text}>Renewal</Text>
              </View>*/}
          <View style={styles.slide3}>
          <Card style={{flex: 0}}>
          <CardItem header bordered>
              <Text>Donne moi ton MDP </Text>
          </CardItem>
          <CardItem bordered>
              <Body>
                <Text>
                  Je veux juste te voler tes données, analysé les photos de chats que tu partages et les nudes que tu like *smile*
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor dictum auctor. Aliquam sagittis orci eu tristique fermentum. Fusce in dictum metus. Sed mollis facilisis quam, at dignissim felis maximus a. Morbi quis pellentesque lectus. Aliquam laoreet massa at nibh mattis, in fermentum leo viverra. Praesent molestie lectus congue tristique dictum. Integer viverra consequat convallis.
                </Text>
              </Body>
            </CardItem>
            </Card>
            
            <Button iconLeft block danger>
              <Icon name='logo-google' />
              <Text>Google</Text>
            </Button>
            <Button iconLeft block>
              <Icon name='logo-facebook' />
              <Text>Facebook</Text>
            </Button>
            <Button iconLeft block dark>
              <Icon name='logo-twitter' />
              <Text>Twitter</Text>
            </Button>
          </View>
        </Swiper>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          
        <Content>
          <Card style={{flex: 0}}>
          <CardItem header bordered>
              <Left>
              <Text>Renewal</Text>
              </Left>
              <Right>
              <Button  iconLeft  onPress={() => {
                  this._toggleModal();
                }}
                danger> 
                <Icon name='arrow-back' />
              <Text>Close </Text>
              </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor dictum auctor. 
                Aliquam sagittis orci eu tristique fermentum. Fusce in dictum metus. 
                Sed mollis facilisis quam, at dignissim felis maximus a. Morbi quis pellentesque lectus. 
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                Aliquam laoreet massa at nibh mattis, in fermentum leo viverra. 
                Praesent molestie lectus congue tristique dictum. Integer viverra consequat convallis. 
                Donec condimentum, nulla in porta consectetur, dui risus molestie arcu, id faucibus diam felis vel lectus. 
                Sed venenatis lorem ex, ut sagittis ligula interdum vel. Integer sodales odio ex, eu fermentum quam luctus malesuada. 
                Proin eget est quis sem ultrices placerat. Suspendisse potenti. Praesent mollis vitae magna eget luctus. 
                Aliquam consectetur sem nec velit tincidunt efficitur. Praesent leo sem, fringilla at nibh vel, lobortis consectetur velit. 
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text> C'est pour la recherche </Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                Aliquam laoreet massa at nibh mattis, in fermentum leo viverra. 
                Praesent molestie lectus congue tristique dictum. Integer viverra consequat convallis. 
                Donec condimentum, nulla in porta consectetur, dui risus molestie arcu, id faucibus diam felis vel lectus. 
                Sed venenatis lorem ex, ut sagittis ligula interdum vel. Integer sodales odio ex, eu fermentum quam luctus malesuada. 
                Proin eget est quis sem ultrices placerat. Suspendisse potenti. Praesent mollis vitae magna eget luctus. 
                Aliquam consectetur sem nec velit tincidunt efficitur. Praesent leo sem, fringilla at nibh vel, lobortis consectetur velit. 
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-facebook" />
                  <Text>2,854 Likes</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-twitter" />
                  <Text>5,629 Followers </Text>
                </Button>
              </Right>
            </CardItem>
            
          </Card>
          <Button onPress={() => {
                  this._toggleModal();
                }}
                block success> 
              <Text>Close </Text>
              </Button>
        </Content> 
          
        </Modal>
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