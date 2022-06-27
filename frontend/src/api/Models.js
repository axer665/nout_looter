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
  baseURL : 'http://192.168.2.119:84/api/',
  params : {},
  url: '',
};

const client = Axios.create({
    config
});




const ApiModel = {

    getHeaders(){
        return config.headers
    },

    getModels(params){
        config.params = params
        return client.get('/models', config)
    },

    createModel(params){
        config.params = params
        return client.post('/model', config)
    },

    getModelData(params){
        config.params = params
        return client.get('/modelData', config)
    },

}

export default ApiModel