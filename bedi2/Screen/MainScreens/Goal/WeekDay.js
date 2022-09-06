import { View, Text, TouchableOpacity } from "react-native"
import React, { useEffect } from "react";
const WeekDay = (props) => {
    const onClickDate = (oneString) => {
        let d = new Date(oneString.date)
        props.setChooseTime({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDay()
        })

    }
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: '2%',
            backgroundColor: '#F8F8F8',
            flex: 0.8,
            borderRadius: 6,
            borderColor: 'black'
        }}>
            {props.week.map((weekDay) => {

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
                            onPress={() => props.chooseTimeString = oneString}
                            style={oneString === props.timeString ?
                                {
                                    backgroundColor: '#83E022',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    width: 35,
                                    height: 35,
                                    padding: 5
                                } :
                                ((props.hasModalOpened && weekDay.date.getFullYear() === props.chooseTime.year
                                    && weekDay.date.getMonth() + 1 === props.chooseTime.month
                                    && weekDay.date.getDate() === props.chooseTime.day) ?
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
    )
}

export default WeekDay;