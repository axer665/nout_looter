import Axios from 'axios'

const client = Axios.create({
    baseURL: 'http://192.168.2.119:84/api/sanctum/',
});

const api = {
    authentication(params){
        return client.post('token', { params })
    },
    registration(params){
        return client.post('register', { params })
    }
}

export default api