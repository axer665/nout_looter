import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import UserInfo from './../User/main'
import UserProjects from './../User/projects'

function TimeUser (props) {

    const params = useParams()
    const userId = params.id
    const trigger = params.trigger

    let content
    if (trigger == "main"){
        content = <UserInfo user={props.user} />
    } else if (trigger == "projects"){
        content = <UserProjects user={props.user} />
    } else  if (!trigger){
        if (props.user)
            if (props.user.id){
                content = <UserInfo user={props.user} />
            }
    }

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

    return (
        <div>
            <div className={Container}>
                <div className="row">
                    <div className={IndentLeft}>
                    </div>
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={MainBlock}>
                        <div className="container-user cl-w80">
                            {content}
                        </div>
                    </div>
                    <div className={IndentRight}>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default TimeUser