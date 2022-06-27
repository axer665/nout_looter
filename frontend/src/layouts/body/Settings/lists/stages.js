import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'
import Stage from './stage'
import NewStage from './../../../../components/modals/newStage'

class settingsStages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stages : props.stages,
            localKey : 0
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

    newStage = (event) => {
        console.log(event)
        const data = {
            'name': event.name,
            'short_name': event.shortName,
        }

        const headers = ApiSettings.getHeaders()
        Axios.post('http://192.168.2.119:84/api/newSettingsStage', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.rerender()
        })
    }

    rerender = () => {
        this.props.getStages()
    }

    render(){

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_stages_list-item-name_header">
                        Наименование полное
                    </div>
                    <div className="s_stages_list-item-short_name_header">
                        Наименование краткое
                    </div>
                </div>
            )

            let stages
            if (this.state.stages)
                stages = this.state.stages.map((stage, key) => {
                    return (<Stage key={key} getStages={this.rerender} stage={stage} />)
                })

            let addStage = (
                <NewStage addStage={this.newStage} />
            )

            return (
                <div className="container-settings-lists-stages">
                    {header}
                    <div className="block-settings-lists-stages">
                        {stages}
                    </div>
                    {addStage}
                </div>
            )
    }
}

export default settingsStages