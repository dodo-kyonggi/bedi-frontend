import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const Title = (props) => {
    let score = 40 / 80 * 100
    return (
        <View style={{
            flex: 3,

        }}>
            <View style={{
                backgroundColor: '#FFFDFD',
                height: '80%',
                margin: '8%',
                borderRadius: 10,
                padding: '3%'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        color: 'black'
                    }}>
                        Lv{props.lvNum}.{props.name}
                    </Text>
                </View>
                <View style={{
                    flex: 2,
                    alignItems: 'center'
                }}>
                    <View style={{
                        margin: '1%'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'black',
                            textShadowColor: 'rgba(0, 0, 0, 0.4)',
                            textShadowOffset: { width: 0, height: 4 },
                            textShadowRadius: 20
                        }}>
                            '홍길동'님의 누적포인트
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#EFEFEF',
                        height: '45%',
                        width: '100%',
                        borderRadius: 40
                    }}>
                        <View
                            style={{
                                backgroundColor: '#619DC1',
                                width: `${score}%`,
                                height: '100%',
                                borderRadius: 40
                            }}
                        ></View>
                    </View>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 13
                            }}>
                                나의 누적 포인트/최대 포인트
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                color: 'black',
                                fontSize: 16
                            }}>
                                {props.point}point/800point
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default Title