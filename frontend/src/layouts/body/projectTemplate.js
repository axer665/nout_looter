import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProject from './../../api/Projects'

class projectTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            versions : props.versions,

            maxVersion : null,
            selectedTemplate : null,

            version : <span> </span>,
            versionText : null,
            versionDefault : null,
            selectedVersion : null,

            control : (
                <button className="btn btn-outline-secondary" onClick={this.fomationVersionList}> <FontAwesomeIcon icon={faPen} /> </button>
            )
        }
        console.log(props)
    }

    getSelectedVersion = () => {
        if (this.props.chosenTemplate){
            if (this.props.chosenTemplate.template_data){
                this.setState({
                    version : <span> {this.props.chosenTemplate.template_data.version} </span>,
                    versionText : this.props.chosenTemplate.template_data.version,
                    versionDefault : this.props.chosenTemplate.template_data.version,
                    selectedVersion : this.props.chosenTemplate.template_data.id
                })
            } else if (this.props.versions.length > 0){
                this.setState({
                      version : <span> {this.props.versions[0].version} </span>,
                      versionText : this.props.versions[0].version,
                      versionDefault : this.props.versions[0].version,
                      selectedVersion : this.props.versions[0].id
                })
            }
        } else if (this.props.versions.length > 0){
            this.setState({
                version : <span> {this.props.versions[0].version} </span>,
                versionText : this.props.versions[0].version,
                versionDefault : this.props.versions[0].version,
                selectedVersion : this.props.versions[0].id
            })
        }
        if (this.props.versions.length > 0){
            this.setState({
                maxVersion : this.props.versions[this.props.versions.length-1].version,
            })
        }
    }

    fomationVersionList = () => {
        let defaultValue = 0
        let options, select
        options = this.props.versions.map( (item) => {
            let selected = (
                <option key={item.id} value={item.id} >
                     {item.version}
                </option>
            )
            if (item.version == this.state.versionDefault){
                defaultValue = item.id
            }

            return (
                selected
            )
        })

        select = <select defaultValue={defaultValue} onChange={this.selectVersion}> {options} </select>

        this.setState({
            version : select,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-success" onClick={ this.selectOk }>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={ this.selectCancel }>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </span>
            )
        })
    }

    selectCancel = () => {
        this.setState({
           version : <span> {this.state.versionDefault} </span>,
           control : <button className="btn btn-outline-secondary" onClick={this.fomationVersionList}> <FontAwesomeIcon icon={faPen} /> </button>
        })
    }

    selectOk = () => {
        const headers = ApiProject.getHeaders()
        let data = {
            section_id : this.props.data.section_id,
            stage_id : this.props.data.stage_id,
            object_id: this.props.data.object_id,
            project_id: this.props.data.object_data.project_data.id,
            template_id: this.state.selectedVersion,
            checkLists: this.props.checkLists
        }
        Axios.post('http://192.168.2.119:84/api/chosenTemplate', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)

            //Получить новый список чек-листов

            this.setState({
                version : <span> {this.state.versionText} </span>,
                versionDefault : this.state.versionText,
                control : <button className="btn btn-outline-secondary" onClick={this.fomationVersionList}> <FontAwesomeIcon icon={faPen} /> </button>
            })
            //this.getObjects()
        })
        .catch((error) => {
            console.log(error)
        })

    }

    selectVersion = (event) => {
        let versionKey = event.target.value
        let versionValue

        this.props.versions.filter(item => {
            if (item.id == versionKey){
                versionValue = item.version
            }
        })

        this.setState({
            selectedVersion : versionKey,
            versionText : versionValue,
        })
    }

    componentDidMount() {
        this.getSelectedVersion()
    }

    componentWillUnmount() {
    }

    setChosenTemplate = () => {


    }


    render(){
        /*let section, stage, version, maxVersion = this.props.maxVersion
        if (typeof this.state.selectedItem == "object"){
            section = this.state.selectedItem.section_short_name
            stage = this.state.selectedItem.stage_short_name
            version = this.state.selectedItem.version
        }*/

        return (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center project_templates-list">
                <div className="project_templates_list-section_name">
                    {this.props.data.section_short_name}
                </div>
                <div className="project_templates_list-stage_name">
                    {this.props.data.stage_short_name}
                </div>
                <div className="project_templates_list-object_short_name">
                    {this.props.data.object_name}
                </div>
                <div className="project_templates_list-version_current">
                    {this.state.version}
                </div>
                <div className="project_templates_list-version_max">
                    {this.state.maxVersion}
                </div>
                <div className="project_templates_list-control">
                    {this.state.control}
                </div>
            </div>
        )

    }
}

export default projectTemplate