import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import ApiSettings from './../../../api/Settings'

class settingsTemplates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user : this.props.user,
            //check : false,
            roles : this.props.roles,

            roleId : null,
            value : null,
            valueText : null,
            defaultValue : null,

            check : 0,

            control : <button type="button" className="btn btn-outline-secondary" onClick={this.editRole}> <FontAwesomeIcon icon={faPen} /> </button>
        }
        console.log(this.state)
    }

    componentDidMount() {
        if (this.state.user.role)
            this.setState({
                check : this.state.user.check,
                roleId : this.state.user.role.id,
                value : this.state.user.role.name,
                valueText : this.state.user.role.name,
                defaultValue : this.state.user.role.name,
            })
    }

    componentWillUnmount() {

    }

    editRole = () => {

        let select
        let options

        let defaultValue = 0

            options = this.state.roles.map( (role) => {
                let selected = (
                    <option key={role.id} value={role.id} >
                         {role.name}
                    </option>
                )
                if (role.name == this.state.valueText){
                    defaultValue = role.id
                }

                return (
                    selected
                )
            })

        select = <select defaultValue={defaultValue} onChange={this.select}> {options} </select>

        this.setState({
            value : <div>{select}</div>,
            control : (
                       <span>
                           <button type="button" className="btn btn-outline-success" onClick={ this.editOk }>
                               <FontAwesomeIcon icon={faCheck} />
                           </button>
                           <button type="button" className="btn btn-outline-danger" onClick={ this.editCancel }>
                               <FontAwesomeIcon icon={faXmark} />
                           </button>
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
           roleId : statusKey,
           valueText : statusValue,
       })

   }

   editOk = () => {

        /*this.setState({
           value : <p> {this.state.valueText} </p>,
           valueTextDef : this.state.valueText,
           control : <button type="button" className="btn btn-outline-secondary" onClick={this.editRole}> <FontAwesomeIcon icon={faPen} /> </button>
        })*/

       const data = {
           'role_id' : this.state.roleId,
       }

       const headers = ApiSettings.getHeaders()

       Axios.put('http://192.168.2.119:84/api/updateSettingsRole/'+this.state.user.id, data, {
           headers: headers
       })
       .then((response) => {
           console.log(response.data)
           this.setState({
               value : this.state.valueText,
               valueTextDef : this.state.defaultValue,
               control : <button type="button" className="btn btn-outline-secondary" onClick={this.editRole}> <FontAwesomeIcon icon={faPen} /> </button>
           })
       })
  }

  checkOk = (event) => {
      let param = 0
      if (event.target.check){
          param = 1
      }

      if (param)
          this.setState({
              check : 1
          })
      else
          this.setState({
              check : 0
          })

      const data = {
                  "check" : param
              }
      const headers = ApiSettings.getHeaders()

      Axios.put('http://192.168.2.119:84/api/updateSettingsRole/'+this.state.user.id, data, {
          headers: headers
      })
      .then((response) => {
          console.log(response.data)
      })
  }


  editCancel = () => {
      this.setState({
          value : this.state.valueText,
          control : <button type="button" className="btn btn-outline-secondary" onClick={this.editRole}> <FontAwesomeIcon icon={faPen} /> </button>
      })
  }

    render(){
            return (
                <div className="d-flex flex-row bd-highlight mb-3 container-list-settings_users justify-content-center">
                    <div className="s_roles_list-item-email">
                        {this.state.user.user.email}
                    </div>
                    <div className="s_roles_list-item-done">
                        <input type="checkbox" checked={this.state.check} onChange={this.checkOk} />
                    </div>
                    <div className="s_roles_list-item-role">
                        {this.state.value}
                    </div>
                    <div className="s_roles_list-item-control">
                        {this.state.control}
                    </div>
                </div>
            )
    }
}

export default settingsTemplates