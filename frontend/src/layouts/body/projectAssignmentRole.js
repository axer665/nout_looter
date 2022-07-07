import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'

class projectAssignment extends React.Component {
    constructor(props) {
        super(props)

        let selectedRoles = []
        this.props.selectedRoles.map(selectedRole => {
            if (selectedRole)
            selectedRoles.push(selectedRole.id)
        })
        let availableRoles = []
        availableRoles.push(this.props.role)
        //let roles = selectedRoles.concat(this.props.currentRoles)
        //console.log(selectedRoles)
        this.props.roles.filter(role => {
            if (selectedRoles.includes(role.id)){
            } else {
                availableRoles.push(role)
            }
        })

        //console.log(availableRoles)
        //console.log('currentRoles : ')
        //console.log(props.currentRoles)
        //console.log(this.props.roles)
        let currentRoles = []
        currentRoles.push(this.props.role)
        let roles = currentRoles.concat(this.props.currentRoles)

        this.state = {
            role : this.props.role,
            roles : /*this.props.currentRoles,*/ roles, //availableRoles,
            currentRoles : this.props.currentRoles,
            selectedRole : this.props.selectedRole,

            availableRoles : this.props.availableRoles,

            value : null,
            valueText : null,
            defaultValue : null,
            defaultId : null,

            edit : this.props.edit,

            selectedRoles : this.props.selectedRoles,

            localKey : 1,
        }
    }


    componentDidMount() {

        //console.log(this.props.currentRoles)

        if (this.state.role){
            this.setState({
                value : this.state.role.name,
                valueText : this.state.role.name,
                defaultValue : this.state.role.name,
                defaultId : this.state.role.id,
            })
        }

        if (this.state.edit == "edit"){
            this.edit()
        } else if (this.state.edit == "ok"){
            this.editOk()
        }

        let returnRole = {
            key : this.props.number,
            role : this.state.role
        }
        this.props.sendData(returnRole)

    }

    componentWillUnmount() {

    }

    edit = () => {
        let select
        let options
        let defaultText
        if (this.state.role.name)
            defaultText = this.state.role.name
        else
            defaultText = "<Роль в проекте не назначена>"

        let defaultValue = 0
        let roles = [this.state.role].concat(this.state.availableRoles)
        //console.log(roles)
        //console.log(this.state.availableRoles)
        options = roles.map( (role) => {
            let selected = (
                <option key={role.id} value={role.id} >
                     {role.name}
                </option>
            )
            if (role.name == defaultText){
                defaultValue = role.id
            }

            return (
                selected
            )
        })

        let localKey = this.state.localKey+1+Math.random()

        select = <select key={localKey} defaultValue={defaultValue} onChange={this.select}> {options} </select>

        this.setState({
            value : select,
            valueText : defaultText,
            selectedRole : defaultValue,

            editRoles : true,
        })
    }

    editOk = () => {
        console.log(this.state)
    }

    select = (event) => {
        let statusKey = event.target.value
        let statusValue

        //this.props.returnAssignment(this.state.role)

        for (const [key, value] of Object.entries(this.state.roles)) {
            if (value.id == statusKey){
                statusValue = value.name
            }
        }
        this.setState({
            selectedRole : statusKey,
            valueText : statusValue,
        })

        let update = {
            'key' : this.props.number,
            'id' : this.state.role.id,
            'value' : statusKey,
            'short_name' : statusValue
        }
        this.props.updateRole(update)

        let returnRole = {
            key : this.props.number,
            role : this.state.role,
            trigger : 'selectRole',
            firstRole : this.state.defaultId
        }
        this.props.sendData(returnRole)
        //console.log('current roles : ')
        //console.log(this.state)
    }

    delete = () => {
        this.props.deleteRole(this.state.role)
    }

    render(){
        let deleteButton
        if (this.state.edit == "edit"){
            deleteButton = (
                <span className="small-icon text-red" onClick={this.delete}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            )
        }

        return(
            <div className="project-assignment-role">
                {this.state.value}
                {deleteButton}
            </div>
        )
    }
}

export default projectAssignment