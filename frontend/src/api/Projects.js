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

const ApiProj = {

    getHeaders(){
        return config.headers
    },

    getProject(params){
        config.params = params
        return client.get('getProjectData', config)
    },

    getProjects(params){
        config.params = params
        return client.get('projects', config)
    },

    createProject(params){
        config.params = params
        return client.post('project', config)
    },

    projectTypes(params){
        config.params = params
        return client.get('projectTypes', config)
    },

    getProjectAndTypes(params){
        config.params = params
        return client.get('projectAndTypes', config)
    },

    getUsersInProject(params){
        config.params = params
        return client.get('getUsersInProject', config)
    },

    getProjectTemplates(params){
        config.params = params
        return client.get('getProjectTemplates', config)
    }
}

export default ApiProj