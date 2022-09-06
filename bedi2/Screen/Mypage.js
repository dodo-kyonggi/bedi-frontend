import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import additionCircle from '../Icons/additionCircle.png'
import picture from '../Icons/picture.png'
import close from '../Icons/close.png'
const Mypage = () => {
    const [plusClk, setPlusClk] = useState(false)
    useEffect(() => {
    }, [plusClk])
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
                <View style={{ flex: 3 }}>
                    <View>
                        <View></View>
                        <View></View>
                    </View>
                </View>
                <View style={{
                    flex: 4,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('../Images/character/Lv1.png')}
                        style={{
                            height: '50%',
                            width: '50%'
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginRight: '10%'
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            height: plusClk ? 50 : 38,
                            width: plusClk ? 50 : 39,
                            borderRadius: 20,
                        }}
                        >
                            {plusClk ?
                                <TouchableOpacity
                                    onPress={() =>
                                        setPlusClk(prev => !prev)
                                    }
                                >
                                    <Image
                                        source={close}
                                        style={{
                                            height: 30,
                                            width: 30
                                        }}
                                    />
                                </TouchableOpacity> :
                                null}
                            <TouchableOpacity
                                onPress={() =>
                                    setPlusClk(prev => !prev)
                                }>
                                <Image
                                    source={plusClk ? picture : additionCircle}
                                    style={{
                                        height: 40,
                                        width: 41
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}
export default Mypage;