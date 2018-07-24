import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
{/*initial path*/}
import InitialPath from './containers/InitialPath';
{/*login*/}
import Loginapp from './containers/LoginAnimation';
import HomeSreen from './containers/HomeScreen/HomeScreen';
{/*Home*/}
import ScrenCenter from './containers/SideMenu/ScreenCenter';
{/*sidemenu*/}
import DiverseRecommendation from './containers/ListOfArticles/DiverseRecommendation';
import Favorite from './containers/SideMenuScreens/Favorite';
import History from './containers/SideMenuScreens/History';
import Account from './containers/SideMenuScreens/Account';
import SConcept from './containers/SideMenuScreens/SimpleConcept';
import Settings from './containers/SideMenuScreens/Settings';
{/*webview*/}
import Webview from './containers/WebView/WebView';
{/*prototypes*/}
import ListView from './prototypes/ListView/ListView';
import Details from './prototypes/ListView/Movie';
import Timer from './prototypes/Timer';
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
					<Scene key="screnCenter" component={ScrenCenter} title="RENEWAL"  initial={false} panHandlers={null} />
					{/* sidemenu */}
					<Scene key="diverseRecommendation" component={DiverseRecommendation} title="RENEWAL" initial={false} panHandlers={null}/>
					<Scene key="favorite" component={Favorite} title="Favorite" initial={false} panHandlers={null}/>
					<Scene key="history" component={History} title="History" initial={false} panHandlers={null}/>
					<Scene key="account" component={Account} title="Account" initial={false} panHandlers={null}/>
					<Scene key="settings" component={Settings} title="Settings" initial={false}  panHandlers={null}/>
					
					
					{/*webview*/}
					<Scene key="webview" component={Webview} initial={false} title="Webview"  />
					
					
					
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
