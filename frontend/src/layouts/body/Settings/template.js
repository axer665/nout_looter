import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faList, faXmark, faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import ApiSettings from './../../../api/Settings'
import TemplateVersion from './templateVersion'

class settingsTemplates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.template.id,
            objectTypeId : this.props.template.object_type_id,
            sectionId : this.props.template.section_id,
            stageId : this.props.template.stage_id,

            objectTypeName : this.props.template.template_object_types.name,
            sectionName : this.props.template.template_section.short_name,
            stageName : this.props.template.template_stage.short_name,

            selectedObjectTypeId : this.props.template.object_type_id,
            selectedSectionId : this.props.template.section_id,
            selectedStageId : this.props.template.stage_id,
            selectedObjectTypeName : this.props.template.template_object_types.name,
            selectedSectionName : this.props.template.template_section.short_name,
            selectedStageName : this.props.template.template_stage.short_name,

            defaultObjectTypeName : this.props.template.template_object_types.name,
            defaultSectionName : this.props.template.template_section.short_name,
            defaultStageName : this.props.template.template_stage.short_name,

            version : this.props.template.version,
            versionText : this.props.template.version,
            defaultVersion : this.props.template.version,

            checkDisabled : null,
            checked : this.props.template.check,

            disabled : false,

            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                    <Link to={"/settings/template/"+this.props.template.id}>
                        <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faList} /></button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            ),

            versions : this.props.template.children_templates,
            versionsKey : 1
        }
        console.log(this.props)
    }

    editTemplate = () => {
        const selectObjectTypesOptions = (
            this.props.objectTypes.map(
                (type, key) => {
                    return (<option key={type.id} value={type.id}> {type.name} </option>)
                }
            )
        )
        let selectObjectTypes = (
            <select defaultValue={this.state.objectTypeId} onChange={this.newObjectType}>
                {selectObjectTypesOptions}
            </select>
        )

        const selectStageOptions = (
            this.props.stages.map(
                (stage, key) => {
                    return (<option key={stage.id} value={stage.id}> {stage.short_name} </option>)
                }
            )
        )
        let selectStage = (
            <select defaultValue={this.state.stageId} onChange={this.newStage}>
                {selectStageOptions}
            </select>
        )

        const selectSectionOptions = (
            this.props.sections.map(
                (section, key) => {
                    return (<option key={section.id} value={section.id}> {section.short_name} </option>)
                }
            )
        )
        let selectSection = (
            <select defaultValue={this.state.sectionId} onChange={this.newSection}>
                {selectSectionOptions}
            </select>
        )

        this.setState({
            objectTypeName : selectObjectTypes,
            stageName : selectStage,
            sectionName : selectSection,
            version : <input type="text" defaultValue={this.state.version} onChange={this.newVersion} />,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-primary" onClick={this.editOk}><FontAwesomeIcon icon={faCheck} /></button>
                    <button type="button" className="btn btn-outline-warning" onClick={this.editCancel}><FontAwesomeIcon icon={faXmark} /></button>
                </span>
            )
        })
    }

    checkOk = (event) => {
        let param = 0
        if (event.target.checked){
            param = 1
        }

        if (param)
            this.setState({
                checked : true
            })
        else
            this.setState({
                checked : false
            })

        const data = {
                    "check" : param
                }
        const headers = ApiSettings.getHeaders()

        console.log(event.target.checked)
        Axios.put('http://192.168.2.119:84/api/updateSettingsTemplate/'+this.props.template.id, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
        })
    }

    editOk = () => {

        const data = {
                object_type_id : this.state.selectedObjectTypeId,
                section_id : this.state.selectedSectionId,
                stage_id : this.state.selectedStageId,
                /*version : this.state.versionText,*/
            }
        const headers = ApiSettings.getHeaders()

        Axios.put('http://192.168.2.119:84/api/updateSettingsTemplate/'+this.props.template.id, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.props.updateTemplates()
        })

        let objectTypeName, stageName, sectionName
        this.props.objectTypes.map(type => {
            if (type.id == this.state.selectedObjectTypeId){
                objectTypeName = type.name
            }
        })
        this.props.stages.map(stage => {
            if (stage.id == this.state.selectedStageId){
                stageName = stage.short_name
            }
        })
        this.props.sections.map(section => {
            if (section.id == this.state.selectedSectionId){
                sectionName = section.short_name
            }
        })
        this.setState({
            objectTypeName : objectTypeName,
            sectionName : sectionName,
            stageName : stageName,
            version : this.state.versionText,
            control : (
                            <span>
                                <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                                <span>
                                    <button type="button" className="btn btn-outline-success" onClick={this.copyTemplate}><FontAwesomeIcon icon={faCopy} /></button>
                                </span>
                            </span>
                        )
        })
    }

    editCancel = () => {
        this.setState({
            objectTypeName : this.state.defaultObjectTypeName,
            stageName : this.state.defaultStageName,
            sectionName : this.state.defaultSectionName,
            version : this.state.defaultVersion,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                    <span>
                        <button type="button" className="btn btn-outline-success" onClick={this.copyTemplate}><FontAwesomeIcon icon={faCopy} /></button>
                    </span>
                </span>
            )
        })
    }

    newObjectType = (event) => {
        this.setState({
            selectedObjectTypeId : event.target.value
        })
    }
    newStage = (event) => {
        this.setState({
            selectedStageId : event.target.value
        })
    }
    newSection = (event) => {
        this.setState({
            selectedSectionId : event.target.value
        })
    }
    newVersion = (event) => {
        this.setState({
            versionText : event.target.value,
            version : <input type="text" defaultValue={event.target.value} onChange={this.newVersion} />
        })
    }

    copyTemplate = (template) => {
        let headers = ApiSettings.getHeaders()

        let templateId = this.props.template.id
        this.state.versions.filter(version => {
            if (version.id > templateId){
                templateId = version.id
            }
        })

        let data = {
            'templateId' : templateId,
        }
        Axios.post('http://192.168.2.119:84/api/createTemplateVersion', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.props.updateTemplates()
        })
    }

    componentDidMount() {
        //console.log(this.props.template.check_lists)
        /*let copyButton
        if (!this.props.template.parent_id) {
            copyButton = (
                <span>
                    <button type="button" className="btn btn-outline-success" onClick={this.copyTemplate}><FontAwesomeIcon icon={faCopy} /></button>
                </span>
            )
        }*/

        if (this.props.template.check_lists.length > 0){
            this.setState({
                checked : true,
                disabled : true,
                control : (
                    <span>
                        <span title="По данному шаблону уже созданы чек-листы. Его изменение невозможно.">
                            <button type="button" className="btn btn-outline-secondary" disabled><FontAwesomeIcon icon={faPen} /></button>
                        </span>
                        <span>
                            <button type="button" className="btn btn-outline-success" onClick={this.copyTemplate}><FontAwesomeIcon icon={faCopy} /></button>
                        </span>
                    </span>
                )
            })
        } else {
            this.setState({
                control : (
                    <span>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                        <span>
                            <button type="button" className="btn btn-outline-success" onClick={this.copyTemplate}><FontAwesomeIcon icon={faCopy} /></button>
                        </span>
                    </span>
                )
            })
        }
        //console.log(this.props)
    }

    componentWillUnmount() {

    }

    reloadTemplate = () => {
        this.props.updateTemplates()
    }

    render(){

            let versions = this.state.versions.map((version, key) => {
                return (<TemplateVersion key={key} template={version.template_info} updateTemplateRoot={this.reloadTemplate} />)
            })

            return(
            <>
                <div className="d-flex flex-row bd-highlight mb-3 template_list-items justify-content-center">
                    <div className="template_list-item-type">
                        {this.state.objectTypeName}
                    </div>
                    <div className="template_list-item-version">
                        Кол-во версий : {
                            this.state.versions.length
                            //this.state.version
                        }
                    </div>
                    <div className="template_list-item-section">
                        {this.state.sectionName}
                    </div>
                    <div className="template_list-item-stage">
                        {this.state.stageName}
                    </div>
                    <div className="template_list-item-check">
                        <input type="checkbox"  disabled="disabled" onChange={this.checkOk} />
                    </div>
                    <div className="template_list-item-control">
                        {this.state.control}
                    </div>
                </div>
                <div className="template_list-item-versions">
                    {versions}
                </div>
            </>
            )
    }
}

export default settingsTemplates