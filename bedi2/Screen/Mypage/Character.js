import React from 'react';
import {View, Text, Image} from 'react-native';
import loading from '../../gifs/loading.gif';
const Character = props => {
  const img = props.img
    ? props.img === 'egg.jpg'
      ? require('../../Images/character/egg.jpg')
      : props.img === 'chick.jpg'
      ? require('../../Images/character/chick.jpg')
      : require('../../Images/character/chicken.jpg')
    : loading;

  return (
    <View
      style={{
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <Image
        source={img}
        style={{
          height: '50%',
          width: '50%',
        }}
      />
    </View>
  );
};
export default Character;
