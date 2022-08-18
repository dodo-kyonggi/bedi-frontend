import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarMap = ({ timeString, maxTimeString }) => {
    const markedDates = {
        timeString: { selected: true }
    }

    return (
        <View>
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
                    console.log(day)
                }}
            />
        </View>
    )
}
export default CalendarMap