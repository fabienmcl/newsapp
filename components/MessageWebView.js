import React from 'react'
import { WebView } from 'react-native'

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