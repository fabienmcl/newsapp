import React, { Component } from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Listview from './pages/ListView';
import Anim from './proto/Anim';
import WebviewAnim from './pages/WebViewMessageAnim';
import Webviewcustom from './pages/MessageWebView';
import WebviewScroll from './pages/WebviewScroll';
import DemoFlatList from './proto/FlatListDemo';
import Loginapp from './src/LoginAnimation';
import CardImageExample from './proto/CardImageExample';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
				<Stack key="root" hideNavBar={true}>
			    	<Scene key="login" component={Login} title="Login" initial={false}/> 
			      	<Scene key="signup" component={Signup} title="Register"/>
					<Scene back={true} key="listview" component={Listview} title="Listview" initial={false}/>{/* panHandlers={null} /> */}
					<Scene key="webviewcustom" component={Webviewcustom} title="Webviewcustom"  />
					<Scene key="webviewAnim" component={WebviewAnim} title="WebviewAnim"  initial ={false} />
					<Scene key="webviewScroll" component={WebviewScroll} title="WebviewScroll"  initial ={false} />
					<Scene key="loginapp" component={Loginapp} title="Loginapp"  initial ={true} /> 
					<Scene key="cardImageExample" component={CardImageExample} title="CardImageExample"  initial ={false} />
				</Stack>
			 </Router>
			)
	}
}
