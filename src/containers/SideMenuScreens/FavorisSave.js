import Expo, { SQLite } from 'expo';
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
  StatusBar
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
const screen = Dimensions.get('window');
const db = SQLite.openDatabase('db.db');

export default class Favoris extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      isLoading: true, 
      isOpen: false, 
      selectedItem: 'favoris', 
      //items:null,
      newscastSavedState:null,
      refreshing: false
    }
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }
  componentDidMount(){
    this.update();
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
    if(this.state.selectedItem != 'favoris'){
      console.log("chargement de la page "+this.state.selectedItem)
      switch(this.state.selectedItem){
        case 'compte' : Actions.compte() 
          break;
        case 'concept' : Actions.concept()
          break;
        case 'historique' : Actions.historique()
          break;
        case 'recommandation' : Actions.flatListViewArticle()
          break;
      }
      this.setState({
        selectedItem: 'compte',
      });
    }
    
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });
 
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        disableGestures={false}
      
      >
      
      <View style={styles.MainContainer}>
      
      <Header style={{backgroundColor: '#212121'}}>
        <StatusBar barStyle="light-content"/>
        <Left style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Button transparent>
            <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
          </Button>
        </Left>
        <Body style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
          <Button transparent>
            <Icon name='ios-star' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
          </Button>
          <Title style={{color:'white'}}>{this.props.navigation.state.params.title}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <Content  style={{backgroundColor:'#212121'}} >
      <FlatList
          data={ this.state.newscastSavedState }
          extraData={this.state}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item, index}) => 
          <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=> Actions.webviewcustom(item)} >
              <Image source = {{ uri: item.image }} style={styles.imageView}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width:'100%', }}>
            <TouchableOpacity
              key={item.id}
              onPress={()=> Actions.webviewcustom(item)}
              style={{
                padding: 5,
                backgroundColor: 'white',
                width:'90%'
              }}
            >
            <Text>{item.title}</Text>
            </TouchableOpacity>
                  <Icon name='ios-close' style={styles.iconStyle}  onPress={() => this.remove(item)} />
            </View>
            
        </View>
          }
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          />
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
  update() {
    console.log("je suis dans update")
    db.transaction(tx => {
      tx.executeSql(
        `select * from newscastSaved;`,
        [],
        (_, { rows: { _array } }) => this.setState({ newscastSavedState: _array })
      );
    });
    //console.log(this.state.newscastSavedState)
  }
  remove(item) {
    console.log("je suis dans remove")
    db.transaction(
      tx => {
        tx.executeSql('delete from newscastSaved  where id = ?', [item.id]);
        tx.executeSql('select * from newscastSaved', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
        tx.executeSql('update  newscasts set isSaved = ? where title = ?', [0, item.title]);
        tx.executeSql('select * from newscasts', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      }
    );
    this.update();
    //console.log(this.state.items)
    //setTimeout(() => {Actions.refresh({items: this.state.items})}, 500)
    
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.update();
      }
    );
   
  };
  
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
   // tintColor: 'gray', 
  },
  textView: { 
    textAlignVertical:'center',
    textAlign: 'center',
    padding:10,
    color: '#fff',
    width : '80%',

  },
  iconStyle:{
    color: 'red',
    width :'10%',
    paddingLeft: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color :'#fff'
  },
});

/**
 * https://react-native.canny.io/feature-requests/p/scrollview-animation-events-eg-onscrollanimationend
 */