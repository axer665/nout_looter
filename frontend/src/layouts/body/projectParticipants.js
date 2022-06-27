import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'
import ProjectAssignment from './projectAssignment'
import NewProjectAssignment from './../../components/modals/newProjectAssignment'

class projectParticipants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectId : this.props.projectId,
            users : [],
            allUsers: [],
            roles : [],
            isLoadingData : null
        }
    }


    componentDidMount() {
        this.getUsersInProject()
    }

   componentWillUnmount() {
   }

   getUsersInProject(){
        ApiProj.getUsersInProject({'projectId': this.props.projectId})
        .then(response => {
            console.log(response.data)
            this.setState({
                users : response.data.users,
                allUsers : response.data.allUsers,
                roles : response.data.roles,
                isLoadingData : true
            })
        })
   }

    addUser = (event) => {
        console.log(event)
        const data = {
            'user_id' : event.user,
            'project_id' : this.state.projectId
        }

        const headers = ApiProj.getHeaders()
        Axios.post('http://192.168.2.119:84/api/newProjectAssignment', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.getUsersInProject()
        })
    }

    render(){
        if (this.state.isLoadingData !== null){

            let assignments = this.state.users.map((user, key)=> {
                return ( <ProjectAssignment key={key} assignment={user} roles={this.state.roles} copyRoles={this.state.roles} />)
            })

            let headers = (
                <div className="d-flex project_assignment_list-items container-lists-header">
                    <div className="project_assignment_list-email">
                        E-mail
                    </div>
                    <div className="project_assignment_list-check">
                        Подтвердить
                    </div>
                    <div className="project_assignment_list-role-header">
                        Роль
                    </div>
                </div>
            )
            let addUser = (
                <NewProjectAssignment addUser={this.addUser} users={this.state.allUsers} roles={this.state.roles} />
            )

            return(
                <div className="container-project_assignments">
                    <h4>Список участников проекта</h4>
                    {headers}
                    <div className="block-project_assignments">
                        {assignments}
                    </div>
                    {addUser}
                </div>
            )
        } else {
            return null
        }
    }
}

export default projectParticipants