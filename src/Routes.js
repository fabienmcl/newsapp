import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

{/*login*/}
import Loginapp from './login/LoginAnimation';
{/*home*/}
import FlatListViewArticle from './containers/ListOfArticles/FlatListViewArticle';
{/*webview*/}
import Webviewcustom from './containers/WebView/MessageWebView';
{/*sidemenu*/}
import Favoris from './containers/SideMenuScreens/Favoris';
import Historique from './containers/SideMenuScreens/Historique';
import MonCompte from './containers/SideMenuScreens/MonCompte';
import Concept from './containers/SideMenuScreens/Concept';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
				<Stack key="root" hideNavBar={true}>
					{/*login*/}
					<Scene key="loginapp" component={Loginapp} title="Loginapp"  initial ={false} /> 
					{/*home*/}
					<Scene key="flatListViewArticle" component={FlatListViewArticle} title="FlatListViewArticle"  title="Renewal" initial ={true} panHandlers={null} /> 
					{/*webview*/}
					<Scene key="webviewcustom" component={Webviewcustom} title="Webviewcustom"  />
					{/* sidemenu */}
					<Scene key="favoris" component={Favoris} title="Favoris" initial={false} panHandlers={null}/>
					<Scene key="historique" component={Historique} title="Historique" initial={false} />
					<Scene key="monCompte" component={MonCompte} title="Mon Compte" initial={false} />
					<Scene key="concept" component={Concept} title="Le Concept" initial={false} />		
				</Stack>
			 </Router>
			)
	}
}
