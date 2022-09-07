import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY_VALUE = 'keyFirstLaunch'
const setAppLaunched = () => {
    AsyncStorage.setItem(KEY_VALUE, 'true')
}
export default CheckFirstLaunch = async () => {
    try {
        const isFirstLaunched = await AsyncStorage.getItem(KEY_VALUE)
        if (isFirstLaunched === null) {
            setAppLaunched()
            return true
        }
        return false
    } catch {
        (error) => {
            console.log('[check first launch]:' + error)
            return false
        }
    }
}