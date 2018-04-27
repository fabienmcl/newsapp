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
import FlatListViewArticle from './proto/FlatListViewArticle';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
				<Stack key="root" hideNavBar={true}>
			    	{/*old login page 
					<Scene key="login" component={Login} title="Login" initial={false}/> 
					<Scene key="signup" component={Signup} title="Register"/> */}
					{ /* new login page with animation */}
					<Scene key="loginapp" component={Loginapp} title="Loginapp"  initial ={true} /> 
					{/* old listview 
					<Scene back={true} key="listview" component={Listview} title="Listview" initial={false}/>{/* panHandlers={null} /> */}
					{/* new listview pages */}
					<Scene key="flatListViewArticle" component={FlatListViewArticle} title="FlatListViewArticle"  title="Renewal" initial ={false} panHandlers={null} /> 
					<Scene key="webviewcustom" component={Webviewcustom} title="Webviewcustom"  />	
				</Stack>
			 </Router>
			)
	}
}
