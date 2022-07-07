import React from 'react'

import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ProjectParam from './projectParam'
import ApiProj from './../../api/Projects'

class projectParams extends React.Component {
    constructor(props) {
        super(props)
        let analyzer = null
        let desiredParams = [
            'code',
            'short_name',
            'name',
            'type',
            'status',
            'image'
        ]
        Object.keys(this.props).filter( ( key ) =>{
            if (this.keyComparison(this.props[key], desiredParams)){
                analyzer = this.props
            }
        })
        this.state = {
            params : analyzer,
            projectTypes : this.props.types,
            projectStatuses : this.props.statuses,
            trigger : this.props.trigger,
        }

    }


   componentDidMount() {

   }

   componentWillUnmount() {
   }

   keyComparison = (key, array) => {
        let result = false
        array.filter( id => {
            if (key == id){
                result = key
            }
        } )
        return result
   }

    render(){
        let id = null
        let value = null
        let name = null

        let params = this.state.params

        if (params){
            id = params.id
            name = params.name
            if (typeof  params.value !== 'object'){
                value = params.value
            } else{
                if  (params.value){
                    if (params.value.value){
                        value = params.value.value
                    } else if (params.value.name){
                        value = params.value.name
                    }
                }
            }
        }

        if (id){
            let edit = false
            if ( this.state.trigger == "edit"){
                edit = true
            }

            return(
                <div className="container-parameters-item">
                    <ProjectParam projectId={this.props.projectId}
                        name={id}
                        value={value}
                        keyName={name}
                        keyType={params.type}
                        types={this.state.projectTypes}
                        statuses={this.state.projectStatuses}
                        //edit={edit}
                    />
                </div>
            )
        } else {
            return null
        }

    }
}

export default projectParams