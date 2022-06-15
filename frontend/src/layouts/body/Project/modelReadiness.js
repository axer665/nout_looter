import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import Menu from './../../../components/menu/sideBarMenu'
import ApiModel from './../../../api/Models'
import ModelReadinessItem from './modelReadinessItem'

class modelReadiness extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: [],
            sortedModels: [],

            objectList: [],
            objectTypesList: [],
            stagesList: [],
            selectedObject: null,
            selectedOType: null,
            selectedStage: null,

            selectedObject: null,
            selectedObjectType: null,
            selectedStage: null,
            test : 0,
        }
    }

    selected = (event) => {
        this.setState({
            [event.target.dataset.state] : Number(event.target.value),
        })

        console.log(event.target.dataset.state +" - "+ event.target.value)

        let models = [],
            objModel = [],
            ObjTypeModel = [],
            modelIds = [],
            newModels = [],

            objectsIds = [],
            objectTypesIds = [],
            stagesIds = []

        console.log(event.target.dataset.state)

        if (event.target.dataset.state == "selectedObject" && !objectsIds.includes(Number(event.target.value)) && Number(event.target.value) !== 0){
            objectsIds.push(Number(event.target.value))
        } else if (event.target.dataset.state != "selectedObject" && !objectsIds.includes(this.state.selectedObject) && this.state.selectedObject !== null){
            objectsIds.push(this.state.selectedObject)
        }

        if (event.target.dataset.state == "selectedOType" && !objectTypesIds.includes(Number(event.target.value)) && Number(event.target.value) !== 0){
            objectTypesIds.push(Number(event.target.value))
        } else if (event.target.dataset.state != "selectedOType" && !objectTypesIds.includes(this.state.selectedOType) && this.state.selectedOType !== null){
            objectTypesIds.push(this.state.selectedOType)
        }

        if (event.target.dataset.state == "selectedStage" && !stagesIds.includes(Number(event.target.value)) && Number(event.target.value) !== 0){
            stagesIds.push(Number(event.target.value))
        } else if (event.target.dataset.state != "selectedStage" && !stagesIds.includes(this.state.selectedStage) && this.state.selectedStage !== null){
            stagesIds.push(this.state.selectedStage)
        }

        let modelsStep1 = []
        let modelsStep2 = []
        let modelsStep3 = []
        this.state.models.filter(model => {
            if (objectsIds.length > 0){
                if (objectsIds.includes(model.object_id)){
                    //if (!modelIds.includes(model.id)){
                        modelsStep1.push(model.id)
                    //}
                }
            }
            if (objectTypesIds.length > 0){
                if (objectTypesIds.includes(model.model_object.type)){
                    //if (!modelIds.includes(model.id)){
                        modelsStep2.push(model.id)
                    //}
                }
            }
            if (stagesIds.length > 0){
                if (stagesIds.includes(model.stage_id)){
                    //if (!modelIds.includes(model.id)){
                        modelsStep3.push(model.id)
                    //}
                }
            }
        })




        /*models = this.state.models.filter(model => {
            if ( event.target.dataset.state == "selectedStage" && model.stage_id == Number(event.target.value) ){
                if (!modelIds.includes(model.id)){
                    modelIds.push(model.id)
                    newModels.push(model)
                }
                return model
            } else if ( event.target.dataset.state != "selectedStage" && this.state.selectedStage && model.stage_id == this.state.selectedStage){
                if (!modelIds.includes(model.id)){
                    modelIds.push(model.id)
                    newModels.push(model)
                }
                return model
            }
        })

        objModel = this.state.models.filter(model => {
             if ( event.target.dataset.state == "selectedObject" && model.object_id == Number(event.target.value) ){
                if (!modelIds.includes(model.id)){
                    modelIds.push(model.id)
                    newModels.push(model)
                }
                return model
             } else if ( event.target.dataset.state != "selectedObject" && this.state.selectedObject && model.object_id == this.state.selectedObject){
                 if (!modelIds.includes(model.id)){
                     modelIds.push(model.id)
                     newModels.push(model)
                 }
                 return model
             }
        })

        ObjTypeModel = this.state.models.filter(model => {
            if ( event.target.dataset.state == "selectedOType" && model.model_object.type == Number(event.target.value) ){
                if (!modelIds.includes(model.id)){
                    modelIds.push(model.id)
                    newModels.push(model)
                }
                return model
            } else if ( event.target.dataset.state != "selectedOType" && this.state.selectedOType && model.model_object.type == this.state.selectedOType){
                if (!modelIds.includes(model.id)){
                    modelIds.push(model.id)
                    newModels.push(model)
                }
                return model
            }
       })*/



        console.log( this.state )
        //this.getModels()
        //console.log( models )
        //console.log( objModel )
        //console.log( ObjTypeModel )
        //console.log(newModels)
        console.log('objects : ')
        console.log(objectsIds)
        console.log('object types : ')
        console.log(objectTypesIds)
        console.log('stages : ')
        console.log(stagesIds)
        console.log('MODELS IDS : ')
        console.log(modelIds)

        console.log('step 1 : ')
        console.log(modelsStep1)
        console.log('step 2 :')
        console.log(modelsStep2)
        console.log('step 3 :')
        console.log(modelsStep3)

        this.setState({
            //sortedModels : newModels
        })
    }

    componentDidMount() {
        this.getModels()
    }

    componentWillUnmount() {
    }

    getModels = () => {
        ApiModel.getModels({
            'projectId': this.props.projectId,
            'userId': this.props.user.id,
            'getCheckLists':true,
            'getTemplates':true,

            'objectId': this.state.selectedObject,
            'objectType': this.state.selectedOType,
            'stageId': this.state.selectedStage
        })
        .then(response => {
            let objectsIds = [],
                objects = [],
                objectTypesIds = [],
                objectTypes = [],
                stagesIds = [],
                stages = []

            response.data.modelsForCheck.filter(model => {
                if (!objectsIds.includes(model.model_object.id)){
                    objectsIds.push(model.model_object.id)
                    objects.push(model.model_object)
                }
                if (!objectTypesIds.includes(model.model_object.object_type.id)){
                    objectTypesIds.push(model.model_object.object_type.id)
                    objectTypes.push(model.model_object.object_type)
                }
                if (!stagesIds.includes(model.model_stage.id)){
                    stagesIds.push(model.model_stage.id)
                    stages.push(model.model_stage)
                }
            })
            //console.log(response.data.modelsForCheck)
            //console.log(objects)
            //console.log(objectTypes)
            //console.log(stages)

            this.setState({
                models : response.data.modelsForCheck,
                sortedModels : response.data.modelsForCheck,

                objectList: objects,
                objectTypesList: objectTypes,
                stagesList: stages
            })
        })
    }

    render(){

        let objectsSelect = (
            <select data-state="selectedObject" onChange={this.selected}>
                <option value="0"> Не выбрано </option>
                {this.state.objectList.map(object => {
                    return <option key={object.id} value={object.id}> {object.name} </option>
                })}
            </select>
        )
        let objectTypesSelect = (
            <select data-state="selectedOType" onChange={this.selected}>
                <option value="0"> Не выбрано </option>
                {this.state.objectTypesList.map(objectType => {
                    return <option key={objectType.id} value={objectType.id}> {objectType.name} </option>
                })}
            </select>
        )
        let stagesSelect = (
            <select data-state="selectedStage" onChange={this.selected}>
                <option value="0"> Не выбрано </option>
                {this.state.stagesList.map(stage => {
                    return <option key={stage.id} value={stage.id}> {stage.short_name} </option>
                })}
            </select>
        )

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className="models_view_list-object_name_header">
                    Объект
                </div>
                <div className="models_view_list-object_type_header">
                    Тип объекта
                </div>
                <div className="models_view_list-model_stage_header">
                    Стадия
                </div>
                <div className="models_view_list-model_name_header">
                    Наименование модели
                </div>
                <div className="models_view_list-date_header">
                    Дата
                </div>
            </div>
        )
        let models = this.state.sortedModels.map((model, key) => {
            return (<ModelReadinessItem
                        key={key+"-"+model.id}
                        projectId={this.props.projectId}
                        objectData={model.model_object}
                        sectionData={model.model_section}
                        stageData={model.model_stage}
                        id={model.id}
                        name={model.name}
                        footnote={model.footnote}
                        checkLists={model.model_check_lists}
                        templates={model.model_templates}
                        chosenTemplates={model.chosen_templates}
                        defaultTemplate={model.default_template}
                        />)
        })

        return(
            <>
                {this.state.selectedObject}
                {objectsSelect}
                {objectTypesSelect}
                {stagesSelect}
                <div className="container-models-view-list">
                    {header}
                    <div className="block-project-models-list">
                        {models}
                    </div>
                </div>
            </>
        )

    }
}

export default modelReadiness