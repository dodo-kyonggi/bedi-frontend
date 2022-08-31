import React, { useEffect, useState } from 'react'
import {
    View, Text, Button, TouchableOpacity, TextInput, Dimensions, Image, StyleSheet, Alert,
    KeyboardAvoidingView
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { addDays, format, getData, getDate, startOfWeek, parseISO, getWeek } from 'date-fns'
import moment from 'moment'
import plusIcon from '../../Icons/additionCircle.png'
import closeIcon from '../../Icons/close.png'
import axios from 'axios'
import { loadPartialConfigAsync } from '@babel/core'
import { PermissionsAndroid } from 'react-native'
import Geolocation from "react-native-geolocation-service";
import { ScrollView } from 'react-native-gesture-handler'
const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const Goals = ({ navigation }) => {
    let clickDate = new Date()
    const [selects, setSelects] = useState({})
    const [selectStyle, setSelectStyle] = useState({
        backgroundColor: ''
    })
    const [modal, setModal] = ([
        { gotogoal: false },
        { gotocaln: false }
    ])
    const [gotogoal, setGotogoal] = useState(false)
    let time = {
        year: clickDate.getFullYear(),
        month: clickDate.getMonth() + 1,
        date: clickDate.getDate()
    }
    let timeString = ''
    if (time.month < 10) {
        timeString = `${time.year}-0${time.month}-${time.date}`
    } else if (time.date < 10) {
        timeString = `${time.year}-${time.month}-0${time.date}`
    } else {
        timeString = `${time.year}-${time.month}-${time.date}`
    }
    let maxTimeString = `${time.year}-12-31`
    const [items, setItems] = useState([{}]);
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
    const [reTextInput, setReTextInput] = useState([])
    const [optionClickMotion, setOptionClickMotion] = useState(false)
    const [id, setId] = useState(0)
    const [addTodo, setAddTodo] = useState(false)
    const [modifygoal, setModifygoal] = useState(false)
    const [dotDatas, setDotDatas] = useState({})
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzcxNDEyODAwIiwiZXhwIjoxNjYxOTM1MTY2LCJpYXQiOjE2NjE5MzMzNjYsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.-c0qe1U6OfEyVuNoAn46795LgUuYTD-Rhc2xrtnq-Hk'

    let chooseTimeString = ""
    if (chooseTime.month < 10) {
        chooseTimeString = `${chooseTime.year}-0${chooseTime.month}-${chooseTime.day}`
    } else if (chooseTime.date < 10) {
        chooseTimeString = `${chooseTime.year}-${chooseTime.month}-0${chooseTime.day}`
    } else {
        chooseTimeString = `${chooseTime.year}-${chooseTime.month}-${chooseTime.day}`
    }
    let today = new Date(chooseTime.year, chooseTime.month - 1, chooseTime.day)

    useEffect(() => {
        const weekDays = getWeekDays(today)
        setWeek(weekDays)
        // console.log('아래는 회원가입-------------------')
        // register()
        // console.log('아래는 로그인-------------------')
        // login()
        // console.log('아래는 목표 저장-------------------')
        // saveGoalData()
        // console.log('아래는 목표 불러오기-------------------')
        getData()
        //Reaccesstoken()
        // console.log('reTextInput', reTextInput)
        const geoLocation = () => {
            Geolocation.getCurrentPosition(
                position => {
                    const latitude = JSON.stringify(position.coords.latitude);
                    const longitude = JSON.stringify(position.coords.longitude);

                    setCurrentPosition({
                        latitude: latitude,
                        longitude: longitude
                    });
                },
                error => { console.log(error.code, error.message); },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            )
        }
        if (userDatas === []) {
            setGoalTextInput('')
        }
        geoLocation()
        console.log(timeString)
    }, [chooseTime, gotogoal, optionClickMotion, modifygoal])
    const register = () => {
        axios.post('http://beingdiligent.tk/user/signup', {
            'username': 'songheeco',
            'password': 'thd02026',
            'email': 'songheeco@yahoo.com',
            'phone': '010-7461-1111'
        })
            .then(res => console.log(res))
            .catch(e => console.log(e.response))
    }
    const login = () => {
        axios.post('http://beingdiligent.tk/user/login', {
            'password': 'thd02026',
            'email': 'songheeco@yahoo.com',
        })
            .then(res => console.log(res))
            .catch(e => console.log(e.response))
    }
    const getData = () => {
        axios.get(`http://beingdiligent.tk:8080/goal/show?date=${chooseTimeString}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setUserDatas(res.data)
                userDatas.sort(function (a, b) {
                    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
                })

            })
            .catch(error => console.log(error.response))
    }

    const Reaccesstoken = () => {
        axios.get('http://beingdiligent.tk/user/refresh',
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setUserDatas(res.data)
            })
            .catch(error => console.log(error.response))
    }
    const saveGoalData = () => {
        console.log(goalTextInput, arriveLat, arriveLon, startLat, startLon, chooseTimeString)
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
                console.log('목표 저장 [성공]', res)
                setGotogoal(prev => !prev)
                setUserDatas([...userDatas, res.data])

                setGoalTextInput('')
                setPlaceName('')

                // setAddTodo(false)
            })
            .catch(error => {
                console.log('목표 저장 [에러]', error.response)
                if (error.response.data) {
                    Alert.alert(error.response.data.errorMessage)
                } else {
                    Alert.alert(error.response)
                }


            })
    }


    const goalAchieve = (goalId) => {
        console.log(goalId, currentPosition)
        axios.post('http://beingdiligent.tk:8080/goal/success',
            {
                "goalId": goalId,
                "nowLat": currentPosition.latitude,
                "nowLon": currentPosition.longitude
            },

            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

        )
            .then(res => {
                console.log('목표 성취!!', res)
                userDatas.filter((element) => element.id !== goalId)
                userAchievedDatas(res.data)
            })
            .catch(error => {
                console.log('목표 저장 [에러]', error.response)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                }
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

    const onClickDate = (oneString) => {
        console.log('date: ', date.date)
        let d = new Date(date.date)
        setChooseTime({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDay()
        })

    }
    const onClickCalendarModal = (day) => {
        console.log('모달창에서 사용자가 누른 날짜: ', day)
        setChooseTime({
            year: day.year,
            month: day.month,
            day: day.day
        })
        setIsModal(prev => !prev)
        setHasModalOpened(true)
        if (timeString !== chooseTimeString) {
            console.log('사용자가 누른 날짜는 오늘과 다른 날짜임!!')
        }
    }

    const locationValueFunction = (name, data) => {
        console.log('부모 컴포넌트에서 수행')
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

    const modifyBtn = (title, id) => {
        setGoalTextInput(title)
        setId(id)

    }
    const findAddress = () => {
        const response = fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${arriveLat},${arriveLon}&language=ko&key=AIzaSyAKE8BOliJLqw7UzOP1Ub3SIcl1EliTfkc`,
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log('udonPeople ' + responseJson.results[0].formatted_address);
            }).catch((err) => console.log("udonPeople error : " + err));
    }
    const modifygoalFn = () => {
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
                console.log('목표 수정 [에러]', error.response)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                }

            })

    }

    const goalDelete = (id) => {
        axios.get(`http://beingdiligent.tk:8080/goal/delete/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setOptionClickMotion(prev => !prev)
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.errorMessage)
                }
            })
    }

    const setGoal = (saved) => {
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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: '2%',
                backgroundColor: '#F8F8F8',
                flex: 0.8,
                borderRadius: 6,
                borderColor: 'black'
            }}>
                {week.map((weekDay) => {
                    // const oneString = `${weekDay.date.getFullYear()}-${weekDay.date.getMonth() + 1}-${weekDay.date.getDate()}`
                    let oneString = ''
                    let month = ''
                    let date = ''
                    if (weekDay.date.getMonth() + 1 < 10 && weekDay.date.getDate() >= 10) {
                        oneString = `${weekDay.date.getFullYear()}-0${weekDay.date.getMonth() + 1}-${weekDay.date.getDate()}`

                    } else if (weekDay.date.getMonth() + 1 < 10 && weekDay.date.getDate() < 10) {
                        oneString = `${weekDay.date.getFullYear()}-0${weekDay.date.getMonth() + 1}-0${weekDay.date.getDate()}`
                    } else if (weekDay.date.getMonth() + 1 >= 10 && weekDay.date.getDate() < 10) {
                        oneString = `${weekDay.date.getFullYear()}-${weekDay.date.getMonth() + 1}-0${weekDay.date.getDate()}`
                    } else {
                        oneString = `${weekDay.date.getFullYear()}-${weekDay.date.getMonth() + 1}-${weekDay.date.getDate()}`
                    }
                    return (
                        <View
                            key={weekDay.formatted}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#F8F8F8',
                            }}
                        >
                            <View style={{ paddingVertical: 5 }}>
                                <Text>{weekDay.formatted}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => chooseTimeString = oneString}
                                style={oneString === timeString ?
                                    {
                                        backgroundColor: '#83E022',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        width: 35,
                                        height: 35,
                                        padding: 5
                                    } :
                                    ((hasModalOpened && weekDay.date.getFullYear() === chooseTime.year && weekDay.date.getMonth() + 1 === chooseTime.month && weekDay.date.getDate() === chooseTime.day) ?
                                        {
                                            backgroundColor: 'yellow',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20,
                                            width: 35,
                                            height: 35,
                                            padding: 5
                                        } :
                                        {
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 5,
                                            width: 35,
                                            height: 35,
                                            padding: 5
                                        }
                                    )
                                }
                            >
                                <Text>{weekDay.day}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <View
                style={{ alignItems: 'center', flex: 2 }}
            >
                <View style={{ paddingVertical: 10 }}>
                    <Text>
                        홍길동님, 오늘 달성하고 싶은 것은 무엇인가요? {"\n"}
                        추가버튼을 눌러 하나씩 추가해주세요!
                    </Text>
                </View>
                <View
                    style={{ width: '90%', paddingVertical: 10 }}
                >
                    <Button
                        title='월별 날짜 보러가기'
                        onPress={() => setIsModal(prev => !prev)}
                        color='#FBA928'
                    />
                </View>
                <View
                    style={{ width: '90%', paddingVertical: 10 }}
                >
                    <Button
                        title='목표 설정하러 가기'
                        onPress={() => {
                            setGotogoal(prev => !prev)
                            setGoalTextInput('')
                            setPlaceName('')
                        }}
                        color='#fbc328'
                    />
                </View>
            </View>
            <View style={{ flex: 3, paddingHorizontal: 10 }}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{ backgroundColor: 'white', height: '100%' }}>
                        <View
                            style={userDatas.filter(item => item.date === chooseTimeString).length > 2 ?
                                styles.toomuchUnderlineContainer : styles.underlineContainer}
                        >

                            <Text style={styles.goalGuidText}>
                                미달성된 목표
                            </Text>
                            {userDatas.filter(item => item.date === chooseTimeString).length > 2
                                ?
                                <Text style={{ fontSize: 10 }}>
                                    아래로 스크롤하면 다른 목표도 확인할 수 있어요!
                                </Text> : null
                            }
                        </View>

                        <ScrollView>
                            {userDatas ? userDatas.map((item, index) => {

                                if (item.success === false) {
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
                                                                // setGotogoal(prev => !prev)
                                                                setModifygoal(prev => !prev)
                                                                setArriveLat(item.lat)
                                                                setArriveLon(item.lon)
                                                                // findAddress()
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
                            {userDatas.filter(item => item.date === chooseTimeString).length === 0 ?
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
                    {userDatas ? userDatas.map((item, index) => {
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
                    {userDatas.filter(item => item.date === chooseTimeString && item.success === true).length === 0 ?
                        <View>
                            <Text>
                                달성된 목표가 없어요..😧
                            </Text>
                        </View>
                        : null}
                </View>
            </View>

            {
                isModal ? (
                    <View style={
                        styles.modalContainer
                    }>
                        <TouchableOpacity
                            onPress={() => setIsModal(prev => !prev)}
                            style={styles.closeContainer}
                        >
                            <Image
                                source={closeIcon}
                                style={styles.closeStyle}
                            />
                        </TouchableOpacity>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            //  height: '80%' ,
                            width: '100%',
                            height: '100%'
                        }}>
                            <Calendar
                                initialDate={timeString}
                                // minDate={timeString}
                                maxDate={maxTimeString}
                                theme={{
                                    arrowColor: '#F2CB05',
                                    dotColor: 'green',
                                    todayTextColor: 'red',
                                    selectedDotColor: 'red'
                                }}
                                onDayPress={day => {
                                    onClickCalendarModal(day)
                                    console.log(day)
                                }}
                                markedDates={{
                                    chooseTimeString: { selected: true, color: 'green' },

                                }}
                                style={{
                                    width: 400,
                                    height: 400,


                                }}
                            />
                        </View>

                    </View>
                ) : null
            }

            {
                gotogoal ?
                    <View
                        style={styles.modalContainer}
                    >
                        <View
                            style={styles.closeContainer}

                        >
                            <TouchableOpacity
                                onPress={() => setGotogoal(prev => !prev)}
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
                                onPress={() => (
                                    navigation.navigate('Map',
                                        {
                                            setArriveLat,
                                            setArriveLon,
                                            setStartLat,
                                            setStartLon,
                                            setPlaceName
                                        }
                                    ),
                                    console.log(arriveLat, arriveLon, startLat, startLon)
                                )}
                                style={{ flex: 1 }}
                            />
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 20,
                                width: '100%',
                                marginVertical: 10,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                textAlignVertical: "top"
                            }}>
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
                                    console.log('목표 설정')
                                }}
                            >
                                <Text style={{ color: 'black' }}>
                                    목표 설정하기
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.submitNclose}
                                onPress={() => setGotogoal(prev => !prev)}
                            >
                                <Text style={{ color: 'black' }}>
                                    닫기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View> :
                    (modifygoal ?
                        <View
                            style={styles.modalContainer}
                        >
                            <View
                                style={styles.closeContainer}

                            >
                                <TouchableOpacity
                                    onPress={() => setModifygoal(prev => !prev)}
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
                                    onPress={() => (
                                        navigation.navigate('Map',
                                            {
                                                setArriveLat,
                                                setArriveLon,
                                                setStartLat,
                                                setStartLon,
                                                setPlaceName
                                            }
                                        ),
                                        console.log(arriveLat, arriveLon, startLat, startLon)
                                    )}
                                    style={{ flex: 1 }}
                                />
                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    width: '100%',
                                    marginVertical: 10,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    textAlignVertical: "top"
                                }}>
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
                                        // setAddTodo(false)
                                        setGoal()

                                        console.log('목표 설정')
                                    }}
                                >
                                    <Text style={{ color: 'black' }}>
                                        목표 설정하기
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.submitNclose}
                                    onPress={() => setModifygoal(prev => !prev)}
                                >
                                    <Text style={{ color: 'black' }}>
                                        닫기
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        : null)

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