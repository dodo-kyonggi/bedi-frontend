import React, { useState, useEffect } from "react";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, PermissionsAndroid, View, Text, TouchableOpacity } from "react-native";
import RNGooglePlaces from 'react-native-google-places';

function Map({ navigation, route }) {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 37.2948,
        longitude: 127.0338,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [text, setText] = useState('')
    const [textInput, setTextInput] = useState('')
    const [settingMarker, setSettingMarkers] = useState(false)
    const [placeName, setPlaceName] = useState('')
    const [markers, setMarkers] = useState([
        {
            coordinate: {
                latitude: initialRegion.latitude,

                longitude: initialRegion.longitude,

            },
            title: "my location",
            description: '나의 위치 정보입니다',
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
            if (result === "granted") {
                Geolocation.getCurrentPosition(
                    pos => {
                        setLatitude(pos.coords.latitude);
                        setLongitude(pos.coords.longitude);
                    },
                    error => {
                        console.log(error)
                    }
                )
            }
        })
    }
        , [latitude, longitude])
    const searchFn = () => {
        setTextInput(text)
        setText('')
        if (markers.length > 2) {
            setMarkers(prev => prev.filter(item => item.id === 1))
        }
        RNGooglePlaces
            .openAutocompleteModal()
            .then((place) => {
                setSettingMarkers(prev => !prev)
                setMarkers(prev => [...prev, {
                    coordinate: {
                        latitude: place.location.latitude,
                        longitude: place.location.longitude
                    },
                    title: place.name,
                    description: '목표로 지정하고자 하는 위치입니다',
                    id: markers.length + 1
                }])
                setPlaceName(place.name)
                return
            })
            .catch(error => console.log(error.message));
    }
    return (
        <View style={{
            flex: 1,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
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
            <View>

            </View>
            <TouchableOpacity
                onPress={() => searchFn()}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '18%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FF9595',
                    padding: 10,
                    paddingHorizontal: 80,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 10
                }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    장소검색하러가기
                </Text>
            </TouchableOpacity>
            {markers.length >= 2 ?
                <TouchableOpacity
                    style={{
                        borderRadius: 20,
                        backgroundColor: 'white',
                        padding: 20,
                        position: 'absolute',
                        top: '75%',
                        left: '9%',
                        width: 330
                    }}
                >
                    <Text
                        style={{ color: 'black' }}>
                        검색하신 장소는 '{placeName}'이에요,
                        {'\n'}해당위치로 목표를 설정하시겠어요❓
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        paddingTop: 10
                    }}>
                        <TouchableOpacity
                            onPress={() =>
                                route.params.setStartLat(markers[0].coordinate.latitude),
                                route.params.setStartLon(markers[0].coordinate.longitude),
                                markers[1] ? route.params.setArriveLat(markers[1].coordinate.latitude.toFixed(6)) : null,
                                markers[1] ? route.params.setArriveLon(markers[1].coordinate.longitude.toFixed(6)) : null,
                                markers[1] ? route.params.setPlaceName(markers[1].title) : null,
                                navigation.goBack

                            }
                            style={{
                                backgroundColor: '#F2F2F2',
                                paddingHorizontal: 55,
                                borderRadius: 20,
                                paddingVertical: 5
                            }}
                        >
                            <Text>
                                네
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F2F2F2',
                                paddingHorizontal: 50,
                                borderRadius: 20,
                                paddingVertical: 5
                            }}
                            onPress={() => {
                                if (markers.length >= 2) {
                                    setMarkers(prev => prev.filter(item => item.id === 1))
                                }
                            }
                            }
                        >
                            <Text>
                                아니요
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity > :
                null
            }
        </View >
    );
}

export default Map;