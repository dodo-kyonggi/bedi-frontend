import React, { useState } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { View, Text, Image } from 'react-native';

GoogleSignin.configure({
    webClientId:
        '445110394949-e5re2uhfhopi24otosj0bqb50op71ovb.apps.googleusercontent.com',
    offlineAccess: true,
});

const GoogleLogin = () => {
    const [userGoogleInfo, setUserGoogleInfo] = useState({});
    const [loaded, setLoaded] = useState(false);
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserGoogleInfo(userInfo);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View>
            <Text>Google Login</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => signIn()}
            />
            {loaded ? (
                <View>
                    <Text>{userGoogleInfo.user.name}</Text>
                    <Text>{userGoogleInfo.user.email}</Text>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{ url: userGoogleInfo.user.photo }}
                    />
                </View>
            ) : (
                <Text>Not SignedIn</Text>
            )}
        </View>
    );
};

export default GoogleLogin;
