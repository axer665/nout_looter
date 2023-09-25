import React, { useState } from 'react'
import ReactDOM from "react-dom";
import {Link, Navigate} from 'react-router-dom'
import Axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { Tabs, Tab } from 'react-bootstrap'
import ApiAuth from './../../../api/Authorisation'
import ApiUser from './../../../api/User'
import Store from 'store'
import UserMenu from  './../../../components/menu/userMenu'
import Assignment from './mainUserProjectAssignment'

import './../../style/body.scss';

class userProjects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logOut: false,
            assignments: []
        }
    }

    componentDidMount() {
        ApiUser.getProjectAssignments({'userId':this.props.user.id})
            .then(response => {
                console.log(response.data)
                this.setState({
                    assignments: response.data.fullAssignments
                })
            })
    }

    componentWillUnmount() {
    }

    logOut = () => {
        ApiUser.logOut({userId:this.props.user.id})
            .then(response => {
                //console.log(response.data)
                Store.remove('user')
                this.setState({
                    logOut : true
                })
                document.location.href="/projects/all";
            })

    }

    render(){
        return(

            <div>

                <UserMenu key="1"  selectedTab="1" user={this.props.user}/>
                <div className="row">
                    {
                        this.state.assignments.map((assignment, key) => {
                            let manager = false
                            if (assignment.roles_ids)
                                if (assignment.roles_ids.manager)
                                    manager = assignment.roles_ids.manager
                            return <Assignment key={key} project={assignment.project_data} roles={assignment.roles_data} manager={manager} />
                        })
                    }
                </div>
                <button type="button" className="btn btn-danger" onClick={this.logOut}>
                    Выход
                </button>

            </div>
        )

    }
}



export default userProjects