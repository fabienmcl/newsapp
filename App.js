import React from 'react';
import { StackNavigator } from 'react-navigation';

import WelcomeView from './components/App';
import Movie from './components/Movie';
import Vide from './components/Vide';
import Home from './components/HomeScreen'

const App = StackNavigator({
    WelcomeView: {screen: WelcomeView},
    Movie: {screen: Movie},
    Vide: {screen: Vide},
    Home: { screen: Home}
},
{
    initialRouteName: 'Home',
    headerMode: 'none'
});

export default App;