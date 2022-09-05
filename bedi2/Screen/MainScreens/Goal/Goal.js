import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React, { useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
const Goal = (props) => {
    const goalAchieve = (goalId) => {
        axios.post('http://beingdiligent.tk:8080/goal/success',
            {
                "goalId": goalId,
                "nowLat": props.currentPosition.latitude,
                "nowLon": props.currentPosition.longitude
            },

            {
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`
                }
            }

        )
            .then(res => {
                console.log('목표 성취!!', res)
                props.userDatas.filter((element) => element.id !== goalId)
                props.userAchievedDatas(res.data)
            })
            .catch(error => {
                console.log('목표 저장 [에러]', error.response)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                }
            })
    }
    const modifyBtn = (title, id) => {
        props.setGoalTextInput(title)
        props.setId(id)

    }
    const goalDelete = (id) => {

        axios.get(`http://beingdiligent.tk:8080/goal/delete/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`,
                }
            })
            .then(res => {
                console.log(res.data)
                props.setOptionClickMotion(prev => !prev)
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                }
            })
    }

    console.log('props.userDatas: ', props.userDatas)
    return (
        <View style={{ flex: 3, paddingHorizontal: 10 }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{ backgroundColor: 'white', height: '100%' }}>
                    <View
                        style={props.userDatas.filter(item => item.date === props.chooseTimeString).length > 2 ?
                            styles.toomuchUnderlineContainer : styles.underlineContainer}
                    >

                        <Text style={styles.goalGuidText}>
                            미달성된 목표
                        </Text>
                        {props.userDatas.filter(item => item.date === props.chooseTimeString).length > 2
                            ?
                            <Text style={{ fontSize: 10 }}>
                                아래로 스크롤하면 다른 목표도 확인할 수 있어요!
                            </Text> : null
                        }
                    </View>

                    <ScrollView>
                        {props.userDatas ? props.userDatas.map((item, index) => {

                            if (item.success === false) {
                                if (item.date === props.chooseTimeString) {
                                    return (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: '1%',
                                            justifyContent: 'space-between'
                                        }}
                                            key={item.id}
                                        >
                                            <Text
                                                style={{ width: '50%' }}>
                                                {index + 1}. {item.title}
                                            </Text>
                                            <View style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',

                                                }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            backgroundColor: '#33CDFF',
                                                            paddingHorizontal: '5%',
                                                            borderRadius: 20,
                                                            paddingVertical: '1%',
                                                            marginHorizontal: '1%',

                                                        }}
                                                        onPress={() => {
                                                            goalAchieve(item.id)
                                                        }}
                                                    >
                                                        <Text>
                                                            달성하기
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{
                                                            backgroundColor: '#79CACC',
                                                            paddingHorizontal: '5%',
                                                            borderRadius: 20,
                                                            paddingVertical: '1%',
                                                            marginHorizontal: '1%'
                                                        }}
                                                        onPress={() => {
                                                            props.setModifygoal(prev => !prev)
                                                            props.setArriveLat(item.lat)
                                                            props.setArriveLon(item.lon)
                                                            modifyBtn(item.title, item.id)
                                                        }}
                                                    >
                                                        <Text>
                                                            수정하기
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#33CDFF',
                                                        paddingHorizontal: '5%',
                                                        borderRadius: 20,
                                                        paddingVertical: '1%',
                                                        marginHorizontal: '1%',
                                                        width: 73
                                                    }}
                                                    onPress={() => {
                                                        goalDelete(item.id)
                                                    }}
                                                >
                                                    <Text>
                                                        삭제하기
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )
                                }
                            }
                        }) : null}
                        {props.userDatas.filter(item => item.date === props.chooseTimeString).length === 0 ?
                            <View>
                                <Text>
                                    아직 설정하신 목표가 없어요😅
                                </Text>
                            </View>
                            : null}
                    </ScrollView>
                </View>
            </View>
            <View
                style={{ flex: 1 }}>
                <View
                    style={styles.underlineContainer}>
                    <Text style={styles.goalGuidText}>
                        달성된 목표
                    </Text>
                </View>
                {props.userDatas ? props.userDatas.map((item, index) => {
                    if (item.success === true) {
                        if (item.date === chooseTimeString) {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: '1%',
                                    justifyContent: 'space-between'
                                }}
                                    key={item.id}
                                >
                                    <Text>
                                        {index + 1}. {item.title}
                                    </Text>
                                </View>
                            )
                        }
                    }
                }) : null}
                {props.userDatas.filter(item => item.date === props.chooseTimeString && item.success === true).length === 0 ?
                    <View>
                        <Text>
                            달성된 목표가 없어요..😧
                        </Text>
                    </View>
                    : null}
            </View>
        </View>
    )
}

export default Goal

const styles = StyleSheet.create({
    underlineContainer: {
        width: '100%',
        borderBottomColor: '#aaa',
        marginVertical: 10,
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    toomuchUnderlineContainer: {
        width: '100%',
        marginVertical: 10,
        borderBottomWidth: 1,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    goalGuidText: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black'
    }
})