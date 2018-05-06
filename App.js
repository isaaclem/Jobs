import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Reactotron from 'reactotron-react-native';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import './ReactotronConfig';

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: TabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: StackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen }
        })
      }
    })
  }
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true
});

export default class App extends React.Component {
  componentDidMount() {
    Reactotron.clear();
  }

  render() {
    //Reactotron.warn('*glares*');
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
