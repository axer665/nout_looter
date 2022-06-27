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
  baseURL : 'http://192.168.2.119:84/api/reports/',
  params : {},
  url: '',
};

const client = Axios.create({
    config
});




const ApiReport = {

    getHeaders(){
        return config.headers
    },

    getActiveProjects(params){
        config.params = params
        return client.get('/activeProjects', config)
    },

    getActiveModels(params){
        config.params = params
        return client.get('/activeModels', config)
    },

    getProjectModels(params){
        config.params = params
        return client.get('/projectModels', config)
    },

    getSectionModels(params){
        config.params = params
        return client.get('/sectionModels', config)
    }

}

export default ApiReport