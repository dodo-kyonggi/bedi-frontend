import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import 'react-native-gesture-handler';
import Goals from './Screen/MainScreens/Goals'
import { NavigationContainer } from "@react-navigation/native";
import Map from "./Screen/MainScreens/Map";
import Ranking from "./Screen/Ranking";
import Mypage from "./Screen/Mypage";
import { createStackNavigator } from '@react-navigation/stack';
import CheckFirstLaunch from './Launch/CheckFirstLaunch'
import * as users from './Screen/MainScreens/Functions/Users'
import Photo from "./Screen/Mypage/Photo";
import PlusEvent from "./Screen/Mypage/PlusEvent";

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYzMTU3MTU4LCJpYXQiOjE2NjMxNTUzNTgsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.0atTxEIs0QE1j9FChDG5UoLXs5dYvFoUasC5fKRZ6VM'
const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const MainStackComponent = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={Goals} />
      <MainStack.Screen name="Map" component={Map} />
      <MainStack.Screen name="Mypage" component={Mypage} />
      <MainStack.Screen name="Photo" component={Photo} />
      <MainStack.Screen name="PlusEvent" component={PlusEvent} />
    </MainStack.Navigator>
  );
}

const TabBarIcon = (focused, name) => {
  let iconImagePath;
  if (name === 'MainScreen' && focused === true) {
    iconImagePath = require('./Icons/homeFill.png')
  } else if (name === 'Ranking' && focused === true) {
    iconImagePath = require('./Icons/rankingFill.png')
  } else if (name === 'Mypage' && focused === true) {
    iconImagePath = require('./Icons/mypageFill.png')
  } else if (name === 'MainScreen' && focused === false) {
    iconImagePath = require('./Icons/home.png')
  } else if (name === 'Ranking' && focused === false) {
    iconImagePath = require('./Icons/ranking.png')
  } else if (name === 'Mypage' && focused === false) {
    iconImagePath = require('./Icons/mypage.png')
  }
  return (
    <Image
      source={iconImagePath}
      style={{ width: 30, height: 30 }}
    />
  )
}

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false)
  const [settingNecessary, setSettingNecessary] = useState(1)
  useEffect(() => {
    chkFunction()
    // users.Login()
  }, [])

  const chkFunction = async () => {
    const isFirstLaunch = await CheckFirstLaunch()
    if (isFirstLaunch) {
      console.log('[App()]:This is the first Launch! ')
      setIsFirstLaunch(true)
    } else {
      setSettingNecessary(0)
    }
  }

  return (
    <NavigationContainer
      style={{
        padding: '2%'
      }}>
      <Tab.Navigator
        // initialRouteName="MainScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            TabBarIcon(focused, route.name)
          )
        })}

      >
        <Tab.Screen
          name="MainScreen"
          component={MainStackComponent}
          options={{
            headerShown: false,
            tabBarLabel: '홈',
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'grey'
          }}
          initialParams={{ accessToken: accessToken }}
        />
        <Tab.Screen
          name="Ranking"
          component={Ranking}
          options={{
            tabBarLabel: '통계',
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'grey'
          }}
          initialParams={{ accessToken: accessToken }}
        />
        <Tab.Screen
          name="Mypage"
          component={Mypage}
          options={{
            tabBarLabel: '마이페이지',
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'grey'
          }}
          settingNecessary={settingNecessary}
          initialParams={{ accessToken: accessToken }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}


export default App;