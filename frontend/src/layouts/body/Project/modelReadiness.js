import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import Menu from './../../../components/menu/sideBarMenu'
import ApiModel from './../../../api/Models'
import ModelReadinessItem from './modelReadinessItem'

class modelReadiness extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: [],
            selectedObject: null,
            selectedObjectType: null,
            selectedStage: null,
        }
        //console.log('READINESS PROPS : ')
        //console.log(props)
    }


    componentDidMount() {
        this.getModels()
    }

    componentWillUnmount() {
    }

    getModels = () => {
        ApiModel.getModels({'projectId': this.props.projectId, 'userId': this.props.user.id, 'getCheckLists':true, 'getTemplates':true})
        .then(response => {
            //console.log(response.data)
            this.setState({
                models : response.data.models
            })
        })
    }

    render(){
        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className="models_view_list-object_name_header">
                    Объект
                </div>
                <div className="models_view_list-object_type_header">
                    Тип объекта
                </div>
                <div className="models_view_list-model_stage_header">
                    Стадия
                </div>
                <div className="models_view_list-model_name_header">
                    Наименование модели
                </div>
                <div className="models_view_list-date_header">
                    Дата
                </div>
            </div>
        )
        let models = this.state.models.map((model, key) => {
            return (<ModelReadinessItem
                        key={key}
                        projectId={this.props.projectId}
                        objectData={model.model_object}
                        sectionData={model.model_section}
                        stageData={model.model_stage}
                        id={model.id}
                        name={model.name}
                        footnote={model.footnote}
                        checkLists={model.model_check_lists}
                        templates={model.model_templates}
                        chosenTemplates={model.chosen_templates}
                        defaultTemplate={model.default_template}
                        />)
        })

        return(
            <div className="container-models-view-list">
                {header}
                {models}
            </div>
        )

    }
}

export default modelReadiness