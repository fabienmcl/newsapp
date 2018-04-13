import React, { Component } from 'react';
import { WebView } from 'react-native';
import {
  NavigationActions ,
  TabNavigator,
} from 'react-navigation';

const codeJS=`
  //window.postMessage(document.body.innerHTML); 
  //window.postMessage = window.originalPostMessage || window.postMessage;
  //setTimeout(function(){ window.postMessage('asdsa', '*'); },1000); 
 
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
  function scrollFunction() {
    var t1 = performance.now();
    var elapsed = new Date() - start;
    
    (y>this.scrollY) ? alert("scroll up : x="+this.scrollX+" y="+this.scrollY+" time="+msToTime(elapsed)+"") : alert("scroll down : x="+this.scrollX+" y="+this.scrollY+" time="+msToTime(elapsed)+"");
    x=this.scrollX;
    y=this.scrollY;
  }
  window.onscroll = scrollFunction;
  var x=0;
  var y=0;
  var t0 = performance.now();
  var start = new Date();


  `

export default class WebV extends Component {
  constructor(props) {
    super(props)
    //this.postMessage = this.postMessage.bind(this)
  }
  postMessage(action) {
    this.WebView.postMessage(JSON.stringify(action))
  }
  /*
  onMessage(m) {
    console.log(m.nativeEvent.data);
  }*/
  
  render() {
    return (
      <WebView
          ref={webview => { this.myWebView = webview; }} 
          source={{uri: 'https://www.numerama.com/politique/344797-facebook-quest-ce-que-les-profils-fantomes-shadow-profile.html'}}
          javaScriptEnabled = {true}
          //onLoad = {console.log("webview content : onLoad")}
          //onLoadEnd = {console.log("webview content : onLoadEnd")}
          //onNavigationStateChange={(navEvent)=> console.log(navEvent)} //affiche l'objet au debut et a la fin du telechargement
          scrollEnabled = {true}//false permet de bloquer le scroll
          injectedJavaScript={codeJS}
          onMessage={this.onWebViewMessage}
          
          
        
          
          
          //onMessage={ (event)=>{ const message = event.nativeEvent.data; console.log(message); console.log('message');  } }
          
          //onMessage={m => this.onMessage(m)}
          //console.log(event.nativeEvent);
          //onMessage={() => console.log('Hello World')}

          //injectedJavaScript={'document.write("<h1>Test</h1>")'}
          

          //injectedJavaScript={" window.postMessage(document.body.innerHTML); window.postMessage = window.originalPostMessage || window.postMessage;setTimeout(function(){ window.postMessage('asdsa', '*'); },1000); "} 
          
      />
     

        
    ) 
    
    //this.webview.postMessage("Hello from RN");
    //this.webview.postMessage('Post message triggered');
    
  }
  /*
  onWebViewMessage(event) {
    // post back reply as soon as possible to enable sending the next message
    this.myWebView.postMessage(event.nativeEvent.data);
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    }catch(err) {
      console.warn(err);
      return;
    }
    // invoke target function
    const response = this[msgData.targetFunc].apply(this, [msgData]);
    // trigger success callback
    msgData.isSuccessfull = true;
    msgData.args = [response];
    this.myWebView.postMessage(JSON.stringify(msgData))
  }*/
  
  
} 
