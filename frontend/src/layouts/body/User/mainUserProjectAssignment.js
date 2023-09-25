import React, { useState } from 'react'
import ReactDOM from "react-dom";
import {Link, Navigate} from 'react-router-dom'
import Axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiUser from './../../../api/User'
import Store from 'store'
import UserMenu from  './../../../components/menu/userMenu'


import './../../style/body.scss';

class mainUserProjectAssignment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project : props.project,
            roles : props.roles,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render(){

        let roles
        //console.log(this.state.roles)
        if (this.props.manager)
            roles = "Менеджер"
        else if (this.state.roles.length > 0) {
            roles = (
                this.state.roles.map(role => {
                    return <span key={role.id}> {role.name} <br/> </span>
                })
            )
        } else {
            roles = "Не определены"
        }

        if (this.state.project) {
            return (
                <div className="col-6">
                    <a className="user-settings-project_assignment-link"
                       href={'/project/' + this.state.project.id + '/read'}>
                        <div className="user-settings-project_assignment">

                            <div>
                                <h5>Проект</h5>
                                Наименование : {this.state.project.name}
                            </div>
                            <br/>
                            <div>
                                <h5>Роли в рамках проекта : </h5>
                                {roles}
                            </div>

                        </div>
                    </a>
                </div>
            )
        } else
            return null

    }
}



export default mainUserProjectAssignment