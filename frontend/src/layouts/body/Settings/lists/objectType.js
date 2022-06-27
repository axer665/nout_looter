import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'

class settingsObjectType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type : props.type,

            name : props.type.name,
            nameText : props.type.name,
            defaultName : props.type.name,

            control : null,
        }
    }

    newName = (event) => {
        this.setState({
            nameText : event.target.value,
            shortName : <input type="text" defaultValue={event.target.value} onChange={this.newName} />
        })
    }

    editType = () => {
        this.setState({
            name : <input type="text" defaultValue={this.state.name} onChange={this.newName} />,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-primary" onClick={this.editOk}><FontAwesomeIcon icon={faCheck} /></button>
                    <button type="button" className="btn btn-outline-warning" onClick={this.editCancel}><FontAwesomeIcon icon={faXmark} /></button>
                </span>
            )
        })
    }

    editOk = () => {
        const data = {
           'name' : this.state.nameText,
        }

        const headers = ApiSettings.getHeaders()

        Axios.put('http://192.168.2.119:84/api/updateSettingsObjectType/'+this.state.type.id, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                name : this.state.nameText,
                control : (
                    <span>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.editType}><FontAwesomeIcon icon={faPen} /></button>
                        <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                    </span>
                )
            })
        })
    }

    editCancel = () => {
        this.setState({
            name : this.state.defaultName,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editType}><FontAwesomeIcon icon={faPen} /></button>
                    <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            )
        })
    }

    deleteType = () => {
        const data = {
            id: this.state.type.id
        }
        const headers = ApiSettings.getHeaders()

        Axios.delete('http://192.168.2.119:84/api/settingsObjectType/'+data.id, {headers : headers, data : data})
        .then((response) => {
            console.log(response.data)
            this.props.getObjectTypes()
        })
    }

    componentDidMount() {
        this.setState({
            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editType}><FontAwesomeIcon icon={faPen} /></button>
                    <button type="button" className="btn btn-outline-danger" onClick={this.deleteType}><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            )
        })
    }

    componentWillUnmount() {

    }

    render(){
        return (
            <div className="d-flex flex-row bd-highlight mb-3 container-list-settings_object_types justify-content-center">
                <div className="s_object_types_list-item-name">
                    { this.state.name }
                </div>
                <div className="s_object_types_list-item-control">
                    { this.state.control }
                </div>
            </div>
        )
    }
}

export default settingsObjectType