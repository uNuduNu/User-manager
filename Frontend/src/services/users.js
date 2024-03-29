import axios from 'axios'

const baseUrl = '/api/users' 

const getAllUsers = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const getUser = (id) => {
    const promise = axios.get(`${baseUrl}/${id}`)
    return promise.then(response => response.data)
}
const addUser = (user) => {
    const promise = axios.post(baseUrl, user)
    return promise.then(response => response.data)
}

const removeUser = (id) => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return promise.then(response => response.data)
}

const modifyUser = (user) => {
    const promise = axios.put(`${baseUrl}/${user.id}`, user)
    return promise.then(response => response.data)
}

export default { getAllUsers, getUser, addUser, removeUser, modifyUser }