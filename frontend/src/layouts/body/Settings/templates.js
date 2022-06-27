import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import ApiSettings from './../../../api/Settings'
import Template from './template.js'
import SettingsMenu from './../../../components/menu/settingsMenu'
import NewTemplate from './../../../components/modals/newTemplate'

class settingsTemplates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            templates : [],
            stages : [],
            sections : [],
            objectTypes : [],

            newTemplateVersion : "",
            newTemplateObjectType : null,
            newTemplateSection : null,
            newTemplateStage : null,

            informers : [],
            templatesKey : 0
        }
    }

    newObjectType = (event) => {
        this.setState({
            newTemplateObjectType : event.target.value
        })
    }
    newSection = (event) => {
        this.setState({
            newTemplateSection : event.target.value
        })
    }
    newStage = (event) => {
        this.setState({
            newTemplateStage : event.target.value
        })
    }
    newVersion = (event) => {
        this.setState({
            newTemplateVersion : event.target.value
        })
    }

    addTemplateMethod = (event) => {
        const data = {
            object_type_id: event.type,
            version: event.version,
            section_id: event.section,
            stage_id: event.stage,
        }

        const headers = ApiSettings.getHeaders()
        Axios.post('http://192.168.2.119:84/api/settingsTemplate', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data)
            this.getTemplates()
        })
    }

    addInformer = (message) => {
        let messageArray = []
        this.state.informers.filter(message => {
            messageArray.push(message)
        })
        messageArray.push(message)
        this.setState({informers:messageArray})
   }

   updateStatus = (item) => {

   }

    componentDidMount() {
        this.getTemplates()
    }

    componentWillUnmount() {

    }

    getTemplates = () => {
        ApiSettings.getTemplates()
        .then(response => {
            this.setState({
                templates : response.data.templates,
                objectTypes : response.data.objectTypes,
                sections : response.data.sections,
                stages : response.data.stages,
                templatesKey : this.state.templatesKey+1
            })
            console.log(response.data)
        })
    }


    render(){
            let templates = this.state.templates.map((template, key)=>{
                return (
                            <Template key={key+'-'+this.state.templatesKey}
                                        template={template}
                                        stages={this.state.stages}
                                        sections={this.state.sections}
                                        objectTypes={this.state.objectTypes}
                                        updateTemplates={this.getTemplates}/>

                       )
            })

            const selectTypesOptions = (
                this.state.objectTypes.map(
                    (type, key) => {
                        return (<option key={type.id} value={type.id}> {type.name} </option>)
                    }
                )
            )
            let selectTypes = (
                <select defaultValue="0" onChange={this.newObjectType}>
                    <option value="0" disabled> Не выбрано </option>
                    {selectTypesOptions}
                </select>
            )

            const selectStageOptions = (
                this.state.stages.map(
                    (stage, key) => {
                        return (<option key={stage.id} value={stage.id}> {stage.short_name} </option>)
                    }
                )
            )
            let selectStage = (
                <select defaultValue="0" onChange={this.newStage}>
                    <option value="0" disabled> Не выбрано </option>
                    {selectStageOptions}
                </select>
            )

            const selectSectionOptions = (
                this.state.sections.map(
                    (section, key) => {
                        return (<option key={section.id} value={section.id}> {section.short_name} </option>)
                    }
                )
            )
            let selectSection = (
                <select defaultValue="0" onChange={this.newSection}>
                    <option value="0" disabled> Не выбрано </option>
                    {selectSectionOptions}
                </select>
            )

            let addTemplate = (
                <NewTemplate addTemplate={this.addTemplateMethod} stageOptions={selectStageOptions} sectionOptions={selectSectionOptions} sectionOType={selectTypesOptions} />
            )

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="template_list-item-object_type_header">
                        Тип объекта
                    </div>
                    <div className="template_list-item-version_header">
                        Версия
                    </div>
                    <div className="template_list-item-section_header">
                        Раздел
                    </div>
                    <div className="template_list-item-stage_header">
                        Стадия
                    </div>
                    <div className="template_list-item-control_header">
                        Подтвердить
                    </div>
                </div>
            )

            let MainBlock = "col-12",
                SideBarBlock, sideBar, IndentLeft, IndentRight,
                Container = "container"

            if (sideBar){
                MainBlock = "col-8"
                IndentLeft = "col-1"
                IndentRight = "col-1"
                SideBarBlock = "col-2"
                Container = "container-fluid h-100"
            }

            let settingsMenu = <SettingsMenu key="0" selectedTab="0" />

            let mainContent = (
                <div className="container-templates cl-w80">
                    {settingsMenu}
                    {header}
                    <div className="block-settings-templates-list">
                        {templates}
                    </div>
                    {addTemplate}
                </div>
            )

            return (
                <div className={Container}>
                    <div className="row h-100">
                        <div className={SideBarBlock}>
                            {sideBar}
                        </div>
                        <div className={IndentLeft}>
                        </div>
                        <div className={MainBlock}>
                            {mainContent}
                        </div>
                        <div className={IndentRight}>
                        </div>
                    </div>
                </div>
            )
    }
}

export default settingsTemplates