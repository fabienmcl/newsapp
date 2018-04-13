import React, { Component } from 'react';
import { WebView } from 'react-native';
import {
  NavigationActions ,
  TabNavigator,
} from 'react-navigation';

const injectedScript = () => {
  window.postMessage(document.body.innerHTML);
  window.postMessage = window.originalPostMessage || window.postMessage;
}
const codeJS=`
  window.postMessage(document.body.innerHTML); window.postMessage = window.originalPostMessage || window.postMessage;
  //setTimeout(function(){ window.postMessage('asdsa', '*'); },1000); 
  
  
  (function ready() {
    function whenRNPostMessageReady(cb) {
      if (postMessage.length === 1) cb();
      else setTimeout(function() { whenRNPostMessageReady(cb) }, 100);
    }
    whenRNPostMessageReady(function() {
      postMessage('hi react native!!!');
    });
  })();
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
    postMessage('hi react native!!!');

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
  /*postMessage(action) {
    this.WebView.postMessage(JSON.stringify(action))
  }*/
  onMessage(m) {
    console.log(m.nativeEvent.data);
  } 
  render() {
    return (
      <WebView
          ref={webview => { this.myWebView = webview; }} 
          source={{uri: 'https://www.numerama.com/politique/344797-facebook-quest-ce-que-les-profils-fantomes-shadow-profile.html'}}
          //affiche l'objet au debut et a la fin du telechargement
          //onNavigationStateChange={(navEvent)=> console.log(navEvent)}
          //javaScriptEnabled = {true}
          //onLoadEnd = {console.log("webview content : onLoadEnd")}
          //onLoad = {alert("onLoad")}
          //scrollEnabled = {true}//false permet de bloquer le scroll
          
          //injectedJavaScript={`window.postMessage(JSON.stringify({"score": 1}))`}
          //onMessage={console.log(JSON.parse(message.nativeEvent.data))} 
          
          
          
          
          
          
          //onMessage={ (event)=>{ const message = event.nativeEvent.data; console.log(message.data); console.log('message');  } }
          onMessage={m => this.onMessage(m)}
          //console.log(event.nativeEvent);
          //onMessage={() => console.log('Hello World')}

          //injectedJavaScript={'document.write("<h1>Test</h1>")'}
          javaScriptEnabled = {true}

          //injectedJavaScript={" window.postMessage(document.body.innerHTML); window.postMessage = window.originalPostMessage || window.postMessage;setTimeout(function(){ window.postMessage('asdsa', '*'); },1000); "} 
          injectedJavaScript={codeJS}
          //onMessage={e => onMessage(JSON.parse(e.nativeEvent.data))}
        />
        
    ) 
    //this.webview.postMessage("Hello from RN");
    this.webview.postMessage('Post message triggered');
  }
  
} 
