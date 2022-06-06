import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import ApiSettings from './../../../api/Settings'
import Role from './role.js'
import SettingsMenu from './../../../components/menu/settingsMenu'
import SettingsStages from './lists/stages'
import SettingsSections from './lists/sections'
import SettingsObjectTypes from './lists/objectTypes'
import SettingsProjectTypes from './lists/projectTypes'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab} from 'react-bootstrap';

class settingsTemplates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabKey : 'project_types',
            stages : [],
            sections : [],
            objectTypes : [],
            projectTypes : [],
        }
    }

    componentDidMount() {
        ApiSettings.getStages()
        .then(res => {
            this.setState({stages : res.data.stages})
        })
        ApiSettings.getSections()
        .then(res => {
            this.setState({sections : res.data.sections})
        })
        ApiSettings.getObjectTypes()
        .then(res => {
            this.setState({objectTypes : res.data.objectTypes})
        })
        ApiSettings.getProjectTypes()
        .then(res => {
            this.setState({projectTypes : res.data.projectTypes})
        })
    }

    componentWillUnmount() {

    }

    setTabKey = (event) => {
        this.setState({
            tabKey : event
        })
    }

    render(){
            let settingsMenu = <SettingsMenu key="2" selectedTab="2" />

            let tabs  = (
                <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.tabKey}
                  onSelect={ (k) => this.setTabKey(k) }
                  className="mb-3"
                >
                  <Tab eventKey="stages" title="Этапы проектирования">
                        <SettingsStages key={this.state.stages.length} stages={this.state.stages} />
                  </Tab>
                  <Tab eventKey="sections" title="Разделы проектирования">
                        <SettingsSections key={this.state.sections.length} sections={this.state.sections} />
                  </Tab>
                  <Tab eventKey="object_types" title="Типы объектов">
                        <SettingsObjectTypes key={this.state.objectTypes.length} types={this.state.objectTypes} />
                  </Tab>
                  <Tab eventKey="project_types" title="Типы проектов">
                        <SettingsProjectTypes key={this.state.projectTypes.length} types={this.state.projectTypes} />
                  </Tab>
                </Tabs>
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

            let mainContent = (
                <div className="container-settings-roles cl-w80">
                    {settingsMenu}
                    {tabs}
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