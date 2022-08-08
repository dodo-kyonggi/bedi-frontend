import React from 'react'
import { View, Text, Button } from 'react-native'
const Goals = ({ navigation }) => {
    return (
        <View>
            <Text>Goals Screen</Text>
            <Button
                title="위치 설정하러 가기"
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    )
}
export default Goals