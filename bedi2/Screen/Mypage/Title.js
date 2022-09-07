import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import axios from "axios"

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYyNTQ0NTI1LCJpYXQiOjE2NjI1MjI5MjUsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.DxEBN3vRwrfAI6H3jgQAyHW3Q8e8vh-c5GWFpCRQG9c'
const settingWtr = () => {
    axios.post('http://beingdiligent.tk:8080/character/setup',
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    )
        .then(res => console.log(res))
        .catch(error => {
            console.log('초기화 요청 작업 실패, ', error.response)
        })
}

const login = () => {
    axios.post('http://beingdiligent.tk/user/login', {
        'password': 'thd02026',
        'email': 'songheeco@yahoo.com'
    })
        .then(res => console.log(res))
        .catch(e => console.log(e.response))
}

const Title = (props) => {
    useEffect(() => {
        // if (props.settingNecessary === 1) {
        //     settingWtr()
        // }
        // login()
        settingWtr()
    }, [])
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
                        Lv.1 노랑노랑
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
                            홍길동님의 누적포인트
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
                                width: '80%',
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
                                500point/800point
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default Title