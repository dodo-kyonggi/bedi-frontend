import axios from "axios"

export default Setting = () => {
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYyNDY4MzQ4LCJpYXQiOjE2NjI0NDY3NDgsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.KMRqcf720iH71d1hl7OKXqJFKskDxic3dVvGFTaduvo'
    const settingWtr = () => {
        axios.post('http://beingdiligent.tk:8080/character/setup',
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        ).then(res => console.log(res))
            .catch(error => console.log(error))
    }
}