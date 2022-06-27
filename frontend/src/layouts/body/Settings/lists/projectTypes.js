import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'

import ApiSettings from './../../../../api/Settings'
import ProjectType from './projectType'
import NewProjectType from './../../../../components/modals/newProjectType'

class settingsProjectTypes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            types : props.types,

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    newProjectType = (event) => {
        console.log(event)
        const data = {
            'name': event.name,
        }

        const headers = ApiSettings.getHeaders()
        Axios.post('http://192.168.2.119:84/api/newSettingsProjectType', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.rerender()
        })
    }

    rerender = () => {
        this.props.getProjectTypes()
    }

    render(){

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_project_types_list-item-name_header">
                        Наименование
                    </div>
                </div>
            )

            var types = []
            if (this.state.types)
                types = this.state.types.map((type, key) => {
                    return (<ProjectType key={key} getProjectTypes={this.rerender} type={type} />)
                })
            let addProjectType = (
                <NewProjectType addProjectType={this.newProjectType} />
            )


            return (
                <div className="container-settings-lists-project_types">
                    {header}
                    <div className="block-settings-lists-project_types">
                        {types}
                    </div>
                    {addProjectType}
                </div>
            )
    }
}

export default settingsProjectTypes