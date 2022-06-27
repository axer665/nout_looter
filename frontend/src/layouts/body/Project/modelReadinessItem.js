import React from 'react'
import Axios from 'axios'
import {Link, Navigate} from 'react-router-dom'
//

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import Menu from './../../../components/menu/sideBarMenu'
import ApiModel from './../../../api/Models'
import history from './../../../components/history';

class modelReadinessItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            objectData : this.props.objectData,
            sectionData : this.props.stageData,
            stageData : this.props.stageData,
            id : this.props.id,
            name : this.props.name,
            footnote : this.props.footnote,
            checkLists : this.props.checkLists,
            templates : this.props.templates,
            projectData : this.props.objectData.project_data,
            chosenTemplates : this.props.chosenTemplates,
            defaultTemplate : this.props.defaultTemplate,
            selectedCheckList : null,
            redirectToCheckList : false,
            date : null,
        }
        //console.log(this.state)

    }


    componentDidMount() {
        this.maxDate()
    }

    componentWillUnmount() {
    }

    maxDate = () => {
        let maxDate = new Date('2000-01-01 00:00:00'),
            selectedCheckList = null

        if (this.state.checkLists.length > 0){
            this.state.checkLists.map(list => {
                selectedCheckList = list.id
                if (list.confirmed_criterion){
                    if (new Date(list.confirmed_criterion.date) > maxDate){
                        maxDate = list.confirmed_criterion.date
                    }
                } else {
                    maxDate = 0
                }
            })
        } else {
            maxDate = 0
        }

        this.setState({
            date : maxDate,
            selectedCheckList : selectedCheckList
        })
    }

    createCheckList = () => {
        let templateId //= this.state.templates[0].id
        if (this.state.chosenTemplates[0].template_data){
            templateId = this.state.chosenTemplates[0].chosen_template_id
        } else if ( this.state.defaultTemplate ){
            templateId = this.state.defaultTemplate.template_id
        }

        if (templateId){
            let data = {
                template_id : templateId,
                model_id : this.state.id,
                section_id : this.state.sectionData.id,
                stage_id : this.state.stageData.id,
                object : this.state.objectData
            }


            const headers = ApiModel.getHeaders()
            Axios.post('http://192.168.2.119:84/api/createCheckList', data, {
                headers: headers
            })
            .then((response) => {
                //console.log(response.data)
                if (response.data.checkList){
                    this.setState({
                        redirectToCheckList : true,
                        selectedCheckList : response.data.checkList.id
                    })
                }
            })
        }
    }

    render(){
        let object, objectType, checkLists="no"
        if (this.state.objectData){
            object = this.state.objectData.name
            if (this.state.objectData.object_type)
                objectType = this.state.objectData.object_type.name
        }
        if (this.state.checkLists.length){
            checkLists = "yes"
        }

        if (this.state.redirectToCheckList){
            let path = "/checkList/"+this.props.projectId+'/'+this.state.selectedCheckList
            return (
                <Navigate to={path} />
                )
        } else {
            let control;
            let templatesCount = 0;
            if (this.state.chosenTemplates.length > 0){
                this.state.chosenTemplates.filter(temp => {
                    if (temp.template_data)
                        templatesCount++
                })
            }
            let modelAddClass = "d-flex flex-row bd-highlight mb-3 models_view_list-item justify-content-center checkFalse"
            let title
            if (this.state.defaultTemplate){
                control = <button onClick={this.createCheckList}> add </button>
                modelAddClass = "d-flex flex-row bd-highlight mb-3 models_view_list-item justify-content-center checkTrue"
                title = "Для этой модели ещё нет шаблона чек-листа. Свяжитесь с Менеджером или Администратором, чтобы кто-то из них исправил этот недочет"
            } else if (templatesCount > 0){
                control = <button onClick={this.createCheckList}> add </button>
                modelAddClass = "d-flex flex-row bd-highlight mb-3 models_view_list-item justify-content-center checkTrue"
            }
            return(

                <div className={modelAddClass} onClick={this.createCheckList} title={title}>
                    <div className="models_view_list-object_name">
                        {object}
                    </div>
                    <div className="models_view_list-object_type">
                        {objectType}
                    </div>
                    <div className="models_view_list-model_stage">
                        {this.state.stageData.short_name}
                    </div>
                    <div className="models_view_list-model_name">
                        {this.state.name}
                    </div>
                    <div className="models_view_list-date">
                        {this.state.date}
                    </div>
                    {/*control*/}
                </div>

            )
        }
    }
}

export default modelReadinessItem