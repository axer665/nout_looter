import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiObj from './../../api/Objects'

class projectInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            object : this.props.object,
        }
        //this.getObjectData()
    }


   componentDidMount() {
   }

   componentWillUnmount() {
   }

    getObjectData = () => {
        ApiObj.getObjectData({objectId:this.state.object.id})
        .then(response => {
            console.log(response.data.objects)
        })
    }

    render(){

        let type = "<Не указано>"
        if (this.state.object.object_type){
            type = this.state.object.object_type.name
        }

        return(
            <tr>
                <td>
                    {type}
                </td>
                <td>
                    {this.state.object.name}
                </td>
            </tr>
        )

    }
}

export default projectInfo