import {View, Image} from 'react-native';
import React from 'react';

export default Loading = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../gifs/loading.gif')}
        style={{
          height: '50%',
          width: '50%',
        }}
      />
    </View>
  );
};
