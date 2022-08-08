import React from 'react'
import { View, Text, Button } from 'react-native'
const Home = ({ navigation }) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="목표 설정하러 가기"
                onPress={() => navigation.navigate('Goals')}
            />
        </View>
    )
}
export default Home