import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react";
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
const Goal = (props) => {
    const userDatas = props.userDatas
    const [characAppear, setCharacAppear] = useState(false)
    const [open, setOpen] = useState(false)
    const [imgName, setImgName] = useState('')
    let img = imgName ? (imgName === 'egg.jpg' ?
        require('../../../Images/character/egg.jpg') : (imgName === 'chick.jpg' ?
            require('../../../Images/character/chick.jpg') : (imgName === 'chicken.jpg' ?
                require('../../../Images/character/chicken.jpg') : require('../../../Gifs/loading.gif')))) : require('../../../Gifs/loading.gif')

    const goalAchieve = (goalId) => {
        console.log(goalId, props.currentPosition.latitude, props.currentPosition.longitude)
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
                props.userDatas?.filter((element) => element.id !== goalId)
                props.userAchievedDatas(res.data)
                if (res.data.levelUp) {
                    setCharacAppear(true)
                    setImgName(prev => res.data.character.img)
                    setOpen(true)
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                }
                Alert.alert(error.response.data.errorMessage)
                console.log(error.response)
            })
    }
    const modifyBtn = (title, id) => {
        props?.setGoalTextInput(prev => title)
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
                props.setOptionClickMotion(prev => !prev)
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                } else {
                    Alert.alert(error.message)
                }
            })
    }

    useEffect(() => {


    }, [characAppear, open, props.currentPosition])
    console.log(open)
    return (
        <View style={{ flex: 3, paddingHorizontal: 10, position: 'relative' }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{ backgroundColor: 'white', height: '100%' }}>
                    <View
                        style={props.userDatas?.filter(item => item.date === props.chooseTimeString).length > 2 ?
                            styles.toomuchUnderlineContainer : styles.underlineContainer}
                    >

                        <Text style={styles.goalGuidText}>
                            미달성된 목표
                        </Text>
                        {props.userDatas?.filter(item => item.date === props.chooseTimeString).length > 2
                            ?
                            <Text style={{ fontSize: 10 }}>
                                아래로 스크롤하면 다른 목표도 확인할 수 있어요!
                            </Text> : null
                        }
                    </View>

                    <ScrollView>
                        {props.userDatas ? props.userDatas.filter((item, index) =>
                            item.success === false && item.date === props.chooseTimeString
                        ).map((item, index) => {
                            return (
                                <View style={styles.behindUnderlineContainer}
                                    key={item.id}
                                >
                                    <View style={{ width: '50%' }}>
                                        <Text>
                                            {index + 1}. {item.title}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={
                                                    [styles.changeBox,
                                                    styles.borderRightLine]
                                                }
                                                onPress={() => {
                                                    goalAchieve(item.id)
                                                }}
                                            >
                                                <Text>
                                                    달성하기
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.changeBox,
                                                styles.borderRightLine]}
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
                                            <TouchableOpacity
                                                style={styles.changeBox}
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

                                </View>
                            )

                        }) :
                            <View>
                                <Text>
                                    아직 설정하신 목표가 없어요😅
                                </Text>
                            </View>}
                        {props.userDatas?.filter(item => item.date === props.chooseTimeString && item.success === false).length === 0 ?
                            <View>
                                <Text>
                                    아직 설정하신 목표가 없어요😅
                                </Text>
                            </View>
                            :
                            null

                        }
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
                {props.userDatas ? props.userDatas.filter((item, index) =>
                    item.success === true && item.date === props.chooseTimeString
                )
                    .map((item, index) => {
                        return (
                            <View style={styles.behindUnderlineContainer}
                                key={item.id}
                            >
                                <Text>
                                    {index + 1}. {item.title}
                                </Text>
                            </View>
                        )


                    }) :

                    <View>
                        <Text>
                            달성된 목표가 없어요..😧
                        </Text>
                    </View>

                }
                {props.userDatas?.filter((item, index) => item.date === props.chooseTimeString && item.success === true).length === 0 ?
                    <View>
                        <Text>
                            달성된 목표가 없어요..😧
                        </Text>
                    </View>
                    : null}
            </View>

            {open ?
                <View style={{
                    position: 'absolute',
                    width: '120%',
                    height: '220%',
                    top: -350,
                    bottom: 100,
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    flex: 1
                }}
                >
                    <View style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginTop: 20,
                        width: '85%',
                        height: '100%',
                        flex: 2
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setOpen(prev => !prev)
                            }}
                            style={{
                                width: '100%',
                                height: '50%',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Image
                                source={require('../../../Icons/close.png')}
                                style={{ width: 40, height: 40 }}

                            />
                            <Text>레벨업 하셨어요!! 마이페이지에서 캐릭터 확인이 가능하세요!!</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={img}
                        style={{
                            width: '100%',
                            height: '100%',
                            flex: 8
                        }}
                    />
                </View> : null}
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
    },
    behindUnderlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '1%',
        justifyContent: 'space-between',
        width: '100%'
    },
    changeBox: {
        backgroundColor: 'white',
        paddingVertical: '1%',
        marginHorizontal: '1%'
    },
    borderRightLine: {
        borderRightColor: 'black',
        borderRightWidth: 1,
        padding: '1%'
    }
})