import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';

import './style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import Informer from './../components/informer/main'
import InfoModal from './../components/modals/infoModal'
import NewProject from './../components/modals/newProject'
import ApiProj from './../api/Projects'

class body extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
            informers : [],
            content : props.content,
            user : props.user,
            projects : {
                items : [],
                type : this.props.type,
                newProjectCode: '',
                newProjectName: '',
                isLoadingProjects: false,
            },
            projectTypes: [],
            projectStatuses: []
       }

       this.newProjectCode = this.newProjectCode.bind(this)
       this.newProjectName = this.newProjectName.bind(this)

        //console.log('BODY PROPS :')
        //console.log(this.props)
    }

    newProjectCode(event){
        var val = event.target.value
        this.setState(prevState => ({
            projects: {                   // object that we want to update
                ...prevState.projects,    // keep all other key-value pairs
                newProjectCode: val       // update the value of specific key
            }
        }))
    }

    newProjectName(event){
        var val = event.target.value
        this.setState(prevState => ({
            projects: {                   // object that we want to update
                ...prevState.projects,    // keep all other key-value pairs
                newProjectName: val       // update the value of specific key
            }
        }))
    }


    getProjects(){
        let type
        if (this.state.projects.type == "all"){
            type = null
        } else {
            type = this.state.projects.type
        }
        ApiProj.getProjects({'project_type_id' : type})
        .then(response => {
            if (response.data.projects){
                console.log(response.data)
                /*let types = [],
                    typeIds = [],
                    statuses = [],
                    statusesIds = []

                response.data.projects.filter(project => {
                    console.log(project)
                    if (project.type)
                        if (!typeIds.includes(project.type.id)){
                            typeIds.push(project.type.id)
                            types.push(project.type)
                        }
                    if (project.status)
                        if (!statusesIds.includes(project.status.id)){
                            statusesIds.push(project.status.id)
                            statuses.push(project.status)
                        }
                })
                console.log(types)
                console.log(statuses)
                */
                this.setState({
                    projectTypes : response.data.types,
                    projectStatuses : response.data.statuses
                })
            }
            this.setState(prevState => {
                      let projects = Object.assign({}, prevState.projects);
                      projects.items = response.data.projects;
                      return { projects };
            })

        })
    }

    addProjectMethod = (event) => {
        const data = {
            code: event.code,
            name: event.name,
            project_type_id: event.type,
            status: event.status,
            creator_id: this.state.user.id
        }

        /*const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "4|lYkjKOIEawdFpsIuc9c3fUY6wpQBwKlCEV3uOo03"
        }*/
        const headers = ApiProj.getHeaders()

        //if (!data.code){
        //    this.addInformer('error 1')
        //} else if (!data.name) {
        //    this.addInformer('error 2')
        //} else {
            Axios.post('http://192.168.2.119:84/api/project', data, {
                headers: headers
              })
              .then((response) => {
                    //console.log(response.data)
                    this.getProjects()
              })
        //}
    }

   componentDidMount() {
        this.getProjects()
        //console.log(this.props)
   }

   componentWillUnmount() {
   }

    getProjectLists = (event) => {

    }

   generationToken(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
   }

   addInformer = (message) => {
        let messageArray = []
        this.state.informers.filter(message => {
            messageArray.push(message)
        })
        messageArray.push(message)
        this.setState({informers:messageArray})
   }

   returnInfo = (param) => {
        //console.log('param')
   }

   updateStatus = (item) => {
        //console.log('item : ')
        //console.log(item)
   }

   deleteProject = (projectId) => {
        const data = {
            id: projectId
        }
        /*const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "4|lYkjKOIEawdFpsIuc9c3fUY6wpQBwKlCEV3uOo03"
        }*/
        const headers = ApiProj.getHeaders()

        Axios.delete('http://192.168.2.119:84/api/project/'+projectId, {headers : headers, data : data})
          .then((response) => {
                this.getProjects()
          })

   }

    render(){

        let role = 0
        let manager
        //console.log(this.props.user)

        if (this.props.user){
            if (Object.keys(this.props.user).length > 0){
                if (this.props.user.user_role){
                    role = this.props.user.user_role.role_id
                }
            }
        }

        let widthHeaderCode = "project_list-code_header",
            widthHeaderName = "project_list-name_header"
        if(role){
            widthHeaderCode = widthHeaderCode+" role"
            widthHeaderName = widthHeaderName+" role"
        }

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className={widthHeaderCode}>
                    Код проекта
                </div>
                <div className={widthHeaderName}>
                    Проект
                </div>
            </div>
        )


        let projectControl
        let projects = (
            <div className="container-projects-list block-projects-list" >
                {
                    this.state.projects.items.map( item => {
                        //console.log(item)
                        let manager
                        if (item.assignments.length > 0 && this.props.user){
                            item.assignments.filter(assignment => {
                                if (assignment.user_id == this.props.user.id && assignment.roles_ids){
                                    manager = assignment.roles_ids.manager
                                }
                            })
                        }
                        projectControl = ""
                        if (role == 1 || manager){
                                    let editButton,
                                        deleteButton
                                    editButton = (
                                        <Link to={"/project/"+item.id+"/edit"} >
                                            <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faPen} /></button>
                                        </Link>
                                    )
                                    if (role == 1){
                                        deleteButton = <InfoModal projectId={item.id} projectCode={item.code} projectName={item.name} deleteProject={this.deleteProject} />
                                    }
                                    projectControl = (

                                            <div className="project_list-control">
                                                {editButton}
                                                {deleteButton}
                                            </div>

                                    )
                       } else {
                            projectControl = (
                                <div className="project_list-control">
                                </div>
                            )
                       }

                        return (

                            <div key={item.id} className="d-flex flex-row bd-highlight mb-3 project_list-items justify-content-center">

                                <div className="project_list-code">
                                    <Link to={"/project/"+item.id+"/read"} >
                                        {item.code}
                                    </Link>
                                </div>
                                <div className="project_list-name">
                                    <Link to={"/project/"+item.id+"/read"} >
                                        {item.name}
                                    </Link>
                                </div>
                                {projectControl}

                            </div>

                        )
                    })
                }
            </div>
        )

        let addProject
        if (role == 1){
            /*addProject = (
                <div className="d-flex flex-row bd-highlight mb-3 project_list-items justify-content-center">

                    <div className="project_list-code">
                        <input type="text" value={this.state.projects.newProjectCode} onChange={this.newProjectCode} />
                    </div>
                    <div className="project_list-name">
                        <input type="text" value={this.state.projects.newProjectName} onChange={this.newProjectName} />
                    </div>
                    <div className="project_list-control">
                        <button type="button" className="btn btn-outline-success" onClick={this.addProjectMethod}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>

                    {this.state.informers.map(
                        (informer, key) => {
                            return (<Informer key={key} message={informer} updateStatus={this.updateStatus} />)
                        }
                    )}
                </div>
            )*/
            addProject = (
                <NewProject addProject={this.addProjectMethod} statuses={this.state.projectStatuses} types={this.state.projectTypes}/>
            )
        }

        let sideBar
        let MainBlock = "col-12",
            SideBarBlock
        if (sideBar){
            MainBlock = "col-8"
            SideBarBlock = "col-2"
        }

        let content = (
            <div className="container">
                <div className="row">
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={MainBlock}>
                        <div className='container-lists cl-w80'>{header} {projects} {addProject} </div>
                    </div>
                </div>
            </div>

            )

        return (
             content
        )
    }
}

export default body