import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'

class settingsObjectType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type : props.type
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){
        return (
            <div className="d-flex flex-row bd-highlight mb-3 container-list-settings_sections justify-content-center">
                <div className="s_object_types_list-item-name">
                    { this.state.type.name }
                </div>
            </div>
        )
    }
}

export default settingsObjectType