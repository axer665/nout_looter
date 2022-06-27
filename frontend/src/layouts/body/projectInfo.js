import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiUser from './../../api/User'

class projectInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user : this.props.user,
            check : 0,
            userAssignments : [],
            isAssignments : false,
        }
        this.getUserRoleInProject()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    getUserRoleInProject = () => {
        ApiUser.getProjectAssignments({'userId':this.state.user.id, 'projectId':this.props.projectData.id})
        .then(response => {
            //console.log('resData : ')
            //console.log(response.data)
            let assignments = [],
                check = 0
            if (response.data.assignments){
                assignments = response.data.assignments.roles_data
                check = response.data.assignments.check
            }
            this.setState({
                userAssignments : assignments,
                check : check,
                isAssignments : response.data.assignments
            })
        })
    }

    joinProject = () => {
        let headers = ApiUser.getHeaders()
        let data = {
            'user_id' : this.state.user.id,
            'project_id' : this.props.projectData.id
        }
        Axios.post('http://192.168.2.119:84/api/joinUserInProject', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data)
            this.getUserRoleInProject()
        })
    }

    render(){
        //console.log('user : ')
        //console.log(this.state.user)

        let role, roleDom, assignments, assignmentsDom
        let assignmentsCount = 0
        let nullRole = 1

        if (this.state.user)
            if (this.state.user.user_role)
                role = this.state.user.user_role.role_id

        //console.log('role : ')
        //console.log(role)

        if (role == 4 || role == 1 || role == 2){
            if (this.state.userAssignments.length > 0){
                assignments = this.state.userAssignments.map((assignment, key) => {
                    assignmentsCount++
                    if (assignment.id && this.state.check){
                        nullRole = 0
                        return (<div key={key}> "{assignment.name}" </div>)
                    }
                })
            }
            //console.log(assignmentsCount)
            //console.log(this.state.isAssignments)
            if (assignmentsCount || this.state.isAssignments){
                if (nullRole)
                    assignments = <> Вы подали заявку на участие в этом проекте. Вы получите к нему доступ как только Администратор присвоит вам роль. </>
                else
                    assignments = <>Вы участвуете в этом проекте в роли : {assignments} </>
            } else
                assignments = <button className="system_button system_button-small system_button-blue" onClick={this.joinProject}> Присоединиться <br/> к проекту </button>
        } else {
            // role?
        }

        assignmentsDom = <div className='container-info-project_assignment'> {assignments} </div>

        return(
            <div className="d-flex justify-content-between font-s14">
                <h2 className="head-blue"> {this.props.projectData.name} </h2>
                {assignmentsDom}
            </div>
        )

    }
}

export default projectInfo