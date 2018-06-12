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
    Linking
} from "react-native";
import {Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
{/*import { Header } from 'react-native-elements';*/}
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH  = Dimensions.get('window').width
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

// fix https://github.com/facebook/react-native/issues/10865
// thx https://github.com/kyle-ilantzis !
const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    window.counter = 0;
    function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }
    var start = new Date();
    var maxScrollReached = 0;
    window.onscroll = function(){
        //alert("scroll "+this.scrollY)
        window.counter++;
        var elapsed = new Date() - start;
        if(this.scrollY > maxScrollReached){
            maxScrollReached
        }
        maxScrollReached = (this.scrollY > maxScrollReached) ? this.scrollY : maxScrollReached;
        window.postMessage(JSON.stringify('['+window.counter+'] message_from_webview : scroll_detect x='+this.scrollX+' y='+this.scrollY+' time='+msToTime(elapsed)))
        window.postMessage(JSON.stringify('['+window.counter+'] message_from_webview : maxScrollReached='+maxScrollReached))
    } 
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();` 
 
export default class MessageWebView extends React.Component {
    constructor(props) {
        super(props)
        this.postMessage = this.postMessage.bind(this)
        this.state = {
            isOpen: false, 
            isOpenB:false,
            selectedItem: 'wv',
            isClickScroll : false,
            isInScroll:false,
            isScrollPositionY:"0",
            isScrollToDown : false,
            title : this.props.navigation.state.params.title, 
            icon : "md-arrow-dropup", 
            scrollEventAnimation : false,
            scrollIsEnabled : true,
            scrollStartFrom : "bottom"
        };
        this.springValue = new Animated.Value(1)
    }
    async componentDidMount(){
        await I18n.initAsync();
        this.setState({isLoading:false})
      }
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
    ShareMessage=()=>{
        Share.share({
            title: this.props.navigation.state.params.title,
            message: `Bonjour, \n je pense que l'article : ${this.props.navigation.state.params.title} pourrait t'interresser. \n `,
            url: this.props.navigation.state.params.url,
            subject: `Je recommande l'article : ${this.props.navigation.state.params.title}` //  for email 
        }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
    /*
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.otherParam : 'Details Screen',
          headerStyle:{height:SCREEN_HEIGHT_CUSTOM_HEADER},
          headerRight: (
            <TouchableOpacity onPress={() => Actions.listview()}>
                <Icon name="md-close" style={{ color: 'black' }} />
            </TouchableOpacity>
          ),
        }
    }; */
    postMessage(action) {
        try{
            this.WebView.postMessage(JSON.stringify(action))
        }catch(error){
            console.error(error);
        }
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
                return { icon: "md-arrow-dropup", isOpenB: false, scrollIsEnabled:true };
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
                    return { icon: "md-arrow-dropup", isOpenB: false };
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
        console.log("jn")
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
        if(this.state.selectedItem != 'wv'){
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
              selectedItem: 'wv',
            });
          }
      }
    
      onMenuItemSelected = item =>
        this.setState({
          isOpen: false,
          selectedItem: item,
      });
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
            {/*
            <Header
                leftComponent={
                    <Header
                        leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack() }}
                        rightComponent={{ icon: 'menu', color: '#fff', onPress:()=>this._sideMenuPress() }}
                        outerContainerStyles={{ backgroundColor: '#212121', padding : 0, margin : 0, borderBottomColor:'black', borderBottomWidth:0}}
                    />
                }
                centerComponent={{ text: this.props.navigation.state.params.title , style: { color: '#fff' } }}
                outerContainerStyles={{ backgroundColor: '#212121', borderBottomWidth:0 }}
            />
            */}
            <Header style={{backgroundColor: '#212121'}}>
                <StatusBar barStyle="light-content"/>
                <Left style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Button transparent>
                        <Icon name='ios-arrow-back-outline' style={{ color: '#fff'}}   onPress={()=>this.props.navigation.goBack()} />
                    </Button>
                    <Button transparent>
                        <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>{this.props.navigation.state.params.title}</Title>
                </Body>
                <Right>
                    {/*<Button transparent>
                        <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
                    </Button>
                    */}
                </Right>
            </Header>
            <ScrollView  style={{flex:1}} scrollEnabled={this.state.scrollIsEnabled} ref={x => {this.scrollView = x}} keyboardShouldPersistTaps="always"
                onScroll={this._handleScroll} 
                scrollEventThrottle={100} //min 1 et max 16 (+de scroll detect)
                onScrollBeginDrag={this._handleScrollBegin.bind(this)}
                onScrollEndDrag={this._handleScrollEnd.bind(this)}
                
               
                /*
                //onTouchStart={ () => console.log( 'touch start' ) }

                //onTouchMove={ () => console.log( 'touch move' ) }
                
                //onTouchEnd={ () => console.log( 'touch end' ) }
                
                //onScrollBeginDrag={ () => console.log( 'scroll begin' ) }
                
                //onScrollEndDrag={ () => console.log( 'scroll end' ) }
                
                //onMomentumScrollBegin={ () => console.log( 'momentum begin' ) }
                
                onMomentumScrollEnd={ () => console.log( 'momentum end' ) }
                
                onStartShouldSetResponder={ () => console.log( 'on start' ) }
                
                onStartShouldSetResponderCapture={ () => console.log( 'on start capture' ) }
                
                onScrollShouldSetResponder={ () => console.log( 'on scroll' ) }
                
                onResponderGrant={ () => console.log( 'granted' ) }
                
                onResponderTerminationRequest={ () => console.log( 'term req' ) }
                
                onResponderTerminate={ () => console.log( 'term' ) }
                
                onResponderRelease={ () => console.log( 'release' ) }
                
                onResponderReject={ () => console.log( 'reject' ) }
                
                onScrollAnimationEnd={ () => console.log( 'anim end' ) }
                
                //scrollEventThrottle={ 100 }*/
               
            >  
            
            <WebView
                {...props}
                javaScriptEnabled
                injectedJavaScript={patchPostMessageJsCode}
                source={{uri:this.props.navigation.state.params.url}}
               
                ref={x => {this.WebView = x}}
                onMessage={e => console.log(JSON.parse(JSON.stringify(e.nativeEvent.data)))}
                style={{height: SCREEN_HEIGHT_CUSTOM_REST-(SCREEN_HEIGHT_CUSTOM_HEADER+(SCREEN_HEIGHT_CUSTOM_HEADER)), width:'100%' }}
            />
            
            <View  style={styles.MainContainer} > 
                <ScrollView 
                
                onTouchStart={()=>this.touchStartIcon() }

                //onTouchMove={ () => console.log( '################## touch move' ) }
                
                //onTouchEnd={ () => console.log( '################# touch end' ) }
                onScroll={this._handleScroll} 
                scrollEventThrottle={100} //min 1 et max 16 (+de scroll detect)
                onScrollBeginDrag={this._handleScrollBegin.bind(this)}
                onScrollEndDrag={this._handleScrollEnd.bind(this)}
                >
                <Animatable.View animation="bounce" easing="ease-in-out" iterationCount="infinite" >
                <TouchableOpacity onPress={this._onPress} style={{ paddingLeft:SCREEN_WIDTH_CUSTOM_PADDING, width:'100%'}} onPress={this._onPress} >
                    
                    <Icon name={this.state.icon} style={{ color: 'black'}}/> 
    
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
                {/*
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex:1 }}>
                        <TouchableOpacity onPress={ this.ShareMessage }>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../../images/facebook.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log("twitter")}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../../images/twitter.png')}/>
                            </TouchableOpacity>  
                        <TouchableOpacity onPress={()=>console.log("linkedin")}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../../images/linkedin.png')}/>
                            </TouchableOpacity>  
                        <TouchableOpacity onPress={()=>console.log("whatsapp")}>
                            <Image style={{ width: 60, height: 60 }}
                                source={require('../../images/whatsapp.png')}/>
                        </TouchableOpacity> 
                </View>
                */}
                <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{I18n.t('wv_recommendations')}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: SCREEN_HEIGHT/1.70 }}>
                    <FlatListViewArticle style={{flex: 1}}  ref={x => {this.child = x}}>
                    </FlatListViewArticle>
                </View>
            </View>
      
            </ScrollView>
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
    }
 })
/*

<TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
                <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
                    style={styles.FloatingButtonStyle} />
            </TouchableOpacity>

            , 
    TouchableOpacityStyle:{
 
    position: 'relative',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 150,
  },
 
  FloatingButtonStyle: {
 
    //resizeMode: 'contain',
    width: 50,
    height: 50,
    zIndex: 999
  }
  */