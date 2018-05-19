import React from 'react';
import { Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';
import Reactotron from 'reactotron-react-native';

import registerForNotifications from './services/push_notifications';
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
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
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
    registerForNotifications();
    Notifications.addListener((notification) => { 
      const { data: { text }, origin } = notification; //const text = notification.data.text

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'OK.' }]
        );
      }
    });
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
