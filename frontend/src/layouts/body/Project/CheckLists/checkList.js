import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import Axios from 'axios'
import ReactSlider from 'react-slider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Sidebar from './../../../sidebar'
import ApiCheckLists from './../../../../api/CheckLists'
import Criterion from './criterion'

var checkListData = {
    modelName : null,
    stage : null,
    objectName : null,
    objectType : null,
    date : '-'
}
var criteria = []
let requestCriteria = []

let key = 1
let enableCheckList = false


let getCheckLists = (checkListId, setConnectObj) => {
    key++
    ApiCheckLists.getData({'checkListId': checkListId})
    .then(res => {
        console.log(res.data)
        if (res.data.checkList.criterions){
            criteria = res.data.checkList.criterions
            requestCriteria = res.data.checkList.criterions
        }
        if (res.data.checkList.criterion_model){
            checkListData.modelName = res.data.checkList.criterion_model.name
            if (res.data.checkList.criterion_model.model_stage){
                checkListData.stage = res.data.checkList.criterion_model.model_stage.short_name
            }
            if (res.data.checkList.criterion_model.model_object){
                checkListData.objectName = res.data.checkList.criterion_model.model_object.name
            }
            if (res.data.checkList.criterion_model.model_object.object_type){
                checkListData.objectType = res.data.checkList.criterion_model.model_object.object_type.name
            }
            if (res.data.checkList.confirmed_criterion){
                checkListData.date = res.data.checkList.confirmed_criterion.date
            }
        }
        setConnectObj(key)
    })
}

const MYCheckList = (props) => {
    const [connectObj, setConnectObj] = useState(0);
    const [enableCheckList, setDisableList] = useState(false);
    const params = useParams()
    const checkListId = params.id
    const projectId = params.projId

    let checkCheck = () => {
        if(enableCheckList)
            setDisableList(false)
        else
            setDisableList(true)
    }

    if (connectObj == 0){
        getCheckLists(checkListId, setConnectObj)
    }

    if (connectObj){

        let MainBlock = "col-12",
                SideBarBlock, sideBar, IndentLeft, IndentRight,
                Container = "container"

        sideBar = <Sidebar key="2" user={props.user} projectId={projectId} tabSelected="2"/>

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className="cl_criterion-name_header">
                    Критерий
                </div>
                <div className="cl_criterion-value_header">
                    Оценка
                </div>
                <div className="cl_criterion-footnote_header">
                    Примечание
                </div>
            </div>
        )

        let sendReport = (event) => {
            const headers = ApiCheckLists.getHeaders()
            let criteriaArray = requestCriteria.filter(criterion => {
                criterion.value = criterion.criterion_value
                criterion.criterion_id = criterion.id
                criterion.operation = 1
                return criterion
            })
            let data = {
                'data' : criteriaArray,
                'checkListId' : checkListId,
                'projectId' : projectId
            }
            Axios.post('http://192.168.2.119:84/api/confirmCriteria', data, {
                headers: headers
            })
            .then((response) => {
                console.log(response.data)
                getCheckLists(checkListId, setConnectObj)
            })
        }




        let buttonText = "Начать проверку"
        if (enableCheckList){
            buttonText = "Прервать проверку"
        }
        let buttons = (
            <div className="check_lists-header-buttons">
                {/*<button type="button" className="btn btn-primary" onClick={checkCheck} >{buttonText}</button>*/}
                <button type="button" className="btn btn-primary" onClick={sendReport}>Отправить</button>
            </div>
        )
        let modelData = (
            <div>
                <div> {checkListData.objectName} - {checkListData.objectType} </div>
                <div> {checkListData.stage} </div>
                <div> {checkListData.modelName}  </div>
                <div> Дата проверки : {checkListData.date} </div>
            </div>
        )
        let control = (
            <div className="check_lists-header">
                {modelData}
                {buttons}
            </div>
        )


        let assignGrade = (props) => {
            requestCriteria = criteria.filter(criterion => {
                if (criterion.id == props.id){
                    criterion.criterion_value = props.value
                }
                return criterion
            })
            const headers = ApiCheckLists.getHeaders()
            let data = {paramName : 'criterion_value', paramValue : props.value}
            Axios.put('http://192.168.2.119:84/api/updateCLCriterion/'+props.id, data, {
                headers: headers
            })
            .then((response) => {
                console.log(response.data)
            })
        }

        let stepInput = 3
        let currentStepInput = 0
        let doneInput = false
        let timerId

        let inputPause = (props) => {
            timerId = setInterval(() => {
                if (currentStepInput < stepInput) {
                      currentStepInput++
                      console.log(currentStepInput)
                } else {
                    const headers = ApiCheckLists.getHeaders()
                    let data = {paramName : 'footnote', paramValue : props.value}
                    Axios.put('http://192.168.2.119:84/api/updateCLCriterion/'+props.id, data, {
                        headers: headers
                    })
                    .then((response) => {
                        console.log(response.data)
                    })
                    clearInterval(timerId)
                }
            }, 1000);
        }

        let assignFootnote = (props) => {
             console.log(props)
             requestCriteria = criteria.filter(criterion => {
                if (criterion.id == props.id){
                    criterion.footnote = props.value
                }
                return criterion
             })

             currentStepInput = 0
             clearInterval(timerId)
             inputPause(props)
        }

        let criteriaListClass
        //if (!enableCheckList){
        //    criteriaListClass = "container-check_lists disabled"
        //} else {
            criteriaListClass = "container-check_lists"
        //}


        let criteriaCount = 0
        let mainContent = (
            <div>
                <div>
                    {control}
                </div>
                <div className={criteriaListClass}>
                    {header}
                    <div className="container-check_list">
                    {criteria.map((crit, critKey) => {
                        if(crit.criterion_data)
                            criteriaCount++
                        return <Criterion key={critKey+'_'+key} data={crit} assignGrade={assignGrade} assignFootnote={assignFootnote} />
                    })}
                    </div>
                </div>
            </div>
        )

        /*if (criteriaCount == 0){
            mainContent = (
                <div>
                    no criterions
                </div>
            )
        }*/

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

        return (
            <div className={Container}>
                {checkListId}
            </div>
        )
    } else {
        return null
    }

}


export default MYCheckList