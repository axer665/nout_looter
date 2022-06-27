import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'
import Section from './section'
import NewSection from './../../../../components/modals/newSection'

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

    newSection = (event) => {
        console.log(event)
        const data = {
            'name': event.name,
            'short_name': event.shortName,
        }

        const headers = ApiSettings.getHeaders()
        Axios.post('http://192.168.2.119:84/api/newSettingsSection', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.rerender()
        })
    }

    rerender = () => {
        this.props.getSections()
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
                    return (<Section key={key} getSections={this.rerender} section={section} />)
                })
            let addSection = (
                    <NewSection addSection={this.newSection} />
                )

            return (
                <div className="container-settings-lists-sections">
                    {header}
                    <div className="block-settings-lists-sections">
                        {sections}
                    </div>
                    {addSection}
                </div>
            )
    }
}

export default settingsSections