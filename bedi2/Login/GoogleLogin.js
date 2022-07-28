import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin';
const GoogleLogin = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '237414230015-noljjs9m1okg0cdih5t1tpa336stp0r3.apps.googleusercontent.com,
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        });
        isSignedIn()
    }, [])
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            setUser({ userInfo })
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
                console.log(error)
            }
        }
    };
    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
            getCurrentUserInfo()
        } else {
            console.log('Please Login')
        }
    };
    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setUser({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Something went wrong. Unable to get user's info");
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({}); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    // signOut()
    return (
        <View>
            {!user.idToken ?
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                /> :
                <TouchableOpacity onPress={signOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default GoogleLogin;



// import React, { useEffect, useState } from 'react';
// import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
// import { View, Text, Image, Alert } from 'react-native';


// const GoogleLogin = () => {
//     GoogleSignin.configure({
//         scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//         webClientId:
//             '445110394949 - 4c6i91emvrdmqmuhdiajkqh9oremrkp1.apps.googleusercontent.com',
//         offlineAccess: true,
//     });
//     const [userGoogleInfo, setUserGoogleInfo] = useState({});
//     const [loaded, setLoaded] = useState(false);
//     const signIn = async () => {
//         try {
//             console.log('로그인 시도')
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             setUserGoogleInfo(userInfo);
//             setLoaded(true);
//             const userIdTokens = await GoogleSignin.getTokens();
//             console.log(userIdTokens);
//         } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 // user cancelled the login flow
//                 console.log('user cancelled the login flow')
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 // operation (e.g. sign in) is in progress already
//                 console.log('operation is in progress already')
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 // play services not available or outdated
//                 console.log('play services not available')
//             } else {
//                 // some other error happened
//                 console.log(error)
//             }
//         }
//     };
//     return (
//         <View>
//             <Text>Google Login</Text>
//             <GoogleSigninButton
//                 style={{ width: 192, height: 48 }}
//                 size={GoogleSigninButton.Size.Wide}
//                 color={GoogleSigninButton.Color.Light}
//                 onPress={signIn}
//             />
//             {loaded ?
//                 <View>
//                     <Text>{userGoogleInfo.user.name}</Text>
//                     <Text>{userGoogleInfo.user.email}</Text>
//                     <Image
//                         style={{ width: 100, height: 100 }}
//                         source={{ uri: userGoogleInfo.user.photo }}
//                     />
//                 </View>
//                 :
//                 <Text>Not SignedIn</Text>
//             }
//         </View>
//     );
// };

// export default GoogleLogin;
