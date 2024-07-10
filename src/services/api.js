import axios from "axios"

axios.defaults.baseURL = "https://snake-server-kgz0.onrender.com"
export const fetchUsers = async()=>{
const {data} = await axios.get('/api/users')
return data
}