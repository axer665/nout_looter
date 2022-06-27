import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProject from './../../api/Projects'
import ProjectTemplate from './projectTemplate'

class projectTemplates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            templates : [],
        }

    }

    getTemplates = () => {
        ApiProject.getProjectTemplates({projectId : this.props.projectId})
        .then(response => {
            console.log(response.data)
            this.setState({
                templates : response.data.templatesArr
            })
        })
    }

    componentDidMount() {
        this.getTemplates()
    }

    componentWillUnmount() {

    }



    render(){

        let templates = this.state.templates.map((data, key) => {
            return <ProjectTemplate key={key} data={data.template} versions={data.versions} checkLists={data.checkList} chosenTemplate={data.chosen} />
        })

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center project_templates-lists-header container-lists-header">
                <div className="project_templates_list-section_name_header">
                    Раздел
                </div>
                <div className="project_templates_list-stage_name_header">
                    Стадия
                </div>
                <div className="project_templates_list-object_short_name_header">
                    Объект
                </div>
                <div className="project_templates_list-version_current_header">
                    Версия текущая
                </div>
                <div className="project_templates_list-version_max_header">
                    Версия доступная
                </div>
            </div>
        )

        return (
            <div className="project_templates-lists">
                {header}
                <div className="block-project_templates-lists">
                    {templates}
                </div>
            </div>
        )

    }
}

export default projectTemplates