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
import UserInfo from './../User/main'

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
            Store.remove('user')
            this.setState({
                logOut : true
            })
            document.location.href="/projects/all";
        })

    }

    render(){
        let logOut
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

        //console.log(this.props.user)

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
                            <UserInfo user={this.props.user}/>
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