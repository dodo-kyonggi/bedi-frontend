import React, { useEffect, useState } from 'react'
import {
    View, Text, Button, TouchableOpacity, TextInput, Image, StyleSheet, Alert, Platform
} from 'react-native'
import {
    addDays, format, getDate, startOfWeek
} from 'date-fns'
import closeIcon from '../../Icons/close.png'
import axios from 'axios'
import { PermissionsAndroid } from 'react-native'
import Geolocation from "react-native-geolocation-service";
import WeekDay from './Goal/WeekDay'
import CalendarModal from './Modal/CalendarModal'
import Goal from './Goal/Goal'
import TextBtn from './Goal/TextBtn'
import * as users from './Functions/Users'
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYzMTU5MjIzLCJpYXQiOjE2NjMxNTc0MjMsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.iecvlI-fIoGLOcVvakZytuDVGj6Y6RQN98yIh_VYYvM'

const Goals = (props) => {
    let clickDate = new Date()
    const [gotogoal, setGotogoal] = useState(false)
    let time = {
        year: clickDate.getFullYear(),
        month: clickDate.getMonth() + 1,
        date: clickDate.getDate()
    }
    let timeString = ''
    if (time.month < 10 && time.date < 10) {
        timeString = `${time.year}-0${time.month}-0${time.date}`
    } else if (time.month < 10 && time.date >= 10) {
        timeString = `${time.year}-0${time.month}-${time.date}`
    } else if (time.month >= 10 && time.date < 10) {
        timeString = `${time.year}-${time.month}-0${time.date}`
    } else {
        timeString = `${time.year}-${time.month}-${time.date}`
    }
    let maxTimeString = `${time.year}-12-31`
    const [week, setWeek] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [hasModalOpened, setHasModalOpened] = useState(false)
    const [chooseTime, setChooseTime] = useState({
        year: time.year,
        month: time.month,
        day: time.date
    })
    const [startLat, setStartLat] = useState(0)
    const [arriveLat, setArriveLat] = useState(0)
    const [startLon, setStartLon] = useState(0)
    const [arriveLon, setArriveLon] = useState(0)
    const [placeName, setPlaceName] = useState('')
    const [goalTextInput, setGoalTextInput] = useState('')
    const [userDatas, setUserDatas] = useState([])
    const [userAchievedDatas, setUserAchievedDatas] = useState([])
    const [currentPosition, setCurrentPosition] = useState({})
    const [optionClickMotion, setOptionClickMotion] = useState(false)
    const [id, setId] = useState(0)
    const [modifygoal, setModifygoal] = useState(false)
    const [changePosition, setChangePosition] = useState(false)
    let chooseTimeString = ""

    if (chooseTime.month < 10 && chooseTime.date < 10) {
        chooseTimeString = `${chooseTime.year}-0${chooseTime.month}-0${chooseTime.day}`
    } else if (chooseTime.month >= 10 && chooseTime.date < 10) {
        chooseTimeString = `${chooseTime.year}-${chooseTime.month}-0${chooseTime.day}`
    } else if (chooseTime.month < 10 && chooseTime.date >= 10) {
        chooseTimeString = `${chooseTime.year}-0${chooseTime.month}-${chooseTime.day}`
    } else {
        chooseTimeString = `${chooseTime.year}-0${chooseTime.month}-${chooseTime.day}`
    }
    let today = new Date(chooseTime.year, chooseTime.month - 1, chooseTime.day)

    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                setCurrentPosition(
                    {
                        latitude: latitude,
                        longitude: longitude
                    }
                );
                console.log(latitude, longitude)
            },
            error => { console.log(error.code, error.message); },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
        setChangePosition(prev => !prev)
    }
    useEffect(() => {
        // users.Login()
        users.getData(chooseTimeString).then(res => {
            setUserDatas(res)
            console.log(res)
            userDatas.sort(function (a, b) {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
            })
        })

        const weekDays = getWeekDays(today)
        setWeek(weekDays)
        requestPermission().then(result => {
            if (result === "granted") {
                const watchId = Geolocation.getCurrentPosition(
                    pos => {
                        setCurrentPosition(pos.coords);
                    },
                    error => {
                        console.log(error)
                    }
                )
            }
        })

        if (userDatas === []) {
            setGoalTextInput('')
        }
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                setCurrentPosition(
                    {
                        latitude: latitude,
                        longitude: longitude
                    }
                );
                console.log(latitude, longitude)
            },
            error => { console.log(error.code, error.message); },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    }, [chooseTime, gotogoal, optionClickMotion, modifygoal])

    const saveGoalData = () => {
        console.log(props.accessToken)
        axios.post('http://beingdiligent.tk:8080/goal/create',
            {
                "date": chooseTimeString,
                "title": goalTextInput,
                "arrive_lat": arriveLat,
                "arrive_lon": arriveLon,
                "start_lat": startLat,
                "start_lon": startLon
            },

            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

        )
            .then(res => {
                setGotogoal(prev => !prev)
                setUserDatas([...userDatas, res.data])

                setGoalTextInput('')
                setPlaceName('')

                // setAddTodo(false)
            })
            .catch(error => {
                if (error.response.data) {
                    Alert.alert(error.response.data.errorMessage)
                } else {
                    Alert.alert(error.response)
                }
                console.log(error.response)

            })
    }




    async function requestPermission() {
        try {
            if (Platform.OS === "android") {
                return await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    const locationValueFunction = (name, data) => {
        if (name === 'startLat') {
            setStartLat(data)
        } else if (name === 'startLon') {
            setStartLon(data)
        } else if (name === 'arriveLat') {
            setArriveLat(data)
        } else if (name === 'arriveLon') {
            setArriveLon(data)
        }

    }

    const locationName = (getplaceName) => {
        setPlaceName(getplaceName)
    }

    const getWeekDays = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 });
        const weekOfLength = 7
        const final = []
        for (let i = 0; i < weekOfLength; i++) {
            const date = addDays(start, i)
            final.push({
                formatted: format(date, 'EEE'),
                date,
                day: getDate(date),
            })
        }
        return final
    }
    const modifygoalFn = () => {
        console.log('수정하고싶다!')
        axios.put('http://beingdiligent.tk:8080/goal/update',
            {
                "goalId": id,
                "date": chooseTimeString,
                "title": goalTextInput,
                "arrive_lat": arriveLat,
                "arrive_lon": arriveLon,
                "start_lat": currentPosition.latitude,
                "start_lon": currentPosition.longitude
            },

            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

        )
            .then(res => {
                setModifygoal(prev => !prev)
                Alert.alert('목표가 수정되었어요!!')

            })
            .catch(error => {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                } else {
                    console.log(error.response)
                }

            })

    }

    const setGoal = () => {
        if (placeName === '' || goalTextInput === '') {
            Alert.alert(
                '!잠깐만요!',
                '모두 입력해주세요!', [
                {
                    text: '네, 모두 채울게요!', onPress: () => { }, style: 'default'
                }
            ], {
                cancelable: false
            }
            )
        } else {

            if (modifygoal) {
                modifygoalFn()
            } else {
                saveGoalData()
            }

        }
    }

    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
                backgroundColor: 'white',
                justifyContent: 'space-around',
                flexDirection: 'column'
            }}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <View style={{
                        backgroundColor: '#83E022',
                        width: 20, height: 20,
                        borderRadius: 20,
                        marginRight: 10
                    }}>
                    </View>
                    <Text>
                        : 오늘 날짜
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <View style={{
                        backgroundColor: 'yellow',
                        width: 20, height: 20,
                        borderRadius: 20,
                        marginRight: 10
                    }}>
                    </View>
                    <Text>
                        : 선택한 날짜
                    </Text>
                </View>
            </View>
            <WeekDay
                week={week}
                chooseTimeString={chooseTimeString}
                timeString={timeString}
                hasModalOpened={hasModalOpened}
                chooseTime={chooseTime}
            />
            <TextBtn
                setIsModal={setIsModal}
                setGotogoal={setGotogoal}
                setPlaceName={setPlaceName}
                setGoalTextInput={setGoalTextInput}
                timeString={timeString}
            />
            <Goal
                userDatas={userDatas}
                chooseTimeString={chooseTimeString}
                modifygoal={modifygoal}
                setModifygoal={setModifygoal}
                arriveLat={arriveLat}
                setArriveLat={setArriveLat}
                arriveLon={arriveLon}
                setArriveLon={setArriveLon}
                optionClickMotion={optionClickMotion}
                setOptionClickMotion={setOptionClickMotion}
                goalTextInput={goalTextInput}
                setGoalTextInput={setGoalTextInput}
                setId={setId}
                currentPosition={currentPosition}
                userAchievedDatas={userAchievedDatas}
                setUserAchievedDatas={setUserAchievedDatas}
                accessToken={accessToken}
            />

            <CalendarModal
                closeIcon={closeIcon}
                isModal={isModal}
                setIsModal={setIsModal}
                timeString={timeString}
                maxTimeString={maxTimeString}
                chooseTime={chooseTime}
                setChooseTime={setChooseTime}
                hasModalOpened={hasModalOpened}
                setHasModalOpened={setHasModalOpened}
                chooseTimeString={chooseTimeString}
            />

            {
                gotogoal || modifygoal ?
                    <View
                        style={styles.modalContainer}
                    >
                        <View
                            style={styles.closeContainer}

                        >
                            <TouchableOpacity
                                onPress={() => {
                                    gotogoal ?
                                        setGotogoal(prev => !prev) :
                                        (modifygoal ?
                                            setModifygoal(prev => !prev) :
                                            null
                                        )
                                }}
                            >
                                <Image
                                    source={closeIcon}
                                    style={styles.closeStyle}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={styles.notUnderlineContainer}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}
                                >
                                    목표 작성
                                </Text>
                            </View>
                            <TextInput
                                style={styles.whitebox}
                                multiline={true}
                                placeholder='추가하고 싶은 목록을 작성해주세요...'
                                value={goalTextInput}
                                onChangeText={event => {
                                    setGoalTextInput(event)
                                }}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={styles.notUnderlineContainer}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}
                                >
                                    위치 설정
                                </Text>
                            </View>
                            <Button
                                title="위치 설정하러 가기"
                                onPress={() => {
                                    props.navigation.navigate('Map', {
                                        setArriveLat,
                                        setArriveLon,
                                        setStartLat,
                                        setStartLon,
                                        setPlaceName

                                    })
                                }}
                                style={{ flex: 1 }}
                            />
                            <View style={styles.whiteboxBottom}>
                                {placeName ?
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>
                                        홍길동님은 {placeName} 위치로 이동하고 싶어합니다.
                                    </Text> :
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'tomato'
                                    }}>
                                        위치 설정을 해주세요.
                                    </Text>
                                }

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.submitNclose}
                                onPress={() => {
                                    setGoal()
                                }}
                            >
                                <Text style={{ color: 'black' }}>
                                    목표 설정하기
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.submitNclose}
                                onPress={() => {
                                    gotogoal ?
                                        setGotogoal(prev => !prev) :
                                        (modifygoal ?
                                            setModifygoal(prev => !prev) :
                                            null
                                        )
                                }}
                            >
                                <Text style={{ color: 'black' }}>
                                    닫기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
            }
        </View >
    )
}
export default Goals

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 20,
        flex: 1,

    },
    closeContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',

    },
    closeStyle: {
        width: 30,
        height: 30
    },
    notUnderlineContainer: {
        padding: 10
    },
    whitebox: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        height: '60%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        textAlignVertical: "top"
    },
    whiteboxBottom: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlignVertical: "top"
    },
    submitNclose: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '30%',
        marginHorizontal: 5,
        borderRadius: 20
    }
})