import React, { Component } from "react";
import {
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    View,
    StatusBar,
} from "react-native";
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
{/*import { Header } from 'react-native-elements';*/}
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.47;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/20);
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
const SCREEN_HEIGHT_CUSTOM_HEADER = SCREEN_HEIGHT/20;
const SCREEN_HEIGHT_CUSTOM_REST= SCREEN_HEIGHT - SCREEN_HEIGHT_CUSTOM_HEADER;
const PropTypes = require('prop-types');
import I18n from 'ex-react-native-i18n';
I18n.fallbacks = true
const deviceLocale = I18n.locale

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};
import WVContent from './WVContent';
import WVStrip from './WVStrip';


 
export default class MessageWebView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false, 
            isOpenB:false,
            selectedItem: 'wv',
            title : this.props.navigation.state.params.title,
        };
        this.springValue = new Animated.Value(1)
    }
    async componentDidMount(){
        await I18n.initAsync();
        this.setState({isLoading:false})
    }
    
    fetchEvent =  async (something, someData)=>{
        return someData === null ? 
            console.log("[{Event : "+something+", timestamp :"+Date.now()+"}]")
            :
            console.log("[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]")
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
        console.log("menu update")
    }
    
    onMenuItemSelected = item =>{
        this.fetchEvent("menuItemSelected", "goToScreen : "+item+", fromTitle : "+this.props.navigation.state.params.title+" fromUrl : "+this.props.navigation.state.params.url)
        this.props.navigation.state.params.previous === item ? this.props.navigation.goBack() : Actions.screnCenter({screen : item})    
    }
    render() {
        const { html, source, url, onMessage, ...props } = this.props
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                disableGestures={true}
                menuPosition={'left'}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
            <View  style={{justifyContent: 'center', flex:1, backgroundColor : "#212121", paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}} >
            <Header style={{backgroundColor: '#212121'}}>
                <StatusBar barStyle="light-content"/>
                <Left style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Button transparent>
                        <Icon name='ios-arrow-back-outline' style={{ color: '#fff'}}   onPress={()=>this.fetchEvent("back", "fromTitle : "+this.props.navigation.state.params.title+" fromUrl : "+this.props.navigation.state.params.url)&&this.props.navigation.goBack()} />
                    </Button>
                    <Button transparent>
                        <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>{this.props.navigation.state.params.title}</Title>
                </Body>
                <Right>
                </Right>
            </Header>
           <View style={{flex:1}} >
           
        {this.props.children}
            <WVContent props={this.props} />


           </View>
            </View>
            </SideMenu>
        )
    }
}
const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        flex:1,
        backgroundColor : "white"
    },
    container: {
       height: '92%',
    }
 })