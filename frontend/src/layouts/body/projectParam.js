import React from 'react'
import $ from 'jquery';
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from "../../api/Projects";

class body extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name : this.props.name,
            value : <p> {this.props.value} </p>,
            valueSelectedId : null,
            valueText : this.props.value,
            valueTextDef : this.props.value,
            control : <button type="button" className="btn btn-outline-secondary" onClick={ this.editValue }> <FontAwesomeIcon icon={faPen} /> </button>,
            keyName : this.props.keyName,

            statuses : this.props.statuses,
            types : this.props.types,
        }
    }

   componentDidMount() {

   }

   componentWillUnmount() {

   }

   editValue = () => {

        if (this.props.keyType == "text"){
            this.setState({
               value : <input type="text" value={this.state.valueText} onChange={this.change} />,
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
        } else if (this.props.keyType == "select"){

            let select,
                options,
                nullOption

            if (this.state.name=="status"){
                let defaultValue = 0

                options = this.state.statuses.map( (status) => {
                    let selected = (
                        <option key={status.id} value={status.id} >
                             {status.value}
                        </option>
                    )
                    if (status.value == this.state.valueText){
                        defaultValue = status.id
                    }

                    return (
                        selected
                    )
                })
                if (!this.props.value){
                    nullOption = <option value="0" disabled defaultValue> Не выбрано </option>
                }
                select = <select defaultValue={defaultValue} onChange={this.select}> {nullOption} {options} </select>
            } else if (this.state.name == "type"){
                let defaultValue = 0
                options = this.state.types.map( (type) => {

                    let selected = (
                        <option key={type.id} value={type.id} >
                             {type.name}
                        </option>
                    )

                    if (type.name == this.state.valueText){
                        defaultValue = type.id
                    }

                    return (
                        selected
                    )
                })
                if (!this.props.value){
                    nullOption = <option value="0" disabled> Не выбрано </option>
                }
                select = <select defaultValue={defaultValue} onChange={this.select}> {nullOption} {options} </select>
            }

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
   }

   change = (event) => {
        this.setState({
          valueText : event.target.value,
          value : ( <input type="text" value={event.target.value} onChange={this.change} /> ),
        })
   }

   select = (event) => {

        let statusKey = event.target.value
        let statusValue

        if (this.state.name == "status"){
            for (const [key, value] of Object.entries(this.state.statuses)) {
                if (value.id == statusKey){
                    statusValue = value.value
                }
            }
        } else if (this.state.name == "type"){
            for (const [key, value] of Object.entries(this.state.types)) {
                if (value.id == statusKey){
                    statusValue = value.name
                }
            }
        }
        this.setState({
            valueSelectedId : statusKey,
            valueText : statusValue,
        })
   }

   editOk = () => {

        const data = {
            'projectId' : this.props.projectId,
            'propName' : (this.state.name == "type") ? 'project_type_id' : this.state.name,
            'propValue' : (this.props.keyType == "text") ? this.state.valueText : this.state.valueSelectedId,
        }
        /*const headers = {
           "Content-Type": "application/json",
           Authorization: "Bearer " + "4|lYkjKOIEawdFpsIuc9c3fUY6wpQBwKlCEV3uOo03"
        }*/
       const headers = ApiProj.getHeaders()


        Axios.put('http://192.168.2.119:84/api/updateProject/'+this.props.projectId, data, {
            headers: headers
        })
        .then((response) => {
            this.setState({
                value : <p> {this.state.valueText} </p>,
                valueTextDef : this.state.valueText,
                control : <button type="button" className="btn btn-outline-secondary" onClick={ this.editValue }> <FontAwesomeIcon icon={faPen} /> </button>
            })
        })

   }

   editCancel = () => {
        this.setState({
            value : <p> {this.state.valueTextDef} </p>,
            control : <button type="button" className="btn btn-outline-secondary" onClick={ this.editValue }> <FontAwesomeIcon icon={faPen} /> </button>
        })
   }

    render(){
        let control = ""
        //if (this.props.edit){
            control = (
                <div className="project_data-control">
                    {this.state.control}
                </div>
            )
        //}
        return (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-parameters-item-line">
                <div className="project_data-header">
                     <p>{this.state.keyName}</p>
                 </div>
                 <div className="project_data-value">
                    {this.state.value}
                </div>
                {control}
            </div>
        )

    }
}

export default body