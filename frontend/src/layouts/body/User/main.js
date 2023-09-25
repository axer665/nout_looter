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
import UserParameter from './mainUserParam'

import './../../style/body.scss';
import ObjectParameter from "../objectParameter";

class userinfo extends React.Component {
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
                Store.remove('user')
                this.setState({
                    logOut : true
                })
                document.location.href="/projects/all";
            })

    }

    render(){

        let testParamsUser = []
        let desiredParams = {
            'first_name' : { name : 'Фамилия', type : 'text' },
            'last_name' : { name : 'Имя', type : 'text' },
            'patronymic' : { name : 'Отчество', type : 'text'  },
            'email' : { name : 'E-mail', type : 'text'  }
        }
        Object.keys(this.props.user).filter( (key, id) =>{
            let keyName
            let keyType

            if (desiredParams[key]){
                keyName = desiredParams[key].name
                keyType = desiredParams[key].type

                testParamsUser.push({
                    'id':key,
                    'data': this.props.user[key],
                    'keyName':keyName,
                    'keyType':keyType,
                })
            }
        })

        return(
            <div className="block-user-settings-main">
                <UserMenu key="0"  selectedTab="0" user={this.props.user}/>

                <div className="block-user-settings-main-list">
                {testParamsUser.map(
                    (parameter, key) => {
                        return (<UserParameter key={key} user={this.props.user} parameter={parameter}/>)
                    }
                )}
                </div>
                {/*
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
                </table>*/}
                <button type="button" className="btn btn-danger" onClick={this.logOut}>
                    Выход
                </button>
            </div>
        )

    }
}



export default userinfo