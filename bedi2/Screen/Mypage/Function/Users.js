import axios from "axios"
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzY2ODAyNjk5IiwiZXhwIjoxNjYzMTU5MjIzLCJpYXQiOjE2NjMxNTc0MjMsInVzZXJuYW1lIjoic29uZ2hlZWNvIn0.iecvlI-fIoGLOcVvakZytuDVGj6Y6RQN98yIh_VYYvM'
export function settingWtr() {
    axios.post('http://beingdiligent.tk:8080/character/setup', null,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log('초기화 요청 작업 성공, ', res)
        })
        .catch(error => {
            console.log(accessToken)
            console.log('초기화 요청 작업 실패, ', error.response)
        })
}

export const ongoingCharac = async () => {
    return await axios.get('http://beingdiligent.tk:8080/character/ongoing',
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log('캐릭터 정보받기 작업 성공, ', res)
            return res.data
        })
        .catch(error =>
            console.log('캐릭터 정보 받기 작업 실패, ', error.response)
        )

}

export const collectCharac = async () => {
    return await axios.get('http://beingdiligent.tk:8080/character/collect',
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log('수집한 캐릭터 목록받기 작업 성공, ', res)
            return res.data
        })
        .catch(error =>
            console.log('수집한 캐릭터 목록받기 작업 실패, ', error.response)
        )
}