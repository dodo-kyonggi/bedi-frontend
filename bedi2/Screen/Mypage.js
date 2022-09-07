import React, { useEffect, useState } from 'react'
import { View, ImageBackground } from 'react-native'
import Title from './Mypage/Title'
import Character from './Mypage/Character'
import PlusEvent from './Mypage/PlusEvent'
import axios from 'axios'

const Mypage = (props) => {
    useEffect(() => {
        // login()
    }, [])
    return (
        <View>
            <ImageBackground
                source={require('../Images/location/barn.jpg')}
                style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover'
                }}
            >
                <Title settingNecessary={props.settingNecessary} />
                <Character />
                <PlusEvent />
            </ImageBackground >
        </View >
    )
}
export default Mypage;