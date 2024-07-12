import axios from "axios"

axios.defaults.baseURL = "https://snake-server-kgz0.onrender.com"

export const fetchUsers = async()=>{
const {data} = await axios.get('/api/users')
return data
}

export const addUser = async(name)=>{
    const {data} = await axios.post('/api/users', name)
    return data
}

export const addScore = async(userName, score)=>{
    const {data} = await axios.post('/api/score', {user_name: userName, score})
    return data
}