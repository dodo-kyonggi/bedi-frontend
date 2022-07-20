/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  View,
} from 'react-native';

import GoogleLogin from './GoogleLogin/GoogleLogin';

const App = () => {
  console.log('sss')
  return (
    <View>
      <GoogleLogin />
    </View>
  );
};

export default App;
