import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiModel from './../../api/Models'

class objectParam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.parameter.id,
            keyName : this.props.parameter.keyName,
            keyType : this.props.parameter.keyType,
            data : this.props.parameter.data,

            sections : this.props.sections,
            stages : this.props.stages,

            value : null,
            valueText : null,
            valueTextDef : null,
            valueSelectedId : null,

            control : <button type="button" className="btn btn-outline-secondary" onClick={this.editValue}> <FontAwesomeIcon icon={faPen} /> </button>
        }

        console.log(this.state)
    }

    componentDidMount() {
        this.mutator()
    }

    componentWillUnmount() {
    }

    editValue = () => {
        if (this.state.keyType == "text"){
            this.setState({
                value : (<input type="text" value={this.state.valueText} onChange={this.change} />),
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
        } else if (this.state.keyType == "textarea"){
            this.setState({
                value : (<textarea defaultValue={this.state.valueText} onChange={this.changeTextarea} />),
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
        } else if (this.state.keyType == "select"){

            let select
            let options

            let defaultValue = 0

            //console.log(this.state.id)

            if (this.state.id == "section_id"){
                options = this.state.sections.map( (section) => {
                    let selected = (
                        <option key={section.id} value={section.id} >
                             {section.name}
                        </option>
                    )
                    if (section.name == this.state.valueText){
                        defaultValue = section.id
                    }

                    return (
                        selected
                    )
                })
            } else if (this.state.id == "stage_id"){
                options = this.state.stages.map( (stage) => {
                    let selected = (
                        <option key={stage.id} value={stage.id} >
                             {stage.name}
                        </option>
                    )
                    if (stage.name == this.state.valueText){
                        defaultValue = stage.id
                    }

                    return (
                        selected
                    )
                })
            }

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
    }

    change = (event) => {
        this.setState({
          valueText : event.target.value,
          value : ( <input type="text" value={event.target.value} onChange={this.change} /> ),
        })
   }

   changeTextarea = (event) => {
        this.setState({
          valueText : event.target.value,
          value : (<textarea defaultValue={this.state.valueText} onChange={this.changeTextarea} />),
        })
   }


    editOk = () => {
        const data = {
            'modelId' : this.props.modelId,
            'propName' : this.state.id,
            'propValue' : (this.state.keyType == "text" || this.state.keyType == "textarea") ? this.state.valueText : this.state.valueSelectedId,
        }

        const headers = ApiModel.getHeaders()

        Axios.put('http://192.168.2.119:84/api/updateModel/'+this.props.modelId, data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                value : <p> {this.state.valueText} </p>,
                valueTextDef : this.state.valueText,
                control : <button type="button" className="btn btn-outline-secondary" onClick={this.editValue}> <FontAwesomeIcon icon={faPen} /> </button>
            })
        })
   }


   editCancel = () => {
       this.setState({
           value : <p> {this.state.valueTextDef} </p>,
           control : <button type="button" className="btn btn-outline-secondary" onClick={this.editValue}> <FontAwesomeIcon icon={faPen} /> </button>
       })
   }

   select = (event) => {

       let statusKey = event.target.value
       let statusValue

       if (this.state.id == "section_id"){
           for (const [key, value] of Object.entries(this.state.sections)) {
               if (value.id == statusKey){
                   statusValue = value.name
               }
           }
       } else if (this.state.id == "stage_id"){
            for (const [key, value] of Object.entries(this.state.stages)) {
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


    mutator = () => {
        if (this.state.id == "model_section")
            this.setState({
                id : 'section_id'
            })
        else if (this.state.id == "model_stage")
            this.setState({
                id : 'stage_id'
            })
        if (typeof this.state.data == "object" && this.state.data){
            this.setState({
                value : (<p> {this.state.data.name} </p>),
                valueText : this.state.data.name,
                valueTextDef : this.state.data.name
            })
        } else {
            this.setState({
                value : (<p> {this.state.data} </p>),
                valueText : this.state.data,
                valueTextDef : this.state.data,
            })
        }
    }


    render(){
        let value = this.state.data
        if (typeof this.state.data == 'object' && this.state.data){
            if (this.state.data.name)
                value = this.state.data.name
        }

        return(

            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-parameters-item-line ">
                <div className="model_data-header">
                    {this.state.keyName}
                </div>
                <div className="model_data-value">
                    {this.state.value}
                </div>
                <div className="model_data-control">
                    {this.state.control}
                </div>
            </div>
        )
    }
}

export default objectParam