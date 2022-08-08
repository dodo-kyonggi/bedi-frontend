import React from 'react'
import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const Map = () => {
    return (
        <View style={{
            width: '100%',
            height: '100%'
        }}>
            <MapView
                initialRegion={{ latitude: 37.56667, longitude: 126.97806, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                provider={PROVIDER_GOOGLE}
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    )
}
export default Map;

