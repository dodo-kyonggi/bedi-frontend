import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducer';
import useSocket from './hooks/useSocket';
import {useEffect} from 'react';
import Home from './Screen/MainScreens/Home';
import Goals from './Screen/MainScreens/Map';
import Mypage from './Screen/Mypage';
import Splash from './Screen/Splash';
import {useAppDispatch} from './store';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Statistics from './Screen/MainScreens/Statistics';

export type LoggedInParamList = {
  Home: undefined,
  Goals: undefined,
  Mypage: undefined,
};

export type RootStackParamList = {
  SignIn: undefined,
  SignUp: undefined,
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.email);
  console.log('isLoggedIn', isLoggedIn);

  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const helloCallback = (data: any) => {
      console.log(data);
    };
    if (socket && isLoggedIn) {
      console.log(socket);
      socket.emit('login', 'hello');
      socket.on('hello', helloCallback);
    }
    return () => {
      if (socket) {
        socket.off('hello', helloCallback);
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  return isLoggedIn ? (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '홈',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="home" size={20} style={{color}} />
          ),
          tabBarActiveTintColor: 'blue',
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
          title: '지도',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="map" size={20} style={{color}} />
          ),
          tabBarActiveTintColor: 'blue',
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          title: '내 정보',
          tabBarIcon: ({color}) => (
            <FontAwesome name="gear" size={20} style={{color}} />
          ),
          tabBarActiveTintColor: 'blue',
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
