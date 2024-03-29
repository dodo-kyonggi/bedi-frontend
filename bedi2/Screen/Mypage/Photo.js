import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native'
import * as mypageUsers from './Function/Users'
import loading from '../../Gifs/loading.gif'
const Photo = () => {
    const [charac, setCharac] = useState()
    const [onOff, setOnOff] = useState(false)
    useEffect(() => {
        mypageUsers.collectCharac()
            .then(res => {
                res = res.filter(item => item.state !== 'incompleted')
                setCharac(res)
                setOnOff(true)
            })
    }, [onOff])
    const img = charac ? (charac.length >= 1 ?
        require('../../Images/character/egg.jpg') : null) : null
    const imgSec = charac ? (charac.length >= 2 ?
        require('../../Images/character/chick.jpg') : null) : null
    const imgThir = charac ? (charac.length === 3 ?
        require('../../Images/character/chick.jpg') : null) : null

    const back = charac ? (charac.length >= 1 ?
        require('../../Images/location/barn.jpg') : loading) : loading
    const backSec = charac ? (charac.length >= 2 ?
        require('../../Images/location/farm.jpg') : loading) : loading
    const backThir = charac ? (charac.length === 3 ?
        require('../../Images/location/farm.jpg') : loading) : loading
    return (
        <View style={styles.photoContainer}>
            <View style={styles.photoSmallContainer}>
                <View style={{
                    height: '100%',
                    width: '60%',
                    flex: 1,
                    padding: 10,
                    borderRadius: 50
                }}>
                    <ImageBackground
                        source={back}
                        style={{
                            height: '90%',
                            width: '100%',
                            resizeMode: 'cover',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            borderRadius: 50
                        }}>
                        <Image
                            style={styles.photoOnlyOne}
                            source={img}
                        />
                    </ImageBackground>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: 5,
                        backgroundColor: '#c9c9c9',
                        borderRadius: 10
                    }}>
                        <Text style={{ color: 'black' }}>
                            {charac ? charac[0].characterName : '레벨 단계가 낮아 볼 수 없어요'}
                        </Text>
                    </View>
                </View>
                <View style={{
                    height: '100%',
                    width: '60%',
                    flex: 1,
                    padding: 10
                }}>
                    <ImageBackground
                        source={backSec}
                        style={{
                            height: '90%',
                            width: '100%',
                            resizeMode: 'cover',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                        <Image
                            style={styles.photoOnlyOne}
                            source={imgSec}
                        />
                    </ImageBackground>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: 5,
                        backgroundColor: '#c9c9c9',
                        borderRadius: 10
                    }}>
                        <Text style={{ color: 'black' }}>
                            {charac ? charac[1].characterName : '레벨 단계가 낮아 볼 수 없어요'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.photoSmallContainer2}>
                <View style={{
                    height: '100%',
                    width: '70%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 20
                }}>
                    <ImageBackground
                        source={backThir}
                        style={{
                            height: '90%',
                            width: '100%',
                            resizeMode: 'cover',
                        }}>
                        <Image
                            style={styles.photoOnlyOne}
                            source={imgThir}
                        />
                    </ImageBackground>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        paddingVertical: 5,
                        backgroundColor: '#c9c9c9',
                        borderRadius: 10
                    }}>
                        <Text style={{ color: 'black' }}>
                            {charac ? (charac.length === 3 ? charac[2].characterName : '레벨 단계가 낮아 볼 수 없어요') : '레벨 단계가 낮아 볼 수 없어요'}
                        </Text>
                    </View>
                </View>
            </View>

        </View >
    )
}
export default Photo

const styles = StyleSheet.create({
    photoContainer: {
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1
    },
    photoSmallContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1
    },
    photoSmallContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '100%',
        flex: 1,
        padding: 10
    },
    photoOnlyOne: {
        width: '40%',
        height: '50%'
    }
})