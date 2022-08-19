import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, Dimensions, Image, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { addDays, format, getData, getDate, startOfWeek, parseISO, getWeek } from 'date-fns'
import moment from 'moment'
import plusIcon from '../../Icons/additionCircle.png'
import closeIcon from '../../Icons/close.png'
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
    let chooseTimeString = ''
    if (chooseTime.month < 10) {
        chooseTimeString = `${chooseTime.year}-0${chooseTime.month}-${chooseTime.date}`
    } else if (chooseTime.date < 10) {
        chooseTimeString = `${chooseTime.year}-${chooseTime.month}-0${chooseTime.date}`
    } else {
        chooseTimeString = `${chooseTime.year}-${chooseTime.month}-${chooseTime.date}`
    }
    let today = new Date(chooseTime.year, chooseTime.month - 1, chooseTime.day)

    useEffect(() => {
        const weekDays = getWeekDays(today)
        setWeek(weekDays)
        console.log('weekDays:', weekDays)
    }, [chooseTime])
    const markedDates = {
        timeString: { selected: true }
    }
    const onClickDate = (date) => {
        console.log('date: ', date)
    }
    const onClickModal = (day) => {
        console.log('모달창에서 사용자가 누른 날짜: ', day)
        setChooseTime({
            year: day.year,
            month: day.month,
            day: day.day
        })
        setIsModal(prev => !prev)
        setHasModalOpened(true)
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
    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
                backgroundColor: 'white',
                padding: '5%'
            }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: '5%',
                backgroundColor: '#F8F8F8',
                flex: 1,
                borderRadius: 6,
                borderColor: 'black'
            }}>
                {week.map((weekDay) => {

                    return (
                        <View
                            key={weekDay.formatted}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
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
                style={{ alignItems: 'center', flex: 9 }}
            >
                <View style={{ paddingVertical: 10 }}>
                    <Text>
                        홍길동님, 오늘 달성하고 싶은 것은 무엇인가요? {"\n"}
                        추가버튼을 눌러 하나씩 추가해주세요!
                    </Text>
                </View>
                <View
                    style={{ width: '80%', paddingVertical: 10 }}
                >
                    <Button
                        title='월별 날짜 보러가기'
                        onPress={() => setIsModal(prev => !prev)}
                        color='#FBA928'
                    />
                </View>
                <View
                    style={{ width: '80%', paddingVertical: 10 }}
                >
                    <Button
                        title='목표 설정하러 가기'
                        onPress={() => setGotogoal(prev => !prev)}
                        color='#fbc328'
                    />
                </View>
            </View>
            {
                isModal ? (
                    <View style={
                        styles.modalContainer
                        //     position: 'absolute',
                        //     justifyContent: 'center',
                        //     alignItems: 'center',
                        //     height: '100%',
                        //     width: '100%',
                        //     backgroundColor: 'white',
                        //     elevation: 100,
                        //     top: 0,
                        //     left: 0,
                        //     right: 0,
                        //     bottom: 0
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
                                onClickModal(day)
                            }}
                            markedDates={{
                                chooseTimeString: { selected: true, color: 'green' }
                            }}
                        />

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
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black'
                            }}
                        >
                            목표 작성
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 30,
                                borderColor: 'black',
                                borderWidth: 1,
                                width: '80%',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                fontSize: 16
                            }}
                            placeholder='추가하고 싶은 목록을 작성해주세요...'
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black'
                            }}
                        >
                            위치 설정
                        </Text>
                        <Button
                            title="위치 설정하러 가기"
                            onPress={() => navigation.navigate('Map')}
                            style={{ flex: 1 }}
                        />
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
        backgroundColor: 'white',
        paddingTop: 28
    },
    closeContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    closeStyle: {
        width: 30,
        height: 30
    }

})