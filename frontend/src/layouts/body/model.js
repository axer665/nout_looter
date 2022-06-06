import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import Axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import ApiModel from './../../api/Models'
import ModelParameter from './modelParameter'

var modelData
var connectMod = 0
var testParamsMod = []
let modelSections = []
let modelStages = []

const ModelParameterLayout = () => {
    const [connectMod, setConnectMod] = useState(0);
    const params = useParams()
    const modelId = params.id
    const trigger = params.trigger

    if (connectMod == 0){
        testParamsMod = []

        ApiModel.getModelData({modelId:modelId})
        .then(response => {
            console.log(response.data)
            modelData = response.data.modelData

            let desiredParams = {
                 'name' : { name : 'Наименование', type : 'text' },
                 'model_section' : { name : 'Раздел проекта', type : 'select' },
                 'model_stage' : {name : 'Этап проектирования', type : 'select' },
                 'participant_bim' : {name : 'Информация об участнике формирования BIM - модели', type : 'textarea'},
                 'footnote' : {name : 'Примечание', type : 'textarea'}
            }

            modelSections = response.data.sections
            modelStages = response.data.stages

            Object.keys(modelData).filter( (key, id) =>{
                 let keyName
                 let keyType

                 if (desiredParams[key]){
                     keyName = desiredParams[key].name
                     keyType = desiredParams[key].type

                     testParamsMod.push({
                         'id':key,
                         'data': modelData[key],
                         'keyName':keyName,
                         'keyType':keyType,
                     })
                 }
            })

            setConnectMod(1)
        })

    }

    if (connectMod){

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
            <div className={Container}>
                <div className="row">
                    <div className={IndentLeft}>
                    </div>
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={MainBlock}>
                        <div className="container-parameters-model cl-w80">
                            {
                                testParamsMod.map(
                                    (parameter, key) => {
                                        return (<ModelParameter key={key}
                                                    modelId={modelId}
                                                    parameter={parameter}
                                                    sections={modelSections}
                                                    stages={modelStages}/>)
                                    })
                            }
                        </div>
                    </div>
                    <div className={IndentRight}>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }

}


export default ModelParameterLayout