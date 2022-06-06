import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'

class settingsStage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stage : props.stage,

            name : props.stage.name,
            nameText : props.stage.name,
            defaultName : props.stage.name,

            shortName : props.stage.short_name,
            shortNameText : props.stage.short_name,
            defaultShortName : props.stage.short_name,

            control : null
        }

    }

    newName = (event) => {
        this.setState({
            nameText : event.target.value,
            shortName : <input type="text" defaultValue={event.target.value} onChange={this.newVersion} />
        })
    }

    newShortName = (event) => {
        this.setState({
            shortNameText : event.target.value,
            name : <input type="text" defaultValue={event.target.value} onChange={this.newShortName} />
        })
    }

    editStage = () => {
        this.setState({
            name : <input type="text" defaultValue={this.state.name} onChange={this.newName} />,
            shortName : <input type="text" defaultValue={this.state.shortName} onChange={this.newShortName} />,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-primary" onClick={this.editOk}><FontAwesomeIcon icon={faCheck} /></button>
                    <button type="button" className="btn btn-outline-warning" onClick={this.editCancel}><FontAwesomeIcon icon={faXmark} /></button>
                </span>
            )
        })
    }

    editCancel = () => {
        this.setState({
            name : this.state.defaultName,
            shortName : this.state.defaultShortName,
            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editStage}><FontAwesomeIcon icon={faPen} /></button>
                    <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            )
        })
    }

    componentDidMount() {
        this.setState({
            control : (
                <span>
                    <button type="button" className="btn btn-outline-secondary" onClick={this.editStage}><FontAwesomeIcon icon={faPen} /></button>
                    <button type="button" className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button>
                </span>
            )
        })
    }

    componentWillUnmount() {

    }

    render(){
        return (
            <div className="d-flex flex-row bd-highlight mb-3 container-list-settings_stages justify-content-center">
                <div className="s_stages_list-item-name">
                    { this.state.name }
                </div>
                <div className="s_stages_list-item-short_name">
                    { this.state.shortName }
                </div>
                <div className="s_stages_list-item-control">
                    {this.state.control}
                </div>
            </div>
        )
    }
}

export default settingsStage