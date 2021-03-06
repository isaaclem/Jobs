import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikeJobs } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: {
      style: {
        marginTop: Platform === 'android' ? 24 : 0
      }
    }
  }

  render() {
    return (
      <View>
        <Button 
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikeJobs}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikeJobs })(SettingsScreen);
