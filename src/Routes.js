import React, { Component } from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Listview from './pages/ListView';
import Anim from './proto/Anim';
import ExpandPage from './proto/ProtoAnimation';
import Webviewcustom from './pages/MessageWebView';
import DemoFlatList from './proto/FlatListDemo'

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
				<Stack key="root" hideNavBar={true}>
			    	<Scene key="login" component={Login} title="Login" initial={true}/>
			      	<Scene key="signup" component={Signup} title="Register"/>
					<Scene back={true} key="listview" component={Listview} title="Listview" panHandlers={null} />
					<Scene key="webviewcustom" component={Webviewcustom} title="Webviewcustom"  />
					<Scene key="anim" component={Anim} title="Anim"  />
					<Scene key="expandPage" component={ExpandPage} title="ExpandPage"  initial ={false} />
					<Scene key="demoFlatList" component={DemoFlatList} title="DemoFlatList"  initial ={false} />
				</Stack>
			 </Router>
			)
	}
}