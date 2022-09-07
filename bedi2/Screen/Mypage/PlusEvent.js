import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import additionCircle from '../../Icons/additionCircle.png'
import picture from '../../Icons/picture.png'
import close from '../../Icons/close.png'
const PlusEvent = () => {
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
                        <TouchableOpacity
                            onPress={() =>
                                setPlusClk(prev => !prev)
                            }
                            style={{
                                alignItems: 'flex-end',
                                width: "100%",
                                position: 'absolute',
                                top: 20,
                                right: 10
                            }}
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
    )
}
export default PlusEvent