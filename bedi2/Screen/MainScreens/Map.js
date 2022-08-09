import React, { useState, useEffect } from "react";

import Geolocation from "react-native-geolocation-service";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, PermissionsAndroid, View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import search from '../../Icons/search.png'


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
    }
    return (
        <View>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%' }}
            >
                <TouchableOpacity
                    onPress={() => searchFn()}>
                    <Image
                        source={search}
                        style={{ width: 24, height: 24, marginRight: '3%' }}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="설정하고자 하는 장소를 검색해주세요. (예: 경기대학교)"
                    onChange={(e) => onChangeSearch(e)}
                    value={text}

                />
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={
                    initialRegion
                }
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    );
}

export default Map;