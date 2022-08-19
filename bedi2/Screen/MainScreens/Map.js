import React, { useState, useEffect } from "react";

import Geolocation from "react-native-geolocation-service";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, Platform, PermissionsAndroid, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import search from '../../Icons/search.png'
import RNGooglePlaces from 'react-native-google-places';
import marker from '../../Icons/marker.png';

function Map() {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 37.2507,
        longitude: 127.0616,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    })
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [text, setText] = useState('')
    const [textInput, setTextInput] = useState('')
    const [markers, setMarkers] = useState([
        {
            coordinate: {
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude
            },
            title: "my location",
            description: 'description1',
            id: 1
        }
    ])
    async function requestPermission() {
        try {
            if (Platform.OS === "android") {
                return await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        requestPermission().then(result => {
            console.log({ result });
            if (result === "granted") {
                const watchId = Geolocation.getCurrentPosition(
                    pos => {
                        setLatitude(pos.coords.latitude);
                        setLongitude(pos.coords.longitude);
                    },
                    error => {
                        console.log(error)
                    }
                )
                console.log('LocationScreen')

            }
        })
    }
        , [])
    const [location, setLocation] = useState();
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
                console.log('찾는 ', place.name, ' 장소의 경도와 위도 : ', place.location.latitude, place.location.longitude);
                setMarkers(prev => [...prev, {
                    coordinate: {
                        latitude: place.location.latitude,
                        longitude: place.location.longitude
                    },
                    title: place.name,
                    description: '목표로 지정하고자 하는 위치입니다',
                    id: markers.length + 1
                }])
                return
            })
            .catch(error => console.log(error.message));
    }

    return (
        <View>
            <Button
                title='장소검색'
                onPress={() => searchFn()}
            />
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={
                    initialRegion
                }
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={{ width: '100%', height: '100%' }}
            >
                {markers.map((marker) => (
                    <Marker
                        coordinate={marker.coordinate}
                        key={marker.id}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}

            </MapView>

        </View >
    );
}

export default Map;