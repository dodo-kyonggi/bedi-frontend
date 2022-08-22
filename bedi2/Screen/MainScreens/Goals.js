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
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjU1MzA4NTMwIiwiZXhwIjoxNjYxMTU4MDM1LCJpYXQiOjE2NjExNTYyMzUsInVzZXJuYW1lIjoic29uZ2hlaSJ9.FI_k9PIU1KBk2AY7xFbDCcaCTLE6scibpnZJ-HXOefE'
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
        console.log('useeffect되나?')
        // console.log('아래는 회원가입-------------------')
        // register()
        // console.log('아래는 로그인-------------------')
        // login()
        // console.log('아래는 목표 저장-------------------')
        // saveGoalData()
    }, [chooseTime])

    const register = () => {
        axios.post('http://beingdiligent.tk/user/signup', {
            'username': 'songhei',
            'password': 'thd02026',
            'email': 'ghenrhkwk88@gmail.com',
            'phone': '010-7461-1368'
        })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }
    const login = () => {
        axios.post('http://beingdiligent.tk/user/login', {
            'password': 'thd02026',
            'email': 'ghenrhkwk88@gmail.com',
        })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }
    const getData = () => {
        axios.get('http://beingdiligent.tk:8080/goal/show?date=2022-08-22',
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    const saveGoalData = () => {
        // console.log(goalTextInput, arriveLat, arriveLon, startLat, startLon, chooseTimeString)
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
                console.log('응답 성공', res)
                return true
            })
            .catch(error => {
                console.log('응답 에러', error.response)
                Alert.alert(error.response.data.errorMessage)
                return false
            })
    }


    const markedDates = {
        timeString: { selected: true }
    }
    const onClickDate = (date) => {
        console.log('date: ', date)
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
            if (saveGoalData() === true) {
                setGotogoal(prev => !prev)
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
                                onPress={() => onClickDate(weekDay.date)}
                                style={(weekDay.date.getFullYear() === time.year && weekDay.date.getMonth() + 1 === time.month && weekDay.date.getDate() === time.day) ?
                                    {
                                        backgroundColor: 'green'
                                    } :
                                    ((hasModalOpened && weekDay.date.getFullYear() === chooseTime.year && weekDay.date.getMonth() + 1 === chooseTime.month && weekDay.date.getDate() === chooseTime.day) ?
                                        {
                                            backgroundColor: 'yellow',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 5
                                        } :
                                        (selectStyle.length >= 1 ?
                                            null :
                                            null))
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
                        onPress={() => setGotogoal(prev => !prev)}
                        color='#fbc328'
                    />
                </View>
            </View>
            <View style={{ backgroundColor: 'white', flex: 3, paddingHorizontal: 10 }}>
                <View style={{ flex: 1 }}>
                    <View
                        style={styles.underlineContainer}>
                        <Text>
                            미달성된 목표
                        </Text>
                    </View>
                    <Text>
                        1. 학원 등록하기{'\n'}
                        2. 롯데마트 00약국 가서 밴드 사기
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={styles.underlineContainer}>
                        <Text>
                            달성된 목표
                        </Text>
                    </View>
                    <Text>
                        1. 토익 850+ 단어 200개 암기{'\n'}
                        2. 내과 다녀오기
                    </Text>
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                            <Calendar
                                initialDate={timeString}
                                minDate={timeString}
                                maxDate={maxTimeString}
                                theme={{
                                    arrowColor: '#F2CB05',
                                    dotColor: 'green',
                                    todayTextColor: 'red',
                                    selectedDotColor: 'red'
                                }}
                                onDayPress={day => {
                                    onClickCalendarModal(day)
                                }}
                                markedDates={{
                                    chooseTimeString: { selected: true, color: 'green' }
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
                                onPress={() => setGoal()}
                            >
                                <Text style={{ color: 'black' }}>
                                    목표 설정하기
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.submitNclose}>
                                <Text style={{ color: 'black' }}>
                                    닫기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View> :
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
    underlineContainer: {
        width: '100%',
        borderBottomColor: '#aaa',
        marginVertical: 10,
        borderBottomWidth: 1,
        paddingVertical: 5
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