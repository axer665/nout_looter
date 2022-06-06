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
  params : {}
};

const client = Axios.create({
    config
});

const ApiProj = {

    getHeaders(){
        return config.headers
    },

    getTemplates(params){
        config.params = params
        return client.get('settingsTemplates', config)
    },

    getTemplateVersions(params){
        config.params = params
        return client.get('settingsTemplateVersions', config)
    },

    getTemplateCriterions(params){
        config.params = params
        return client.get('templateCriterions', config)
    },

    getUsers(params){
        config.params = params
        return client.get('getSettingsRoles', config)
    },


    getStages(params){
         config.params = params
         return client.get('getSettingsStages', config)
    },
    getSections(params){
         config.params = params
         return client.get('getSettingsSections', config)
    },
    getObjectTypes(params){
         config.params = params
         return client.get('getSettingsObjectTypes', config)
    },
    getProjectTypes(params){
         config.params = params
         return client.get('getSettingsProjectTypes', config)
    }
}

export default ApiProj