import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiModel from './../../api/Models'
import DeleteModelModal from './../../components/modals/confirmDeleteModel'
import NewModel from './../../components/modals/newModel'

class models extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            informers: [],
            models : [],
            sections : [],
            stages : [],

            newModelName : '',
            selectedSection : 0,
            selectedStage : 0,

            objectId : this.props.objectId
        }
        this.getModels()
    }

    getModels(){
        ApiModel.getModels({objectId: this.state.objectId})
        .then(response => {
            console.log(response.data)
            this.setState({
                models : response.data.models,
                sections : response.data.sections,
                stages : response.data.stages,
            })
        })
    }

    newSelectedSection = (event) => {
        this.setState({
            selectedSection : event.target.value
        })
    }

    newSelectedStage = (event) => {
        this.setState({
            selectedStage : event.target.value
        })
    }

    newModelName = (event) => {
        this.setState({
            newModelName : event.target.value
        })
    }

    componentDidMount() {
        console.log('canvas')

    }

    componentWillUnmount() {
    }

    updateStatus = (item) => {

    }

    addInformer = (message) => {
        let messageArray = []
        this.state.informers.filter(message => {
            messageArray.push(message)
        })
        messageArray.push(message)
        this.setState({informers:messageArray})
    }

    addModelMethod = (event) => {
        const data = {
            section_id: event.section,
            stage_id: event.stage,
            name: event.name,
            object_id: this.props.objectId,
        }

        /*if (!data.section_id){
            this.addInformer('Вы не выбрали раздел проекта для создаваемой модели')
        } else if (!data.stage_id) {
            this.addInformer('Вы не выбрали стадию проекта для создаваемой модели')
        } else if (!data.name) {
            this.addInformer('Укажите наименование создаваемой модели')
        } else {*/
            const headers = ApiModel.getHeaders()
            Axios.post('http://192.168.2.119:84/api/model', data, {
                headers: headers
            })
            .then((response) => {
                console.log(response.data)
                this.getModels()
            })
        //}
    }

    deleteModel = (modelId) => {
        const data = {
            id: modelId
        }
        const headers = ApiModel.getHeaders()

        Axios.delete('http://192.168.2.119:84/api/model/'+modelId, {headers : headers, data : data})
        .then((response) => {
            console.log(response.data)
            this.getModels()
        })

    }

    render(){

        let header = (
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                        <div className="model_list-name_header">
                            Наименование
                        </div>
                        <div className="model_list-section_header">
                            Раздел проекта
                        </div>
                        <div className="model_list-stage_header">
                            Стадия проекта
                        </div>
                    </div>
                )

        let models = (
            <div>
                {header}
                <div className="block-models-list">
                {
                    this.state.models.map( model => {
                        let modelSection = "<Не выбрано>"
                        if (model.model_section){
                            modelSection = model.model_section.short_name
                        }
                        let modelStage = "<Не выбрано>"
                        if (model.model_stage){
                            modelStage = model.model_stage.short_name
                        }

                        return (
                            <div key={model.id} className="d-flex flex-row bd-highlight mb-3 model_list-items justify-content-center">
                                <div className="model_list-item-name">
                                    {model.name}
                                </div>
                                <div className="model_list-item-section">
                                    {modelSection}
                                </div>
                                <div className="model_list-item-stage">
                                    {modelStage}
                                </div>
                                <div className="model_list-item-control">
                                    <Link to={"/model/"+model.id} >
                                        <button type="button" className="btn btn-outline-primary">
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                    </Link>
                                    <DeleteModelModal modelId={model.id} modelName={model.name} deleteModel={this.deleteModel} />
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )

        const selectSectionOptions = (
            this.state.sections.map(
                (section, key) => {
                    return (<option key={section.id} value={section.id}> {section.short_name} </option>)
                }
            )
        )

        const selectStageOption = (
            this.state.stages.map(
                (stage, key) => {
                    return (<option key={stage.id} value={stage.id}> {stage.short_name} </option>)
                }
            )
        )

        let selectSection = (
            <select defaultValue="0" onChange={this.newSelectedSection}>
                <option value="0" disabled> Не выбрано </option>
                {selectSectionOptions}
            </select>
        )

        let selectStage = (
            <select defaultValue="0" onChange={this.newSelectedStage}>
                <option value="0" disabled> Не выбрано </option>
                {selectStageOption}
            </select>
        )

        let addModel = (
            <NewModel addModel={this.addModelMethod} stageOptions={selectStageOption} sectionOptions={selectSectionOptions} />
        )

        return (
            <div>
                <div className='container-lists-models'>
                    {models}
                    {addModel}
                </div>

            </div>

        )

    }
}

export default models