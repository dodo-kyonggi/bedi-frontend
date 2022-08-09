import React, { useState, useEffect } from "react";

import Geolocation from "react-native-geolocation-service";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, PermissionsAndroid, View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import search from '../../Icons/search.png'
import RNGooglePlaces from 'react-native-google-places';

function Map() {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 37.2507,
        longitude: 127.0616,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    })
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [text, setText] = useState('')
    const [textInput, setTextInput] = useState('')

    useEffect(() => {
        console.log('LocationScreen')
        const watchId = Geolocation.getCurrentPosition(
            pos => {
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
            },
            error => {
                console.log(error)
            }
        )
    }, [])

    const onChangeSearch = (e) => {
        setText(e.nativeEvent.text)
    }

    const searchFn = () => {
        setTextInput(text)
        setText('')
        RNGooglePlaces
            .openAutocompleteModal()
            .then((place) => {
                console.log(place);
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
                console.log('찾는 ', place.name, ' 장소의 경도와 위도 : ', place.location.latitude, place.location.longitude)
                return
            })
            .catch(error => console.log(error.message));
    }

    return (
        <View>
            <TouchableOpacity onPress={() => searchFn()}>
                <Text>search button</Text>
            </TouchableOpacity>

            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={
                    initialRegion
                }
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={{ width: '100%', height: '100%' }}
            />
        </View >
    );
}

export default Map;