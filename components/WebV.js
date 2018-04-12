import React, { Component } from 'react';
import { WebView } from 'react-native';
import {
    NavigationActions ,
    TabNavigator,
  } from 'react-navigation';

export default class WebV extends Component {
    static navigationOptions = {
        title: "WebViewScreen"
    }
    render() {
      return (
        <WebView
            source={{uri: 'https://www.numerama.com/tech/344470-apple-condamne-a-payer-demi-milliard-de-dollars-violation-de-brevets-a-legalite-douteuse.html'}}
        /> 
      )
    }
    runJSInBackground (code) {
      this.webView.injectJavaScript(code)
    }
    handleMessage = (e) => {
      const message = e.nativeEvent.data
      console.log('message from webview:', message)
    }
  }
/*<WebView
          ref={el => this.webView = el}
          source={{html: '<html><body></body></html>'}}
          onMessage={this.handleMessage}
        />*/