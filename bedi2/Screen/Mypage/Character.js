import React from 'react'
import { View, Text, Image } from 'react-native'
const Character = () => {
    return (
        <View style={{
            flex: 4,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            <Image
                source={require('../../Images/character/egg.png')}
                style={{
                    height: '50%',
                    width: '50%'
                }}
            />
        </View>
    )
}
export default Character