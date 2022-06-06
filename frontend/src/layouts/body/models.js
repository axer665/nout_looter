import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiModel from './../../api/Models'
import DeleteModelModal from './../../components/modals/confirmDeleteModel'

class models extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            informers: [],
            models : [],
            sections : [],

            newModelName : '',
            selectedSection : 0,

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
            })
        })
    }

    newSelectedSection = (event) => {
        this.setState({
            selectedSection : event.target.value
        })
    }

    newModelName = (event) => {
        this.setState({
            newModelName : event.target.value
        })
    }

    componentDidMount() {

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

    addModelMethod = () => {
        const data = {
            section_id: this.state.selectedSection,
            name: this.state.newModelName,
            object_id: this.props.objectId,
        }

        if (!data.section_id){
            this.addInformer('error 1')
        } else if (!data.name) {
            this.addInformer('error 2')
        } else {
            const headers = ApiModel.getHeaders()
            Axios.post('http://192.168.160.62:84/api/model', data, {
                headers: headers
            })
            .then((response) => {
                console.log(response.data)
                this.getModels()
            })
        }
    }

    deleteModel = (modelId) => {
        const data = {
            id: modelId
        }
        const headers = ApiModel.getHeaders()

        Axios.delete('http://192.168.160.62:84/api/model/'+modelId, {headers : headers, data : data})
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
                    </div>
                )

        let models = (
            <div>
                {header}
                {
                    this.state.models.map( model => {
                        let objectType = "<Не выбрано>"
                        if (model.model_section){
                            objectType = model.model_section.short_name
                        }
                        return (
                            <div key={model.id} className="d-flex flex-row bd-highlight mb-3 model_list-items justify-content-center">
                                <div className="model_list-item-name">
                                    {model.name}
                                </div>
                                <div className="model_list-item-section">
                                    {objectType}
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
        )

        const selectSectionOptions = (
            this.state.sections.map(
                (section, key) => {
                    return (<option key={section.id} value={section.id}> {section.short_name} </option>)
                }
            )
        )

        let selectSection = (
            <select defaultValue="0" onChange={this.newSelectedSection}>
                <option value="0" disabled> Не выбрано </option>
                {selectSectionOptions}
            </select>
        )

        let addModel = (
            <div className="d-flex flex-row bd-highlight mb-3 model_list-items justify-content-center">

                <div className="model_list-item-name">
                    <input type="text" value={this.state.newModelName} onChange={this.newModelName} />
                </div>
                <div className="model_list-item-section">

                {selectSection}

                </div>
                <div className="model_list-item-control">
                    <button type="button" className="btn btn-outline-success" onClick={this.addModelMethod}>add</button>
                </div>

                {this.state.informers.map(
                    (informer, key) => {
                        return (<Informer key={key} message={informer} updateStatus={this.updateStatus} />)
                    }
                )}
            </div>
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