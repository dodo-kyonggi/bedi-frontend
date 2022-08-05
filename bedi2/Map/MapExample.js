import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import React from 'react'
import { View } from 'react-native'
const MapExample = () => {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}

            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})
export default MapExample