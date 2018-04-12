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

export default class WebV extends Component {
  constructor(props) {
    super(props)
    this.postMessage = this.postMessage.bind(this)
}
postMessage(action) {
    this.WebView.postMessage(JSON.stringify(action))
}
  render() {
    return (
      <WebView
          ref={webview => { this.myWebView = webview; }} 
          source={{uri: 'https://mobile.francetvinfo.fr/internet/reseaux-sociaux/en-inde-un-informaticien-toulousain-decouvre-quune-application-mobile-collecte-des-donnees-sans-autorisation_2684728.html'}}
          //affiche l'objet au debut et a la fin du telechargement
          onNavigationStateChange={(navEvent)=> console.log(navEvent)}
          //javaScriptEnabled = {true}
          //onLoadEnd = {console.log("webview content : onLoadEnd")}
          //onLoad = {alert("onLoad")}
          //scrollEnabled = {true}//false permet de bloquer le scroll
          
          //injectedJavaScript={`window.postMessage(JSON.stringify({"score": 1}))`}
          //onMessage={console.log(JSON.parse(message.nativeEvent.data))} 
          
          
          
          
          
          
          onMessage={ (event)=>{ const message = event.nativeEvent.data; console.log(message); console.log('message'); console.log(event.nativeEvent); } }
          //onMessage={() => console.log('Hello World')}

          //injectedJavaScript={'document.write("<h1>Test</h1>")'}
          javaScriptEnabled = {true}

          injectedJavaScript={" window.postMessage(document.body.innerHTML); window.postMessage = window.originalPostMessage || window.postMessage;setTimeout(function(){ window.postMessage('asdsa', '*'); },1000); "} 
          //onMessage={e => onMessage(JSON.parse(e.nativeEvent.data))}
        />
        
    ) 
    //this.webview.postMessage("Hello from RN");
    this.webview.postMessage('Post message triggered');
  }
  
} 
