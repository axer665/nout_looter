import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'
import Stage from './stage'

class settingsStages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stages : props.stages
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
                    return (<Stage key={key} stage={stage} />)
                })

            return (
                <div className="container-settings-lists-stages">
                    {header}
                    {stages}
                </div>
            )
    }
}

export default settingsStages