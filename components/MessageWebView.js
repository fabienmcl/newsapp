import React from 'react'
import { WebView } from 'react-native'

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
     
    window.onscroll = function(){
        //alert("scroll "+this.scrollY)
        window.postMessage(JSON.stringify('sdfghjk'))
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
    }
    postMessage(action) {
        this.WebView.postMessage(JSON.stringify(action))
    } 
    render() {
        const { html, source, url, onMessage, ...props } = this.props
        return (
            <WebView
                {...props}
                javaScriptEnabled
                injectedJavaScript={patchPostMessageJsCode}
                //source={source ? source : html ? { html } : url}
                //source={require("./resources/indexCustom.html")}
                source={{uri:'https://www.francetvinfo.fr/economie/transports/sncf/greve-a-la-sncf/greve-a-la-sncf-l-appel-aux-conducteurs-reservistes-par-la-direction-mis-en-cause-par-les-syndicats_2703866.html'}}
            
                ref={x => {this.WebView = x}}
                onMessage={e => console.log(JSON.parse(e.nativeEvent.data))}
            />
        )
    }
}