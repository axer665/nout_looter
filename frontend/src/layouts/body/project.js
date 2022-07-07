import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import Axios from 'axios'

import Objects from "./objectsEdit"
import ProjectParams from "./projectParams"
import ProjectInfo from "./projectInfo"
import ObjectsRead from "./objectsRead"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import ApiProj from './../../api/Projects'
import ApiUser from './../../api/User'
import ProjectMenu from './../../components/menu/projectMenu'
import ProjectParticipants from './projectParticipants'
import ModelReadiness from './Project/modelReadiness'
import ProjectTemplates from './projectTemplates'
import ReportProjectModels from './Project/Reports/modelList'

import Sidebar from './../sidebar'

var projectData
var connect = 0

const Read = (key, value) => {

}

const getKey = (array, value) => {
    let result = false
    let result_step2 = false
    Object.keys(array).filter( (key) => {
        if (array[key] === value){
            result = key
        }
    })
    for (const [key, val] of Object.entries(array)) {
        if (val === value){
            result_step2 = result
        }
    }
    if (result && result_step2)
        return result_step2
    else
        return false
}

var testParams = []
var projectTypes = null
var projectStatuses = null

const Project = (props) => {
    const [connect, setConnect] = useState(0);
    const [userAss, setAssignment] = useState(0)
    const [manager, setManager] = useState(false)
    const params = useParams()
    const projId = params.id
    const trigger = params.trigger
    //console.log('Project PROPS : ')
    //console.log(props)

    if (connect==0){
        testParams = []

        ApiProj.getProjectAndTypes({id: projId})
        .then(response => {
             console.log(response.data)
             projectData = response.data.project
             projectTypes = response.data.types
             projectStatuses = response.data.statuses

             let desiredParams = {
                 'code' : 'Код проекта',
                 'short_name' : 'Наименование проекта краткое',
                 'name' : 'Наименование проекта',
                 'type' : 'Тип проекта',
                 'status' : 'Статус',
                 'image' : 'Изображение для плитки',
             }

             let desiredParamsType = {
                 'code' : 'text',
                 'short_name' : 'text',
                 'name' : 'text',
                 'type' : 'select',
                 'status' : 'select',
                 'image' : 'file',
             }

             Object.keys(projectData).filter( (key, id) =>{
                 let keyName
                 let keyType

                 if (desiredParams[key]){
                     keyName = desiredParams[key]
                 }

                 if (desiredParamsType[key]){
                     keyType = desiredParamsType[key]
                 }

                 testParams.push({
                     'id':key,
                     'data':projectData[key],
                     'keyName':keyName,
                     'keyType':keyType,
                 })
             })
             let manager = false
             if (props.user && projectData.assignments){
                projectData.assignments.filter(assignment => {
                    if (assignment.user_id == props.user.id){
                        if (assignment.roles_ids){
                            manager = assignment.roles_ids.manager
                        }
                    }
                })
             }

             setConnect(1)
             setManager(manager)
        })
    }

    var projectDom, projectObjects, sideBar
    var type
    var status
    let mainContent

    if (connect){

        if (projectData.type){
            type = projectData.type.name
        }
        if (projectData.status){
            status = projectData.status.value
        }



        if (trigger == "edit"){
            let projectMenu = <ProjectMenu key="0" projectId={projId} selectedTab="0" user={props.user}/>
            let projectParams = (
                testParams.map(
                   (param) => {
                       return (
                            <ProjectParams
                                key={param.id}
                                projectId={projId}
                                id={param.id}
                                value={param.data}
                                name={param.keyName}
                                type={param.keyType}
                                types={projectTypes}
                                statuses={projectStatuses}
                                manager={manager}
                            />
                       )
                   })
            )
            projectDom = <> {projectMenu} {projectParams} </>
            projectObjects = <Objects trigger={trigger} projectId={projId} />
            mainContent = (
                <div className='container-parameters'>
                    <div className="container-parameters-items container-parameters-project cl-w80">
                        {projectDom}
                    </div>
                    <div className="container-lists cl-w80">
                        {manager}
                        {projectObjects}
                    </div>
                </div>
            )
        } else if (trigger == "read"){

            sideBar = <Sidebar key={"0"} user={props.user} projectId={projId} tabSelected="0" />
            projectDom = (
                <ProjectInfo id={projId} user={props.user} projectData={projectData} />
            )
            projectObjects = <ObjectsRead projectId={projId} />
            mainContent = (
                <div className='container-parameters'>
                    <div className="container-parameters-items container-parameters-project cl-w80">
                        {projectDom}
                    </div>
                    <div className="container-lists cl-w80">
                        {projectObjects}
                    </div>
                </div>
            )
        } else if (trigger == "model_readiness"){
             sideBar = <Sidebar key="2" user={props.user} projectId={projId} tabSelected="2"  user={props.user}/>
             projectDom = (
                 <ModelReadiness projectId={projId} user={props.user} projectData={projectData} />
             )
             //projectObjects = <ObjectsRead projectId={projId} />
             mainContent = (
                 <div className=''>

                         {projectDom}

                 </div>
             )
        } else if (trigger == "report"){
             sideBar = <Sidebar key="3" user={props.user} projectId={projId} tabSelected="3"  user={props.user}/>
             projectDom = (
                <ReportProjectModels projectId={projId} user={props.user} projectData={projectData} />
            )
            mainContent = (
                 <div className=''>
                         {projectDom}
                 </div>
            )
        } else if (trigger == "participants"){

            let projectMenu = <ProjectMenu key="1" projectId={projId} selectedTab="1" user={props.user}/>
            let projectParty = <ProjectParticipants projectId={projId} />
            projectDom = <> {projectMenu} {projectParty} </>

            mainContent = (
                <div className='container-parameters'>
                    <div className="container-parameters-items container-parameters-project cl-w80">
                        {projectDom}
                    </div>
                    <div className="container-lists cl-w80">
                        {projectObjects}
                    </div>
                </div>
            )
        } else if (trigger == "templates"){

              let projectMenu = <ProjectMenu key="2" projectId={projId} selectedTab="2" />
              let projectParty = <ProjectTemplates projectId={projId} />
              projectDom = <> {projectMenu} {projectParty} </>

              mainContent = (
                  <div className='container-parameters'>
                      <div className="container-parameters-items container-parameters-project cl-w80">
                          {projectDom}
                      </div>
                      <div className="container-lists cl-w80">
                          {projectObjects}
                      </div>
                  </div>
              )
        }
    }

    let MainBlock = "col-12",
        SideBarBlock, IndentLeft, IndentRight,
        Container = "container"

    if (sideBar){
        MainBlock = "col-8"
        IndentLeft = "col-1"
        IndentRight = "col-1"
        SideBarBlock = "col-2"
        Container = "container-fluid h-100"
    }

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


export default Project