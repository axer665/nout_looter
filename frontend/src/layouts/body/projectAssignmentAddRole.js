import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'

class projectAssignmentAddRole extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roles : props.roles,
            role : [props.role],
            roleObj : props.role,
            value : null,

            currentRoles: props.currentRoles
        }

        //console.log(props.item)
    }


    componentDidMount() {
        this.edit()
        let returnRole = {
            key : this.props.number,
            role : this.state.roleObj
        }
        this.props.sendData(returnRole)
    }

    componentWillUnmount() {

    }

    edit = () => {
        let select
        let options
        let roles = this.state.role.concat(this.state.currentRoles)

        let defaultValue = 0
        if (this.props.item){
            defaultValue = this.props.item.role.id
        }

        options = roles.map( (role) => {
            let selected = (
                <option key={role.id} value={role.id} >
                     {role.name}
                </option>
            )
            return (
                selected
            )
        })
        select = <select defaultValue={defaultValue} onChange={this.select}> {options} </select>
        this.setState({
            value : select
        })
    }

    select = (event) => {
        console.log(event.target.value)
        console.log(this.state.roles)



        let currentRole =  this.state.roles.find(role => role.id == event.target.value)

        this.setState({
            roleObj : currentRole
        })
        let returnRole = {
            key : this.props.number,
            role : currentRole,
            trigger : "addRole",
            myRole : this.state.roleObj,
        }
        this.props.sendData(returnRole)
        //this.props.returnAssignment(this.state.role)
    }

    editOk = () => {
        console.log(this.state)
    }

    render(){
        return(
            <div>
                {this.state.value}
            </div>
        )
    }
}

export default projectAssignmentAddRole