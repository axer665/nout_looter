import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'

class settingsSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            section : props.section
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){
        return (
            <div className="d-flex flex-row bd-highlight mb-3 container-list-settings_sections justify-content-center">
                <div className="s_sections_list-item-name">
                    { this.state.section.name }
                </div>
                <div className="s_sections_list-item-short_name">
                    { this.state.section.short_name }
                </div>
            </div>
        )
    }
}

export default settingsSection