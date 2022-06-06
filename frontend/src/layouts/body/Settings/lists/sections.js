import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'
import Section from './section'

class settingsSections extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sections : props.sections
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    setTabKey = (event) => {
        this.setState({
            tabKey : event
        })
    }

    render(){

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_sections_list-item-name_header">
                        Наименование полное
                    </div>
                    <div className="s_sections_list-item-short_name_header">
                        Наименование краткое
                    </div>
                </div>
            )

            let sections
            if (this.state.sections)
                sections = this.state.sections.map((section, key) => {
                    return (<Section key={key} section={section} />)
                })

            return (
                <div className="container-settings-lists-sections">
                    {header}
                    {sections}
                </div>
            )
    }
}

export default settingsSections