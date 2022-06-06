import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faList, faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../api/Settings'

class settingsTemplateVersion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            template : this.props.template,
            objectTypeName : this.props.template.template_object_types.name,
            sectionName : this.props.template.template_section.short_name,
            stageName : this.props.template.template_stage.short_name,

            disabled : false,
            checked : props.template.check,
            checkDisabled : null,

            version : this.props.template.version,
            versionText : this.props.template.version,
            defaultVersion : this.props.template.version,

            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                    <Link to={"/settings/template/"+this.props.template.id}>
                        <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faList} /></button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            ),

        }
        console.log(props)
    }

    newVersion = (event) => {
        this.setState({
            versionText : event.target.value,
            version : <input type="text" defaultValue={event.target.value} onChange={this.newVersion} />
        })
    }

    componentDidMount() {
        if (this.props.template.check_lists.length > 0){
            this.setState({
                checked : true,
                disabled : true,
                control : (
                    <span>
                        <span title="">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                        </span>
                        <Link to={"/settings/template/"+this.props.template.id}>
                            <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faList} /></button>
                        </Link>
                        <span title="По данному шаблону уже созданы чек-листы. Его изменение невозможно.">
                            <button type="button" className="btn btn-outline-danger" disabled><FontAwesomeIcon icon={faTrash} /></button>
                        </span>
                    </span>
                )
            })
        } else {
            this.setState({
                control : (
                    <span>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                        <Link to={"/settings/template/"+this.props.template.id}>
                            <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faList} /></button>
                        </Link>
                        <button type="button" className="btn btn-outline-danger" onClick={this.deleteTemplate}><FontAwesomeIcon icon={faTrash} /></button>
                    </span>
                )
            })
        }
    }

    componentWillUnmount() {

    }

    editTemplate = () => {
        this.setState({
            version : <input type="text" defaultValue={this.state.version} onChange={this.newVersion} />,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-primary" onClick={this.editOk}><FontAwesomeIcon icon={faCheck} /></button>
                    <button type="button" className="btn btn-outline-warning" onClick={this.editCancel}><FontAwesomeIcon icon={faXmark} /></button>
                    <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            )
        })
    }

    editOk = () => {
        const data = {
                version : this.state.versionText,
            }
        const headers = ApiSettings.getHeaders()

        Axios.put('http://192.168.160.62:84/api/updateSettingsTemplate/'+this.props.template.id, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
        })

        this.setState({
            version : this.state.versionText,
            control : (
                            <span>
                                <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                                <Link to={"/settings/template/"+this.props.template.id}>
                                    <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faList} /></button>
                                </Link>
                                <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                            </span>
                        )
        })
    }

    editCancel = () => {
            this.setState({
                version : this.state.defaultVersion,
                control : (
                    <span>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.editTemplate}><FontAwesomeIcon icon={faPen} /></button>
                        <Link to={"/settings/template/"+this.props.template.id}>
                            <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faList} /></button>
                        </Link>
                        <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
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
        Axios.put('http://192.168.160.62:84/api/updateSettingsTemplate/'+this.props.template.id, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
        })
    }

    deleteTemplate = () => {
        const headers = ApiSettings.getHeaders()
        Axios.delete('http://192.168.160.62:84/api/deleteSettingsTemplate/'+this.props.template.id, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.props.updateTemplateRoot()
        })
    }

    render(){
        return (
            <div className="d-flex flex-row bd-highlight mb-3 template_list-items justify-content-center">
                <div className="template_list-item-type">
                    {this.state.objectTypeName}
                </div>
                <div className="template_list-item-version">
                    {this.state.version}
                </div>
                <div className="template_list-item-section">
                    {this.state.sectionName}
                </div>
                <div className="template_list-item-stage">
                    {this.state.stageName}
                </div>
                <div className="template_list-item-check">
                    <input type="checkbox" checked={this.state.checked} disabled={this.state.disabled} onChange={this.checkOk} />
                </div>
                <div className="template_list-item-control">
                    {this.state.control}
                </div>
            </div>
        )
    }
}

export default settingsTemplateVersion