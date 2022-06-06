import Axios from 'axios'
import Store from 'store'

const user = Store.get('user')
let token = 0
if (user){
    token = user.token
}

const params = function(parameters){
    return parameters
}

let config = {
  headers:{
    "Content-Type": "application/json",
     Authorization: "Bearer " + token,
  },
  baseURL : 'http://192.168.160.62:84/api/',
  params : {},
  url: '',
};

const client = Axios.create({
    config
});




const ApiObj = {

    getHeaders(){
        return config.headers
    },

    getObjects(params){
        config.params = params
        return client.get('/objects', config)
    },

    createObject(params){
        config.params = params
        return client.post('/object', config)
    },

    getTypes(){
        return client.get('/objectTypes', config)
    },
    getObjectData(params){
        config.params = params
        return client.get('/objectData', config)
    },

}

export default ApiObj