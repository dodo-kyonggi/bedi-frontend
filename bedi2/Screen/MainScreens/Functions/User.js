export default User = () => {
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYyNDY4MzQ4LCJpYXQiOjE2NjI0NDY3NDgsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.KMRqcf720iH71d1hl7OKXqJFKskDxic3dVvGFTaduvo'
    const register = () => {
        axios.post('http://beingdiligent.tk/user/signup', {
            'username': 'songheeco',
            'password': 'thd02026',
            'email': 'songheeco@yahoo.com',
            'phone': '010-7461-1111'
        })
            .then(res => console.log(res))
            .catch(e => console.log(e.response))
    }
    const login = () => {
        axios.post('http://beingdiligent.tk/user/login', {
            'password': 'thd02026',
            'email': 'songheeco@yahoo.com'
        })
            .then(res => console.log(res))
            .catch(e => console.log(e.response))
    }
    const getData = () => {
        axios.get(`http://beingdiligent.tk:8080/goal/show?date=${chooseTimeString}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                setUserDatas(res.data)
                userDatas.sort(function (a, b) {
                    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
                })

            })
            .catch(error => console.log(error.response))
    }

    const Reaccesstoken = () => {
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
    const findAddress = () => {
        const response = fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${arriveLat},${arriveLon}&language=ko&key=AIzaSyAKE8BOliJLqw7UzOP1Ub3SIcl1EliTfkc`,
        ).then((response) => response.json())
            .then((responseJson) => {
            }).catch((err) => console.log("udonPeople error : " + err));
    }
}