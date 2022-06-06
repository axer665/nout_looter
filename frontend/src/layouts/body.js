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
                newProjectCode: '',
                newProjectName: '',
                isLoadingProjects: false,
            },
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
        ApiProj.getProjects()
        .then(response => {
            this.setState(prevState => {
                      let projects = Object.assign({}, prevState.projects);
                      projects.items = response.data.projects;
                      return { projects };
            })
        })
    }

    addProjectMethod = () => {
        const data = {
            code: this.state.projects.newProjectCode,
            name: this.state.projects.newProjectName,
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "4|lYkjKOIEawdFpsIuc9c3fUY6wpQBwKlCEV3uOo03"
        }

        if (!data.code){
            this.addInformer('error 1')
        } else if (!data.name) {
            this.addInformer('error 2')
        } else {
            Axios.post('http://192.168.160.62:84/api/project', data, {
                        headers: headers
                      })
                      .then((response) => {
                            //console.log(response.data)
                            this.getProjects()
                      })
        }
    }

   componentDidMount() {
        this.getProjects()
   }

   componentWillUnmount() {
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
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "4|lYkjKOIEawdFpsIuc9c3fUY6wpQBwKlCEV3uOo03"
        }

        Axios.delete('http://192.168.160.62:84/api/project/'+projectId, {headers : headers, data : data})
          .then((response) => {
                this.getProjects()
          })

   }

    render(){

        let role = 0

        if (this.props.user){
            if (Object.keys(this.props.user).length > 0){
                if (this.props.user.user_role){
                    role = this.props.user.user_role.role_id
                }
            }
        }

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className="project_list-code_header">
                    Шифр
                </div>
                <div className="project_list-name_header">
                    Проект
                </div>
            </div>
        )


        let projectControl
        let projects = (
            <div className="container-projects-list" >
                {
                    this.state.projects.items.map( item => {
                        projectControl = ""
                        if (role == 1){
                                    projectControl = (

                                            <div className="project_list-control">
                                                <Link to={"/project/"+item.id+"/edit"} >
                                                    <button type="button" className="btn btn-outline-primary"><FontAwesomeIcon icon={faPen} /></button>
                                                </Link>
                                                <InfoModal projectId={item.id} projectCode={item.code} projectName={item.name} deleteProject={this.deleteProject} />
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
            addProject = (
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