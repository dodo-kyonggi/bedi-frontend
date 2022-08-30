import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Screen/MainScreens/Home'
import 'react-native-gesture-handler';
import Goals from './Screen/MainScreens/Goals'
import { NavigationContainer } from "@react-navigation/native";
import Map from "./Screen/MainScreens/Map";
import Ranking from "./Screen/Ranking";
import Mypage from "./Screen/Mypage";
import { createStackNavigator } from '@react-navigation/stack';
import CalendarMap from './Screen/MainScreens/CalendarMap'

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const MainStackComponent = () => {
  return (
    <MainStack.Navigator>
      {/* <MainStack.Screen name="Home" component={Home} /> */}
      <MainStack.Screen name="Main" component={Goals} />
      <MainStack.Screen name="Map" component={Map} />
      {/* <MainStack.Screen name="CalendarMap" component={CalendarMap} /> */}
    </MainStack.Navigator>
  );
}

const TabBarIcon = (focused, name) => {
  let iconImagePath;
  if (name === 'MainScreen') {
    iconImagePath = require('./Icons/home.png')
  } else if (name === 'Ranking') {
    iconImagePath = require('./Icons/ranking.png')
  } else if (name === 'Mypage') {
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

  return (
    <NavigationContainer
      style={{
        padding: '2%'
      }}>
      <Tab.Navigator
        initialRouteName="MainScreen"
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
            tabBarLabel: '홈'
          }}
        />
        <Tab.Screen
          name="Ranking"
          component={Ranking}
          options={{
            tabBarLabel: '통계'
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={Mypage}
          options={{
            tabBarLabel: '마이페이지'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}


export default App;