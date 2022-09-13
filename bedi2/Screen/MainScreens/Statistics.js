import axios from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {Text, View} from 'react-native';

function Statistics() {
  const getValue = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/statistic/home`);
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    }

    return (
      <View>
        <Text>통계 화면</Text>
      </View>
    );
  };
}
export default Statistics;
