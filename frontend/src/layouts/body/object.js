import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import Axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import ApiObj from './../../api/Objects'
import ObjectParameter from './objectParameter'
import Models from './models'

var objectData
var connectObj = 0
var testParamsObj = []
let objectTypes = []

const ObjectParameterLayout = () => {
    const [connectObj, setConnectObj] = useState(0);
    const params = useParams()
    const ObjectId = params.id
    const trigger = params.trigger

    if (connectObj == 0){
        testParamsObj = []

        ApiObj.getObjectData({objectId:ObjectId})
        .then(response => {
            console.log(response.data)
            objectData = response.data.objectData

            let desiredParams = {
                 'name' : { name : 'Наименование', type : 'text' },
                 'short_name' : { name : 'Наименование краткое', type : 'text' },
                 'object_type' : { name : 'Тип объекта', type : 'select'  }
            }

            objectTypes = response.data.types

            Object.keys(objectData).filter( (key, id) =>{
                 let keyName
                 let keyType

                 if (desiredParams[key]){
                     keyName = desiredParams[key].name
                     keyType = desiredParams[key].type

                     testParamsObj.push({
                         'id':key,
                         'data': objectData[key],
                         'keyName':keyName,
                         'keyType':keyType,
                     })
                 }
            })

            setConnectObj(1)
        })
    }

    if (connectObj){

        let MainBlock = "col-12",
            SideBarBlock, sideBar,
            Container = "container"

        if (sideBar){
            MainBlock = "col-8"
            SideBarBlock = "col-2"
            Container = "container-fluid"
        }

        return (
            <div className={Container}>
                <div className="row">
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={MainBlock}>
                        <div className="container-objects-list container-parameters-object cl-w80">

                            {testParamsObj.map(
                                (parameter, key) => {
                                    return (<ObjectParameter key={key} objectId={ObjectId} parameter={parameter} types={objectTypes} />)
                                }
                            )}

                            {<Models objectId={ObjectId} />}

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }

}


export default ObjectParameterLayout