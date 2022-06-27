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

import './../../style/body.scss';

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logOut: false
        }
    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    logOut = () => {
        ApiUser.logOut({userId:this.props.user.id})
        .then(response => {
            console.log(response.data)
            Store.remove('user')
            this.setState({
                logOut : true
            })
            document.location.href="/projects/all";
        })

    }

    render(){
        let logOut
        //if (this.state.logOut){
        //    logOut = <Navigate replace to="/projects" />
        //}
        //console.log(this.props)
        let MainBlock = "col-12",
            SideBarBlock, sideBar, IndentLeft, IndentRight,
            Container = "container"

        if (sideBar){
            MainBlock = "col-8"
            IndentLeft = "col-1"
            IndentRight = "col-1"
            SideBarBlock = "col-2"
            Container = "container-fluid"
        }

        console.log(this.props.user)

        return(

            <div className={Container}>
                <div className="row">
                    <div className={IndentLeft}>
                    </div>
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={MainBlock}>
                        <div className="container-user cl-w80">
                            <table className="table-user_data">
                                <tbody>
                                    <tr>
                                        <td>
                                            Логин
                                        </td>
                                        <td>
                                            {this.props.user.login}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Фамилия
                                        </td>
                                        <td>
                                            {this.props.user.first_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Имя
                                        </td>
                                        <td>
                                            {this.props.user.last_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Отчество
                                        </td>
                                        <td>
                                            {this.props.user.patronymic}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            E-mail
                                        </td>
                                        <td>
                                            {this.props.user.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Компания
                                        </td>
                                        <td>
                                            {this.props.user.company}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Должность
                                        </td>
                                        <td>
                                            {this.props.user.function}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" className="btn btn-danger" onClick={this.logOut}>
                                Выход
                            </button>
                            {logOut}
                        </div>
                    </div>
                    <div className={IndentRight}>
                    </div>
                </div>
            </div>
        )

    }
}



export default User