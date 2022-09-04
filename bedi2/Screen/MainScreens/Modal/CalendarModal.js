import { Calendar } from 'react-native-calendars'
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import React, { useEffect } from "react";

const CalendarModal = (props) => {
    let chooseTimeString = props.chooseTimeString
    const onClickCalendarModal = (day) => {
        console.log('모달창에서 사용자가 누른 날짜: ', day)
        props.setChooseTime({
            year: day.year,
            month: day.month,
            day: day.day
        })
        props.setIsModal(prev => !prev)
        props.setHasModalOpened(true)
        if (props.timeString !== props.chooseTimeString) {
            console.log('사용자가 누른 날짜는 오늘과 다른 날짜임!!')
        }
    }

    return (
        props.isModal ?
            <View style={
                styles.modalContainer
            }>
                <TouchableOpacity
                    onPress={() => props.setIsModal(prev => !prev)}
                    style={styles.closeContainer}
                >
                    <Image
                        source={props.closeIcon}
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
                        initialDate={props.timeString}
                        // minDate={timeString}
                        maxDate={props.maxTimeString}
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
                            chooseTimeString: { selected: true, color: 'green' }
                        }}
                        style={{
                            width: 400,
                            height: 400,
                        }}
                    />
                </View>
            </View> :
            null
    )
}
export default CalendarModal

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
    }
})