import axios from "axios"
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYzMTU1MzM1LCJpYXQiOjE2NjMxNTM1MzUsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.S89r0JRSNjdyL6ksKexlGDJLTfQx8XgYKdUgOfPVxxI'
export function Login() {
    console.log('로그인 함수 실행')
    axios.post('http://beingdiligent.tk/user/login', {
        'password': 'thd02026',
        'email': 'songheeco@yahoo.com'
    })
        .then(res => console.log(res))
        .catch(e => console.log(e.response))
}

export function register() {
    axios.post('http://beingdiligent.tk/user/signup', {
        'username': 'songhee',
        'password': 'thd02026',
        'email': 'songhee@yahoo.com',
        'phone': '010-7461-1111'
    })
        .then(res => console.log(res))
        .catch(e => console.log(e.response))
}

export const getData = async (chooseTimeString) => {
    return await axios.get(`http://beingdiligent.tk:8080/goal/show?date=${chooseTimeString}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        .then(res => {
            return res.data
        })
        .catch(error => console.log(error.response))
}

export function Reaccesstoken() {
    axios.get('http://beingdiligent.tk/user/refresh',
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        .then(res => {
            setUserDatas(res.data)
        })
        .catch(error => console.log(error.response))
}

export function findAddress() {
    const response = fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${arriveLat},${arriveLon}&language=ko&key=AIzaSyAKE8BOliJLqw7UzOP1Ub3SIcl1EliTfkc`,
    ).then((response) => response.json())
        .then((responseJson) => {
        }).catch((err) => console.log("udonPeople error : " + err));
}
