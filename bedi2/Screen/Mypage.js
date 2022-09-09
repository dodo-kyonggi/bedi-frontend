import React, { useEffect, useState } from 'react'
import { View, ImageBackground } from 'react-native'
import Title from './Mypage/Title'
import Character from './Mypage/Character'
import PlusEvent from './Mypage/PlusEvent'
import * as users from './MainScreens/Functions/Users'
import * as mypageUsers from './Mypage/Function/Users'

const Mypage = (props) => {
    let [charac, setCharac] = useState()

    useEffect(() => {
        // users.Login()
        if (props.settingNecessary) {
            mypageUsers.settingWtr()
        }
        // mypageUsers.settingWtr()
        mypageUsers.ongoingCharac()
            .then(res => {
                setCharac(res)
            })
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
                {charac ?
                    <Title
                        settingNecessary={props.settingNecessary}
                        lvNum={charac?.character.level}
                        name={charac?.character.name}
                        point={charac?.point}
                    />
                    : <Title
                        settingNecessary={props.settingNecessary}
                        lvNum={0}
                        name={'no'}
                        point={0}
                    />}

                <Character />
                <PlusEvent />
            </ImageBackground >
        </View >
    )
}
export default Mypage;