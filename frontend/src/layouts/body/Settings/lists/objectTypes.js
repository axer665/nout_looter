import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'
import ObjectType from './objectType'

class settingsObjectTypes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            types : props.types
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_sections_list-item-name_header">
                        Наименование
                    </div>
                </div>
            )

            let types
            if (this.state.types)
                types = this.state.types.map((type, key) => {
                    return (<ObjectType key={key} type={type} />)
                })

            return (
                <div className="container-settings-lists-sections">
                    {header}
                    {types}
                </div>
            )
    }
}

export default settingsObjectTypes