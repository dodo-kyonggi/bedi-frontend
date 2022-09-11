import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import additionCircle from '../../Icons/additionCircle.png'
import picture from '../../Icons/picture.png'
import close from '../../Icons/close.png'
const PlusEvent = ({ navigation }) => {
    const [plusClk, setPlusClk] = useState(false)
    useEffect(() => {
    }, [plusClk])
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: '10%',

            }}>
                <View style={{
                    backgroundColor: 'white',
                    height: plusClk ? 120 : 37,
                    width: plusClk ? 120 : 38,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: plusClk ? 'absolute' : 'relative',
                    bottom: plusClk ? -50 : 0,
                    right: plusClk ? -10 : 0,
                    top: plusClk ? -50 : 0
                }}
                >
                    {plusClk ?
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    setPlusClk(prev => !prev)
                                }
                                style={{
                                    alignItems: 'flex-end',
                                    width: "100%",
                                    position: 'absolute',
                                    top: -30,
                                    right: -30
                                }}
                            >
                                <View style={{
                                    borderRadius: 30,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    height: '100%',
                                    backgroundColor: 'white'
                                }}>
                                    <Image
                                        source={close}
                                        style={{
                                            height: 30,
                                            width: 30
                                        }}
                                    />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Photo')
                                }>
                                <Image
                                    source={picture}
                                    style={{
                                        height: 40,
                                        width: 41
                                    }}
                                />
                            </TouchableOpacity>
                        </View> :
                        <TouchableOpacity
                            onPress={() => {
                                setPlusClk(prev => !prev)
                            }}>
                            <Image
                                source={additionCircle}
                                style={{
                                    height: 40,
                                    width: 41
                                }}
                            />
                        </TouchableOpacity>
                    }

                </View>
            </View>
        </View>
    )
}
export default PlusEvent