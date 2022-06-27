import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import ApiSettings from './../../../api/Settings'
import Role from './role.js'
import SettingsMenu from './../../../components/menu/settingsMenu'
import NewSettingsRole from './../../../components/modals/newSettingsRole'

class settingsTemplates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users : [],
            roles : [],
            allUsers : []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    componentWillUnmount() {

    }

    getUsers = () => {
        ApiSettings.getUsers()
        .then(response => {
            this.setState({
                users : response.data.users,
                roles : response.data.roles,
                allUsers : response.data.allUsers
            })
            console.log(response.data)
        })
    }

    addRole = (event) => {
        console.log(event)
        const headers = ApiSettings.getHeaders()
        const data = {
            userId : event.user,
            roleId : event.role,
        }
        Axios.post('http://192.168.2.119:84/api/createSettingsUserRole', data, {
            headers: headers
        })
        .then((response) => {
            this.getUsers()
        })
    }

    render(){
            let settingsMenu = <SettingsMenu key="1" selectedTab="1" />

            let users = this.state.users.map((user, key)=>{
                return (
                        <Role key={key}
                            user={user}
                            roles={this.state.roles}
                        />
                       )
            })

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_roles_list-item-email_header">
                        E-mail
                    </div>
                    <div className="s_roles_list-item-done_header">
                        Подтвердить
                    </div>
                    <div className="s_roles_list-item-role_header">
                        Роль
                    </div>
                </div>
            )

            let addRole = (
                <NewSettingsRole addUser={this.addRole} users={this.state.allUsers} roles={this.state.roles} />
            )

            let MainBlock = "col-12",
                SideBarBlock, sideBar, IndentLeft, IndentRight,
                Container = "container"

            if (sideBar){
                MainBlock = "col-8"
                IndentLeft = "col-1"
                IndentRight = "col-1"
                SideBarBlock = "col-2"
                Container = "container-fluid h-100"
            }

            let mainContent = (
                <div className="container-settings-roles cl-w80">
                    {settingsMenu}
                    {header}
                    <div className="block-settings-roles">
                        {users}
                    </div>
                    {addRole}
                </div>
            )

            return (
                <div className={Container}>
                    <div className="row h-100">
                        <div className={SideBarBlock}>
                            {sideBar}
                        </div>
                        <div className={IndentLeft}>
                        </div>
                        <div className={MainBlock}>
                            {mainContent}
                        </div>
                        <div className={IndentRight}>
                        </div>
                    </div>
                </div>
            )
    }
}

export default settingsTemplates