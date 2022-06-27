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
  params : {}
};

const client = Axios.create({
    config
});

const ApiUser = {
    getHeaders(){
        return config.headers
    },

    getUser(params){
        config.params = params
        return client.get('getUser', config)
    },

    logOut(params){
         config.params = params
         return client.get('userLogOut', config)
    },

    getProjectAssignments(params){
        config.params = params
        return client.get('getProjectAssignments', config)
    }
}

export default ApiUser