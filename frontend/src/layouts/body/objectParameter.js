import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiObj from './../../api/Objects'

class objectParam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.parameter.id,
            keyName : this.props.parameter.keyName,
            keyType : this.props.parameter.keyType,
            data : this.props.parameter.data,
            types : this.props.types,

            value : null,
            valueText : null,
            valueTextDef : null,
            valueSelectedId : null,

            control : <button type="button" className="btn btn-outline-secondary" onClick={this.editValue}> <FontAwesomeIcon icon={faPen} /> </button>
        }


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
        } else if (this.state.keyType == "select"){

            let select
            let options

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


    editOk = () => {
        const data = {
            'objectId' : this.props.objectId,
            'propName' : this.state.id,
            'propValue' : (this.state.keyType == "text") ? this.state.valueText : this.state.valueSelectedId,
        }

        const headers = ApiObj.getHeaders()

        Axios.put('http://192.168.2.119:84/api/updateObject/'+this.props.objectId, data, {
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

       for (const [key, value] of Object.entries(this.state.types)) {
           if (value.id == statusKey){
               statusValue = value.name
           }
       }

       this.setState({
           valueSelectedId : statusKey,
           valueText : statusValue,
       })
   }

    mutator = () => {
        if (this.state.id == "object_type")
            this.setState({
                id : 'type'
            })
        if (typeof this.state.data == "object"){
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
        if (typeof this.state.data == 'object'){
            value = this.state.data.name
        }

        return(

            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-parameters-item-line ">
                <div className="object_data-header">
                    {this.state.keyName}
                </div>
                <div className="object_data-value">
                    {this.state.value}
                </div>
                <div className="object_data-control">
                    {this.state.control}
                </div>
            </div>
        )
    }
}

export default objectParam