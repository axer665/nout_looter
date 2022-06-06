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
            document.location.href="/projects";
        })

    }

    render(){
        let logOut
        //if (this.state.logOut){
        //    logOut = <Navigate replace to="/projects" />
        //}
        console.log(this.props)
        return(
            <div>
                {this.props.user.id}
                <br/>
                {this.props.user.login}
                <br/>
                <button onClick={this.logOut}>
                    Выход
                </button>
                {logOut}
            </div>
        )

    }
}



export default User