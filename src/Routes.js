import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
{/*initial path*/}
import InitialPath from './containers/InitialPath';
{/*login*/}
import Loginapp from './containers/LoginAnimation';
import HomeSreen from './containers/HomeScreen/HomeScreen';
{/*home*/}
import FlatListViewArticle from './containers/ListOfArticles/FlatListViewArticle';
import FlatDemo from './containers/ListOfArticles/FlatListDemo';
{/*webview*/}
import Webviewcustom from './containers/WebView/MessageWebView';
import Webview from './containers/WebView/WebView';
{/*sidemenu*/}
import Favoris from './containers/SideMenuScreens/Favoris';
import Historique from './containers/SideMenuScreens/Historique';
import MonCompte from './containers/SideMenuScreens/MonCompte';
import Concept from './containers/SideMenuScreens/Concept';
import SConcept from './containers/SideMenuScreens/SimpleConcept';
import Param from './containers/SideMenuScreens/Params';
import ScrenCenter from './containers/SideMenu/ScreenCenter';
{/*prototypes*/}
import ListView from './prototypes/ListView/ListView';
import Details from './prototypes/ListView/Movie';
import Timer from './prototypes/Timer';
import WebcallDemo from './containers/ListOfArticles/DiverseRecommendation';
{/*sensors*/}
import Accelerometer from './prototypes/Sensors/Accelerometer';
import Gyroscope from './prototypes/Sensors/Gyroscope';
import Localization from './prototypes/Sensors/Localization';
import Location from './prototypes/Sensors/Location';
import Magnetometer from './prototypes/Sensors/Magnetometer';
import Pedometer from './prototypes/Sensors/PedometerSensor';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
				<Stack key="root" hideNavBar={true}>
					{/*initial path*/}
					<Scene key="initialPath" component={InitialPath} title="RENEWAL" initial={true}  panHandlers={null}/>
					{/*concept swipe*/}
					<Scene key="conceptSwipe" component={SConcept} title="Le Concept" initial={false}  panHandlers={null}/>
					{/*login*/}
					<Scene key="loginapp" component={Loginapp} title="Loginapp"  initial ={false} panHandlers={null}/> 
					{/*home*/}
					<Scene key="flatListViewArticle" component={FlatListViewArticle} title="FlatListViewArticle"  title="Renewal" initial={false} panHandlers={null} /> 
					<Scene key="flatDemo" component={FlatDemo} title="FlatDemo"  title="Renewal" initial ={false} /> 
					<Scene key="webcallDemo" component={WebcallDemo} title="webcallDemo"   initial ={false} />
					<Scene key="screnCenter" component={ScrenCenter} title="RENEWAL"  initial={false} panHandlers={null} /> 
					
					
					{/*webview*/}
					<Scene key="webviewcustom" component={Webviewcustom} initial={false} title="Webviewcustom"  />
					{/*webview back*/}
					<Scene key="webview" component={Webview} initial={false} title="Webview"  />
					{/* sidemenu */}
					<Scene key="favoris" component={Favoris} title="Favoris" initial={false} panHandlers={null}/>
					<Scene key="historique" component={Historique} title="Historique" initial={false} panHandlers={null}/>
					<Scene key="monCompte" component={MonCompte} title="Mon Compte" initial={false} panHandlers={null}/>
					<Scene key="concept" component={Concept} title="Le Concept" initial={false}  panHandlers={null}/>
					<Scene key="param" component={Param} title="settings" initial={false}  panHandlers={null}/>
					{/*prototypes*/}
					<Scene key="listView" component={ListView} title="ListView" initial={false} />	
					<Scene key="details" component={Details} title="Details" initial={false} />
					<Scene key="timer" component={Timer} title="Timer" initial={false} />
					{/*sensors*/}
					<Scene key="accelerometer" component={Accelerometer} title="Accelerometer" initial={false} />	
					<Scene key="gyroscope" component={Gyroscope} title="Gyroscope" initial={false} />	
					<Scene key="localization" component={Localization} title="Localization" initial={false} />	
					<Scene key="location" component={Location} title="Location" initial={false} />		
					<Scene key="magnetometer" component={Magnetometer} title="Magnetometer" initial={false} />	
					<Scene key="pedometer" component={Pedometer} title="Pedometer" initial={false} />	
				</Stack>
			 </Router>
			)
	}
}
