import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'
import ProjectAssignment from './projectAssignment'

class projectParticipants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectId : this.props.projectId,
            users : [],
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
                roles : response.data.roles,
                isLoadingData : true
            })
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

            return(
                <div className="container-project_assignments">
                    <h4>Список участников проекта</h4>
                    {headers}
                    {assignments}
                </div>
            )
        } else {
            return null
        }
    }
}

export default projectParticipants