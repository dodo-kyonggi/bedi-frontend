import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { addDays, format, getData, getDate, startOfWeek, parseISO, getWeek } from 'date-fns'
import moment from 'moment'
const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const Goals = ({ navigation }) => {
    let time = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate()
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
    let clickDate = new Date()
    const [items, setItems] = useState([{}]);
    const [week, setWeek] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [chooseTime, setChooseTime] = useState({
        year: time.year,
        month: time.month,
        day: time.date
    })
    let today = new Date(chooseTime.year, chooseTime.month - 1, chooseTime.day)
    console.log('today: ', today)
    console.log(chooseTime)

    useEffect(() => {
        const weekDays = getWeekDays(today)
        setWeek(weekDays)
        console.log('weekDays:', weekDays)
    }, [chooseTime])
    const markedDates = {
        timeString: { selected: true }
    }

    const onClickDate = (date) => {
        console.log('메인 화면에서 사용자가 누른 날짜: ', date)
    }
    const onClickModal = (day) => {
        console.log('모달창에서 사용자가 누른 날짜: ', day)
        console.log(day.year, day.month, day.day)
        setChooseTime({
            year: day.year,
            month: day.month,
            day: day.day
        })
        setIsModal(prev => !prev)

    }
    const getWeekDays = (date) => {
        console.log(date, 'datee');
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
            style={{ flex: 1, position: 'relative' }}>
            <Button
                title="위치 설정하러 가기"
                onPress={() => navigation.navigate('Map')}
                style={{ flex: 1 }}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: '5%'
            }}>
                {week.map((weekDay) => {
                    return (
                        <View key={weekDay.formatted}>
                            <Text>{weekDay.formatted}</Text>
                            <TouchableOpacity
                                onPress={() => onClickDate(weekDay.date)}
                            >
                                <Text>{weekDay.day}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <Button
                title='월별 날짜 보러가기'
                onPress={() => setIsModal(prev => !prev)}
            />
            {isModal ? (
                <View style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white'
                }}>
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
                    />
                </View>
            ) : null}
        </View>
    )
}
export default Goals