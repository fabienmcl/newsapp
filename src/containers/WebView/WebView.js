import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Animated,
    Dimensions,
    Keyboard,
    Platform,
    FlatList,
    Slider,
    ScrollView,
    WebView,
    View,
    StatusBar,
    Share,
    Linking,
    ActivityIndicator,
    YellowBox
} from "react-native";
import {Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
{/*import { Header } from 'react-native-elements';*/}
const SCREEN_HEIGHT = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;
const SCREEN_WIDTH  = Dimensions.get('window').height < Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;
const SCREEN_WIDTH_CUSTOM_PADDING = SCREEN_WIDTH*0.47;
const SCREEN_HEIGHT_CUSTOM = SCREEN_HEIGHT-(SCREEN_HEIGHT/20);
import FlatListViewArticle from '../ListOfArticles/FlatListViewArticleRecommandation';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
import TimerMixin from 'react-timer-mixin';
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
import javasciptInjectionWithPatchPostMessage from './injectionJS';


export default class MessageWebView extends React.Component {
    constructor(props) {
        super(props)
        this.postMessage = this.postMessage.bind(this)
        this.state = {
            isOpen: false, 
            isOpenB:false,
            isConnected : true,
            modalVisible : false,
            selectedItem: 'wv',
            isClickScroll : false,
            isInScroll:false,
            isScrollPositionY:"0",
            isScrollToDown : false,
            title : this.props.navigation.state.params.title, 
            icon : "md-arrow-dropup", 
            scrollEventAnimation : false,
            scrollIsEnabled : false,
            scrollStartFrom : "bottom",
            orientation : Dimensions.get('window').height > Dimensions.get('window').width ? 'portrait' : 'landscape' 
        };
        
        this.springValue = new Animated.Value(1)
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: encountered an error loading page',
            'Warning: componentWillReceiveProps is deprecated',
            'TypeError: undefined is not an object'
        ]);
        console.disableYellowBox = true;
    }
    async componentDidMount(){
        await I18n.initAsync();
        this.setState({isLoading:false})
    }
    //Strip part 

    /*
    Animated
    */
    spring () {
        this.springValue.setValue(0.3)
        setTimeout(() => {
            Animated.spring(
                this.springValue,
                {
                  toValue: 1.3,
                  friction: 1,
                  tension: 1
                }
              ).start()
        }
        , 300)
    }
    
    _onPress= (event) => {
        //console.log(event.nativeEvent)
        this.setState(previousState => {
            return {isClickScroll: true, scrollIsEnabled:false  };
        });
        console.log(this.state.isClickScroll)
        if(this.state.isOpenB == false){
            this.scrollView.scrollTo({x: 0, y: SCREEN_HEIGHT_CUSTOM_REST -(SCREEN_HEIGHT_CUSTOM_HEADER*2) , animated: true})
            this.setState(previousState => {
                return {icon: "md-arrow-dropdown", isOpenB: true  };
            });
            console.log("this.state.isOpen == "+this.state.isOpenB+"  && this.state.scrollEventAnimation == "+this.state.scrollEventAnimation);
            //setTimeout(() => {this.setState({icon: "md-arrow-dropdown"})}, 0)
            //setTimeout(() => {this.setState({isOpen: true})}, 500)
            
        }else{
            
            this.scrollView.scrollTo({x: 0, y: 0, animated: true})
            //setTimeout(() => {this.setState({})}, 0)
            this.setState(previousState => {
                return { icon: "md-arrow-dropup", isOpenB: false, scrollIsEnabled:true,  };
              });
            //setTimeout(() => {this.setState({isOpen: false})}, 500)
            //setTimeout(() => {this.setState({icon: "md-arrow-dropup", isOpen: false})}, 1000)
        }

    }
    _handleScroll = (event) => {
        if(this.state.isInScroll == true){
            console.log("scroll detect position: "+event.nativeEvent.contentOffset.y+" isInScroll: "+this.state.isInScroll )
            const positionY = event.nativeEvent.contentOffset.y+" ";
            const splitPositionY = positionY.split('.')[0];
            console.log("position split :"+splitPositionY);
            
            this.setState( { isScrollPositionY : event.nativeEvent.contentOffset.y+""});

            if(Number.parseInt(this.state.isScrollPositionY, 10) > Number.parseInt(splitPositionY, 10)  ){
                console.log("down scroll");
                this.setState(previousState => {
                    return {isScrollToDown:true  };
                });
            }else{
                console.log("up scroll");
                this.setState(previousState => {
                    return {isScrollToDown:false  };
                });
            }

            this.setState(previousState => {
                return { isScrollPositionY: splitPositionY };
            });
            if(Number.parseInt(this.state.isScrollPositionY, 10) > SCREEN_HEIGHT_CUSTOM_REST/2){
                this.setState(previousState => {
                    return {icon: "md-arrow-dropdown", isOpenB: true  };
                });
            }else{
                this.setState(previousState => {
                    return { icon: "md-arrow-dropup", isOpenB: false, scrollIsEnabled : true };
                });
            }
        
        }
        
    }
    _handleScrollBegin = (event) =>{
        console.log("BEGIN scroll _position:"+event.nativeEvent.contentOffset.y);
        const positionY = event.nativeEvent.contentOffset.y+" ";
        const splitPositionY = positionY.split('.')[0];
        console.log("position split :"+splitPositionY);
        if(Number.parseInt(splitPositionY, 10) == 0){
            this.setState(previousState => {
                return { 
                    isOpenB: false, 
                    isScrollPositionY:"0",
                    isScrollToDown : false,
                    icon : "md-arrow-dropup",
                    scrollStartFrom : "bottom"
                };
            });
        }else{
            this.setState(previousState => {
                return { 
                    isOpenB: true, 
                    isScrollPositionY:SCREEN_HEIGHT_CUSTOM_REST -(SCREEN_HEIGHT_CUSTOM_HEADER*2),
                    isScrollToDown:true,
                    icon : "md-arrow-dropdown",
                    scrollStartFrom: "top"
                };
            });
        }
        this.setState(previousState => {
            return {isInScroll:true};
        });
        
    }
    _handleScrollEnd = (event) =>{
        console.log("END scroll _position:"+event.nativeEvent.contentOffset.y);
        if(this.state.isScrollToDown == true){
            this.scrollView.scrollTo({x: 0, y: 0, animated: true})
            //_.delay(() => this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 2000);
            
            //this.scrollView.scrollEnabled=true
            this.setState(previousState => {
                return {isInScroll:false, icon: "md-arrow-dropup", isOpenB: false };
            });
        }else{
            this.scrollView.scrollTo({x: 0, y: SCREEN_HEIGHT_CUSTOM_REST -(SCREEN_HEIGHT_CUSTOM_HEADER*2) , animated: true})
            //_.delay(() => this.scrollView.scrollTo({x: 0, y: SCREEN_HEIGHT_CUSTOM_REST -(SCREEN_HEIGHT_CUSTOM_HEADER*2) , animated: true}), 2000);
            this.setState(previousState => {
                return {isInScroll:false, icon: "md-arrow-dropdown", isOpenB: true, scrollIsEnabled:false  };
            });
            //this.scrollView.scrollEnabled=true
        }
        
        //setTimeout(() => {this.setState({scrollIsEnabled: true})}, 5000)
        
    }
    _touchScrollStartIcon = (event) => {
        console.log( '################ touch start' )
    }
    _touchScrollStartIcon = (event) => {
        console.log( '################ touch end' )
        
    }
    touchStartIcon(){
        console.log("touch start")
        this.setState(previousState => {
            return {isInScroll:true, scrollIsEnabled:true  };
        });
    }
    _onMomentumScrollEnd = (event) => {
        console.log("_onMomentumScrollEnd")
    }
    ShareMessage=()=>{
        Share.share({
            title: this.props.navigation.state.params.title,
            message: `Bonjour, \n je pense que l'article : ${this.props.navigation.state.params.title} pourrait t'interresser. \n `,
            url: this.props.navigation.state.params.url,
            subject: `Je recommande l'article : ${this.props.navigation.state.params.title}` //  for email 
        }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    //WebView content part


    /*
    WebView content fixed message 
    */
    onMessageFromWebView (something){
        try{
            let mess = JSON.parse(something)
            if(mess.appTag === "renewal"){
                switch (mess.event){
                    case "onload" : 
                        console.log({title : this.props.navigation.state.params.title, url : this.props.navigation.state.params.url, event : mess.event, timestamp : mess.timestamp, contentSizeX : mess.contentSizeX, contentSizeY : mess.contentSizeY}) 
                        break;
                    case "scroll" : 
                        console.log({title : this.props.navigation.state.params.title, url : this.props.navigation.state.params.url, event : mess.event, timestamp : mess.timestamp, positionX : mess.positionX, positionY:mess.positionY, maxScrollReachedY : mess.maxScrollReached})
                        break;
                    default : 
                        console.log("other event not catched");

                }
            }
        }catch(e){

        } 
    }
    postMessage(action) {
        try{
            this.WebView.postMessage(JSON.stringify(action))
        }catch(error){
            console.error(error);
        }
    }

    // side menu part 
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

    //fetch fucntion
    
    fetchEvent =  async (something, someData)=>{
        return someData === null ? 
            console.log("[{Event : "+something+", timestamp :"+Date.now()+"}]")
            :
            console.log("[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]")
    }
   
    renderHeader(){
        return (
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
                    <Button transparent>
                        <Icon name='ios-add' style={{ color: '#fff'}}   onPress={()=>this.setModalVisible(true)} />
                    </Button>
                </Right>
            </Header>
        );
    }
    renderErrorWebview(){
        <View style={{flex:1}}> 
            
            <Button block rounded danger onPress={() => {this.setModalVisible(!this.state.modalVisible);}} style={{padding : 15, margin : 15}}>
                <Text>Refresh</Text>
            </Button>
        </View>
    }
    renderStrip(){
        return(
            <View  style={styles.MainContainer} > 
                <ScrollView 
                    onTouchStart={()=>this.touchStartIcon() }
                    onScroll={this._handleScroll} 
                    scrollEventThrottle={100} //min 1 et max 16 (+de scroll detect)
                    onScrollBeginDrag={this._handleScrollBegin.bind(this)}
                    onScrollEndDrag={this._handleScrollEnd.bind(this)}
                >
                    <Animatable.View animation="bounce" easing="ease-in-out" iterationCount="infinite" >
                        <TouchableOpacity onPress={this._onPress} style={{ paddingLeft:SCREEN_WIDTH_CUSTOM_PADDING, width:'100%'}} onPress={this._onPress} >
                            <Icon
                            name={parseInt(this.state.isScrollPositionY) > 20 ? "md-arrow-dropdown" : "md-arrow-dropup"}
                            //name={this.state.icon} 
                            style={{ color: 'black'}}/> 
                        </TouchableOpacity>
                    </Animatable.View>
                </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{I18n.t('wv_opinion')} </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex:1 }}>
                        <TouchableOpacity> 
                            <Icon name="md-heart-outline" style={{ color: 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Slider
                                style={{ width: 150 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={100}
                                value={50}
                            />
                        </TouchableOpacity>  
                        <TouchableOpacity> 
                            <Icon name="md-heart" style={{ color: 'black' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex:1 }} >
                        <TouchableOpacity> 
                            <Icon name="md-sad" style={{ color: 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Slider
                                style={{ width: 150 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={100}
                                value={50}
                            />
                        </TouchableOpacity>  
                        <TouchableOpacity  > 
                            <Icon name="md-happy" style={{ color: 'black' }} />
                        </TouchableOpacity>
                    </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Button iconLeft block onPress={ this.ShareMessage }>
                        <Icon name='share' />
                        <Text>{I18n.t('wv_share')}</Text>
                    </Button>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{I18n.t('wv_recommendations')}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: SCREEN_HEIGHT/1.70 }}>
                    <FlatListViewArticle style={{flex: 1}}  ref={x => {this.child = x}}>
                    </FlatListViewArticle>
                </View>
            </View>
        );
    }
    
    render() {
        //console.log(this.props.navigation.state.params.data); 
        const { html, source, url, onMessage, ...props } = this.props
        //console.log(this.props)
        //this.props.navigation.setParams({otherParam: this.props.navigation.state.params.title})
        
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
                    <Button transparent>
                        <Icon name='ios-add' style={{ color: '#fff'}}   onPress={()=>this.setModalVisible(true)} />
                    </Button>
                </Right>
            </Header>
            <ScrollView  style={{flex:1}} scrollEnabled={this.state.scrollIsEnabled} ref={x => {this.scrollView = x}} keyboardShouldPersistTaps="always"
                onScroll={this._handleScroll} 
                scrollEventThrottle={100} //min 1 et max 16 (+de scroll detect)
                onScrollBeginDrag={this._handleScrollBegin.bind(this)}
                onScrollEndDrag={this._handleScrollEnd.bind(this)}
        > 
            <WebView
                {...props}
                javaScriptEnabled
                injectedJavaScript={javasciptInjectionWithPatchPostMessage}
                source={{uri:this.props.navigation.state.params.url}}
                renderLoading={() => <View style={{justifyContent: 'center',alignItems: 'center',  height : Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height-100 : Dimensions.get('window').height,
                //height: SCREEN_HEIGHT_CUSTOM_REST-(SCREEN_HEIGHT_CUSTOM_HEADER+(SCREEN_HEIGHT_CUSTOM_HEADER)),
                width:'100%'}}> <ActivityIndicator size={'large'} />  </View>}
                renderError={() => <View style={{justifyContent: 'center',alignItems: 'center',  height : Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height-100 : Dimensions.get('window').height,
                //height: SCREEN_HEIGHT_CUSTOM_REST-(SCREEN_HEIGHT_CUSTOM_HEADER+(SCREEN_HEIGHT_CUSTOM_HEADER)),
                width:'100%'}}><Text style={{color:'#FFF'}}>No Internet connection, please reload</Text> <ActivityIndicator size={'large'} /> <Button block rounded danger  onPress={() => this.WebView.reload() } ><Text>Reload</Text> </Button> </View>}
                ref={x => {this.WebView = x}}
                onMessage={e => 
                    //console.log(JSON.stringify(e.nativeEvent.data))
                    this.onMessageFromWebView(e.nativeEvent.data)
                    //this.onMessageFromWebView(JSON.parse(e.nativeEvent.data))
                    //this.onMessageFromWebView(JSON.parse(JSON.stringify(e.nativeEvent.data)))
                }

                style={{
                    height : Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height-100 : Dimensions.get('window').height,
                    //height: SCREEN_HEIGHT_CUSTOM_REST-(SCREEN_HEIGHT_CUSTOM_HEADER+(SCREEN_HEIGHT_CUSTOM_HEADER)),
                    width:'100%' }}
            />
            {Dimensions.get('window').height > Dimensions.get('window').width ? this.renderStrip() : <View></View>}
            </ScrollView>
            <Modal
                        //animationType="slide"
                        //transparent={false}
                        animationInTiming={500}
                        visible={this.state.modalVisible}
                        style={styles.bottomModal}
                        /*onRequestClose={() => {
                            alert('Modal has been closed.');
                    }}*/
                    >
                        
                         
                
                <View 
                    style={{backgroundColor: 'white',
                    height : Dimensions.get('window').height > Dimensions.get('window').width ? '50%' : '80%',
                    padding: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingBottom : 0,
                    borderColor: 'rgba(0, 0, 0, 1)',}}>
                <View style={{ alignItems: 'center'}}>
                    <Button iconLeft block onPress={ this.ShareMessage }>
                        <Icon name='share' />
                        <Text>{I18n.t('wv_share')}</Text>
                    </Button>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end',  paddingTop : 10}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{I18n.t('wv_recommendations')}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '50%'}}>
                    <FlatListViewArticle style={{flex: 1}}  ref={x => {this.child = x}}>
                    </FlatListViewArticle>
                </View>
                                <Button block rounded danger onPress={() => {this.setModalVisible(!this.state.modalVisible);}} style={{padding : 15, margin : 15}}>
                                    <Text>close</Text>
                                </Button>
                            </View>
                  
                    </Modal>






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
        //margin: 5,
        //marginTop: (Platform.OS === 'ios') ? 20 : 0,  
    },
    container: {
       height: '92%',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
        paddingTop : 0,
        
      }
 })