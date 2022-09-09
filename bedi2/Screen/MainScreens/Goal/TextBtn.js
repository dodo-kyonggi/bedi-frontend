import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

const TextBtn = (props) => {
    return (
        <View
            style={styles.btnContainer}
        >
            <View style={{ paddingVertical: 10 }}>
                <Text>
                    홍길동님, 오늘 달성하고 싶은 것은 무엇인가요? {"\n"}
                    추가버튼을 눌러 하나씩 추가해주세요!
                </Text>
            </View>
            <View
                style={styles.btnStyle}
            >
                <Button
                    title='월별 날짜 보러가기'
                    onPress={() => props.setIsModal(prev => !prev)}
                    color='#FBA928'
                />
            </View>
            <View
                style={styles.btnStyle}
            >
                <Button
                    title='목표 설정하러 가기'
                    onPress={() => {
                        props.setGotogoal(prev => !prev)
                        props.setGoalTextInput('')
                        props.setPlaceName('')
                    }}
                    color='#fbc328'
                />
            </View>
        </View>
    )
}
export default TextBtn

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        flex: 2
    },
    btnStyle: {
        width: '90%',
        paddingVertical: 10
    }
})
const style = StyleSheet.c