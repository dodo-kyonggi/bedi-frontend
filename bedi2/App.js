import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '519862697759-q4oc5lfst3nfulfq509thfavahr3uhan.apps.googleusercontent.com',
  offlineAccess: true
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGoogleInfo: {},
      loaded: false
    };
  }

  googlesignIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View>
        <GoogleSigninButton
          onPress={this.googlesignIn}

          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={{ width: 192, height: 48 }}
        />

        {this.state.loaded ?
          <View>
            <Text>{this.state.userGoogleInfo.user.name}</Text>
            <Text>{this.state.userGoogleInfo.user.email}</Text>
            <Image
              style={{ width: '100', height: '100' }}
              source={{ uri: this.state.userGoogleInfo.user.photo }}
            />
          </View> :
          <Text>Not Signed</Text>
        }
      </View>
    )
  }
}
export default App;