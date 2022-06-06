import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'
import ProjectAssignmentRole from './projectAssignmentRole'
import NewRole from './projectAssignmentAddRole'

class projectAssignment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignment : this.props.assignment,
            roles : this.props.roles,
            selectRoles : this.props.assignment.roles_data,

            checkDisabled : null,
            checked : this.props.assignment.check,

            editRoles : 'start',

            value : null,
            valueText : null,
            defaultValue : null,
            selectedRole : 0,

            selectedRoles : [],
            addRoles : [],
            availableRoles : [],
            prohibitedRoles : [],

            allSelectedRoles : [],

            localKey : 0,

            addRole : null,

            control : (
                <span>
                    <button type="button" className="btn btn-outline-primary" onClick={ this.edit }> <FontAwesomeIcon icon={faPen} /> </button>
                    <button type="button" className="btn btn-outline-danger" onClick={ this.deleteAssignment }> <FontAwesomeIcon icon={faTrash} /> </button>
                </span>
            )
        }
    }


    componentDidMount() {
        //console.log(this.state.selectRoles)
        let selectedRolesIds = []
        this.state.selectRoles.map(role => {
            selectedRolesIds.push(role.id)
        })
        let availableRoles = []
        this.state.roles.map(role => {
            if (!selectedRolesIds.includes(role.id)){
                availableRoles.push(role)
            }
        })
        //console.log(availableRoles)
        this.setState({
            availableRoles : availableRoles
        })
    }

    componentWillUnmount() {
    }

    checkOk = (event) => {

        let param = 0
        if (event.target.checked){
            param = 1
        }

        if (param)
            this.setState({
                checked : true
            })
        else
            this.setState({
                checked : false
            })

        const data = {
                    assignmentId : this.state.assignment.id,
                    param : 'check',
                    value : param
                }
        const headers = ApiProj.getHeaders()

        Axios.put('http://192.168.160.62:84/api/updateProjectAssignment/'+this.props.assignment.id, data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data)
        })
    }

    edit = () => {
        let select
        let options
        let defaultText
        if (this.state.assignment.role_data)
            defaultText = this.state.valueText
        else
            defaultText = "<Роль в проекте не назначена>"

        let defaultValue = 0
        options = this.state.roles.map( (role) => {
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
        select = <select defaultValue={defaultValue} onChange={this.select}> {options} </select>

        this.setState({
            value : select,
            valueText : defaultText,
            selectedRole : defaultValue,

            editRoles : "edit",

            addRole : <button onClick={this.addRole}> add </button>,

            control : (
                       <span>
                           <button type="button" className="btn btn-outline-success" onClick={ this.selectOk }>
                               <FontAwesomeIcon icon={faCheck} />
                           </button>
                           <button type="button" className="btn btn-outline-danger" onClick={ this.selectCancel }>
                               <FontAwesomeIcon icon={faXmark} />
                           </button>
                       </span>
                     )
        })
    }

    updateRole = (event) => {

        let arrRoles = []

        this.state.selectedRoles.filter((roleId, key) => {
            if (roleId == event.id && key == event.key){
                arrRoles.push(Number(event.value))
            } else {
                arrRoles.push(roleId)
            }
        })

        let test = this.state.selectRoles.filter(role => {
            if (role.id == event.id){
                role.id = Number(event.value)
                role.name = event.short_name
            }
            return role
        })

        this.setState({
            selectedRoles : arrRoles,
            selectRoles : test
        })

    }

    selectOk = () => {
        let selectedRolesIds = []
        this.state.selectRoles.map(item => {
            selectedRolesIds.push(item.id)
        })

        let selectedRoles = {"list":selectedRolesIds}
        const data = {
            assignmentId : this.state.assignment.id,
            param : "roles_ids",
            value : selectedRoles
        }
        const headers = ApiProj.getHeaders()

        Axios.put('http://192.168.160.62:84/api/updateProjectAssignment/'+this.props.assignment.id, data, {
            headers: headers
        })
        .then((response) => {
            this.setState({
                value : this.state.valueText,
                checkDisabled : false,
                defaultValue : this.state.valueText,

                editRoles: "ok",
                addRole : null,

                control : (
                    <span>
                        <button type="button" className="btn btn-outline-primary" onClick={ this.edit }> <FontAwesomeIcon icon={faPen} /> </button>
                        <button type="button" className="btn btn-outline-danger" onClick={ this.deleteAssignment }> <FontAwesomeIcon icon={faTrash} /> </button>
                    </span>
                )
            })
            console.log(this.state.allSelectedRoles)
        })
    }

    selectCancel = () => {
        this.setState({
            value : this.state.defaultValue,
            selectedRole : null,
            addRole : null,
            editRoles : "ok",
            control : (
                       <span>
                           <button type="button" className="btn btn-outline-primary" onClick={ this.edit }> <FontAwesomeIcon icon={faPen} /> </button>
                           <button type="button" className="btn btn-outline-danger" onClick={ this.deleteAssignment }> <FontAwesomeIcon icon={faTrash} /> </button>
                       </span>
                     )
        })
    }

    select = (event) => {
        let statusKey = event.target.value
        let statusValue


        for (const [key, value] of Object.entries(this.state.roles)) {
            if (value.id == statusKey){
                statusValue = value.name
            }
        }

        this.setState({
            selectedRole : statusKey,
            valueText : statusValue,
        })
    }

    deleteAssignment = () => {
    }

    addRole = () => {
        console.log(this.state.addRoles)
        console.log(this.state.availableRoles)

        //let newRole = this.state.addRoles



        if (this.state.availableRoles.length > 0){
            let role = this.state.availableRoles[0]
            let availableRoles = this.state.availableRoles.filter((item, key) => key>0)
            let newSelectRoles = [role].concat(this.state.selectRoles)
            this.setState({
                availableRoles : availableRoles,
                selectRoles : newSelectRoles
            })
        }



        /*let currentRole = availableRoles.shift()
        if (currentRole)
            newRole.push({
                currentRole : currentRole,
                id : currentRole.id,
                roles : availableRoles
            })

        this.setState({
            addRoles : newRole
        })

        this.setState({
            availableRoles : availableRoles
        })

        //console.log('selectRoles')
        //console.log(this.state.selectRoles)
        //console.log('addRoles')
        //console.log(this.state.addRoles)
        let newAddRoles = []
        let newItemSelectRoles = []
        if (this.state.addRoles.length > 1){
            this.state.addRoles.map((addRole, key) => {
                if (key == 0)
                    newItemSelectRoles.push(addRole.currentRole)
                else{
                    newAddRoles.push(addRole)
                }
            })
        }

        //console.log('newItemSelectRoles : ')
        //console.log(newItemSelectRoles)
        this.state.selectRoles.filter(item => {
            newItemSelectRoles.push(item)
        })
        this.setState({
            selectRoles : newItemSelectRoles,
        })
        if (newAddRoles.length > 0){
            this.setState({
                addRoles : newAddRoles,
            })
        }*/

        //console.log('newAddRoles : ')
        //console.log(newAddRoles)
        //console.log(this.state.allSelectedRoles)
    }

    allSelectRoles = ( event ) => {

        //console.log(event)

        let roleInRoles = false,
            needToUpdate = false,
            key
        let selectedRoles = this.state.allSelectedRoles
        this.state.allSelectedRoles.map((role, roleKey) => {
            if (role.key == event.key){
                roleInRoles = true
                if (role.role && event.role)
                    if (role.role.id != event.role.id){
                        roleInRoles = false
                        needToUpdate = true
                        key = roleKey
                    }
            }
        })


        if (!roleInRoles){
            if (needToUpdate && key){
                selectedRoles.splice(key,1)
            }
            selectedRoles.push(event)
            this.setState({
                allSelectedRoles : selectedRoles
            })
        }

        //console.log('selectedRoles :')
        //console.log(selectedRoles)

        let selectedRolesIds = []
        selectedRoles.map(item => {
            selectedRolesIds.push(item.role.id)
        })
        let availableRoles = []
        this.state.roles.map(role => {
            if (!selectedRolesIds.includes(role.id)){
                availableRoles.push(role)
            }
        })

        //console.log('availableRoles')
        //console.log(availableRoles)
        this.setState({
            availableRoles : availableRoles,
        })




        /*let prohibitedRoles = []
        this.state.allSelectedRoles.map( role => {
            if (role.role)
                prohibitedRoles.push(role.role.id)
        })

        this.setState({
            prohibitedRoles : prohibitedRoles
        })


        let availableRoles = []
        this.state.roles.filter(role => {
            if (prohibitedRoles.includes(role.id)){
            } else {
                availableRoles.push(role)
            }
        })

        this.setState({
            availableRoles : availableRoles
        })

        console.log(this.state.availableRoles)*/

        if (event.trigger == "selectRole"){
            this.setState({
                localKey : this.state.localKey+1
            })
        }

        if (event.trigger == "addRole"){
            /*let newAllSelectedRoles = []
            newAllSelectedRoles = this.state.allSelectedRoles.map((item, itemKey) => {
                if (event.role)
                if (item.id == event.role.id){
                    item.role = event.role
                }
                return item
            })

            let newAddRoles = []
            newAddRoles = this.state.addRoles.filter((item, itemKey) => {
                if (event.myRole)
                if (item.id == event.myRole.id){
                    item.currentRole = event.role
                    item.role = event.role
                    item.roles = newAllSelectedRoles
                }
                return item
            })

            this.setState({
                addRoles : newAddRoles
            })

            console.log("addRolesSelect : ")
            console.log(newAddRoles)



            /*console.log('currentRoles : ')
            console.log(this.state.availableRoles)
            console.log('event : ')
            console.log(event)
            console.log('addRoles : ')
            console.log(this.state.addRoles)
            */

            /*let newCurrentRoles = this.state.availableRoles.map(role => {
                if (event.role)
                    if (role.id == event.role.id){
                        role = event.myRole
                    }
                return role
            })
            console.log(newCurrentRoles)*/
        }


    }

    render(){
        //this.allSelectRoles()

        let checkbox, role, disabled,
            checkId = "check"+this.state.assignment.id

        if (!this.state.assignment.role_data)
            disabled = "disabled"

        if (this.state.assignment.role_data)
            role = this.state.assignment.role_data.name
        else
            role = "<Роль в проекте не назначена>"

        let newRoles = (
            this.state.addRoles.map((role, key) => {
                let item
                //console.log(role)
                //console.log(this.state.allSelectedRoles)



                return <NewRole
                            key={key+"-"+this.state.editRoles+'-'+this.state.availableRoles+'-'+this.state.prohibitedRoles}
                            number={this.state.selectRoles.length+key}
                            roles={role.roles}
                            currentRoles={this.state.availableRoles}
                            prohibitedRoles={this.state.prohibitedRoles}
                            role={role.currentRole}
                            sendData={this.allSelectRoles}

                            item={item}
                            />
            })
        )

        return(
            <div className="d-flex project_assignment_list-items project_assignment_list-item">
                <div className="project_assignment_list-email">
                    {this.state.assignment.user_data.email}
                </div>
                <div className="project_assignment_list-check">
                    <input type="checkbox" id={checkId} checked={this.state.checked} onChange={this.checkOk} disabled={this.state.checkDisabled} />
                     <label htmlFor={checkId}></label>
                </div>
                <div className="project_assignment_list-role">
                    {
                        this.state.selectRoles.map( (role, key) => {
                                return <ProjectAssignmentRole
                                    key={key+"-"+this.state.availableRoles+"-"+this.state.editRoles+"-"+this.state.localKey}
                                    number={key}
                                    role={role}
                                    edit={this.state.editRoles}
                                    roles={this.state.roles}
                                    updateRole={this.updateRole}
                                    selectedRoles={this.state.selectRoles}
                                    currentRoles={this.state.availableRoles}
                                    prohibitedRoles={this.state.prohibitedRoles}
                                    availableRoles={this.state.availableRoles}
                                    sendData={this.allSelectRoles}
                                />
                            }
                        )
                    }
                    {newRoles}
                    {this.state.addRole}
                </div>
                <div className="project_assignment_list-control">
                    {this.state.control}
                </div>
            </div>
        )
    }
}

export default projectAssignment