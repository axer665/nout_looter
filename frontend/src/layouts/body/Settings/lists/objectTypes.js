import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ApiSettings from './../../../../api/Settings'
import ObjectType from './objectType'
import NewObjectType from './../../../../components/modals/newObjectType'

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

    newObjectType = (event) => {
        console.log(event)
        const data = {
            'name': event.name,
        }

        const headers = ApiSettings.getHeaders()
        Axios.post('http://192.168.2.119:84/api/newSettingsObjectType', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.rerender()
        })
    }

    rerender = () => {
        this.props.getObjectTypes()
    }

    render(){

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_object_types_list-item-name_header">
                        Наименование
                    </div>
                </div>
            )

            let types
            if (this.state.types)
                types = this.state.types.map((type, key) => {
                    return (<ObjectType key={key} getObjectTypes={this.rerender} type={type} />)
                })
            let addSection = (
                    <NewObjectType addObjectType={this.newObjectType} />
                )

            return (
                <div className="container-settings-lists-object_types">
                    {header}
                    <div className="block-settings-lists-object_types">
                        {types}
                    </div>
                    {addSection}
                </div>
            )
    }
}

export default settingsObjectTypes