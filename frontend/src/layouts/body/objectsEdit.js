import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'
import ApiObj from './../../api/Objects'
import DeleteObjectModal from './../../components/modals/confirmDeleteObject'


class body extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
            informers : [],
            content : props.content,
            user : props.user,
            objectTypes : [],
            objects : {
                items : [],
                newObjectType: '',
                newObjectName: '',
                isLoadingProjects: false,
            },
       }

       this.newObjectType = this.newObjectType.bind(this)
       this.newObjectName = this.newObjectName.bind(this)
    }

    newObjectType(event){
        var val = event.target.value
        this.setState(prevState => ({
            objects: {                   // object that we want to update
                ...prevState.objects,    // keep all other key-value pairs
                newObjectType: val       // update the value of specific key
            }
        }))
    }

    newObjectName(event){
        var val = event.target.value
        this.setState(prevState => ({
            objects: {                   // object that we want to update
                ...prevState.objects,    // keep all other key-value pairs
                newObjectName: val       // update the value of specific key
            }
        }))
    }


    getObjects(){
        ApiObj.getObjects({projectId: this.props.projectId})
        .then(response => {
                 this.setState(prevState => {
                           let objects = Object.assign({}, prevState.objects);
                           objects.items = response.data.objects;
                           return { objects };
                 })
                 this.setState({'isLoadingProjects' : true})
             }
        );
    }

    addObjectMethod = () => {
        const data = {
            type: this.state.objects.newObjectType,
            name: this.state.objects.newObjectName,
            project_id: this.props.projectId,
        }

        if (!data.type){
            this.addInformer('error 1')
        } else if (!data.name) {
            this.addInformer('error 2')
        } else {
            const headers = ApiObj.getHeaders()
            Axios.post('http://192.168.160.62:84/api/object', data, {
                headers: headers
            })
            .then((response) => {
                //console.log(response.data)
                this.getObjects()
            })
        }
    }

   componentDidMount() {
        this.getObjects()
        this.getObjectTypes()
   }

   componentWillUnmount() {
   }

   addInformer = (message) => {
        let messageArray = []
        this.state.informers.filter(message => {
            messageArray.push(message)
        })
        messageArray.push(message)
        this.setState({informers:messageArray})
   }

   updateStatus = (item) => {
        //console.log('item : ')
        //console.log(item)
   }

   getObjectTypes = () => {
        ApiObj.getTypes()
        .then(response => {
            console.log(response.data)
            this.setState({
                objectTypes : response.data.types
            })
        })
   }

   deleteObject = (objectId) => {
       const data = {
           id: objectId
       }
       const headers = ApiObj.getHeaders()

       Axios.delete('http://192.168.160.62:84/api/object/'+objectId, {headers : headers, data : data})
         .then((response) => {
               console.log(response.data)
               this.getObjects()
         })
   }

    render(){

        let objectControl

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className="object_list-name_header">
                    Наименование
                </div>
                <div className="object_list-type_header">
                    Тип объекта
                </div>
            </div>
        )

        let objects = (
            <div>

                {header}

                {
                    this.state.objects.items.map( item => {
                        let objectType = "<Не выбрано>"
                        if (item.object_type){
                            objectType = item.object_type.name
                        }
                        return (
                            <div key={item.id} className="d-flex flex-row bd-highlight mb-3 object_list-items justify-content-center">
                                <div className="object_list-item-name">
                                    {item.name}
                                </div>
                                <div className="object_list-item-type">
                                    {objectType}
                                </div>
                                <div className="object_list-item-control">
                                    <Link to={"/object/"+item.id} >
                                        <button type="button" className="btn btn-outline-primary">
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                    </Link>
                                    <DeleteObjectModal objectId={item.id} objectName={item.name} deleteObject={this.deleteObject}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )

        const selectTypesOptions = (
            this.state.objectTypes.map(
                (type, key) => {
                    return (<option key={type.id} value={type.id}> {type.name} </option>)
                }
            )
        )

        let selectTypes = (
            <select defaultValue="0" onChange={this.newObjectType}>
                <option value="0" disabled> Не выбрано </option>
                {selectTypesOptions}
            </select>
        )

        let addObject = (
            <div className="d-flex flex-row bd-highlight mb-3 object_list-items justify-content-center">

                <div className="object_list-item-name">
                    <input type="text" value={this.state.objects.newProjectName} onChange={this.newObjectName} />
                </div>
                <div className="object_list-item-type">

                {selectTypes}

                </div>
                <div className="object_list-item-control">
                    <button type="button" className="btn btn-outline-success" onClick={this.addObjectMethod}>add</button>
                </div>

                {this.state.informers.map(
                    (informer, key) => {
                        return (<Informer key={key} message={informer} updateStatus={this.updateStatus} />)
                    }
                )}
            </div>
        )

        let content = <div className='container-lists-objects'> {objects} {addObject} </div>

        return (
             content
        )
    }
}

export default body