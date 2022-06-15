import React from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';

import Axios from 'axios'
import { CSSTransition } from 'react-transition-group'

import Navbar from './navbar'
import Sidebar from './sidebar'
import Footer from './footer'
import Header from './header'
import Body from './body'

import Store from 'store'
import ApiAuth from './../api/Authorisation'
import ApiUser from './../api/User'

import Projects from './body/projects.js'
import Project from './body/project.js'
import Object from './body/object.js'
import AuthenticationUser from './body/Auth/authentication'
import User from './body/Auth/user'
import Model from './body/model'

import Informer from './../components/informer/main'
import Settings from './body/Settings/settings'
import SettingsTemplate from './body/Settings/templateCriterions'
import CheckList from './body/Project/CheckLists/checkList'
import SettingsTemplates from './body/Settings/templates'
import SettingsRoles from './body/Settings/roles'
import SettingsLists from './body/Settings/lists'

class masterLayout extends React.Component {

    constructor(props) {
       super(props)
       this.state = {
            user : {},
            body : props.body,
            parameters : {},
            isLoadingUserdata: false,
            rerenderKey : 0,
            informers : [],
       }
       this.getUser()
    }

   componentDidMount() {

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

   getUser = () => {
        let login
        if (Store.get('user')){
            login = Store.get('user').name
        }
        ApiUser.getUser({login:login})
        .then(response => {
            this.setState({
                user : response.data.user,
                isLoadingUserdata : true
            })
        })
        .catch(error => {
            console.log(error.response)
            if (error.response)
                if (error.response.data.result === false){
                    //document.location.href="/projects";
                    Store.remove('user')
                }
            this.setState({
                isLoadingUserdata : true
            })
        })
   }

    rerender = (event) => {
        console.log('rerender')
        this.setState({
            rerenderKey : this.state.rerenderKey + 1
        })
        if (event == "registration"){
            this.addInformer('Вы успешно зарегистрированы в системе. Можете войти в систему, используя свой логин и пароль')
        }
    }


    render(){

        var head, body, sidebar

        head = <Header user={this.state.user} />
        switch (this.state.body) {
          case "projects":
            body = <Projects content={this.state.body} user={this.state.user} />
            break;
          case "project":
            body = <Project user={this.state.user} />
            break;
          case "object":
              body = <Object />
              break;
          case "model":
              body = <Model />
              break;
          case "user":
            console.log(this.props.checkToken)
            if (this.props.checkToken)
                body = <User user={this.state.user} rerender={this.rerender} />
            else
                body = <AuthenticationUser key={this.state.rerenderKey} rerender={this.rerender} />
            break;

          case "checkList":
            head = <Header head="project" user={this.state.user} />
            body = <CheckList />
          break;

          case "settingsTemplates":
            body = <SettingsTemplates />
          break;

          case "settingsUsers":
             body = <SettingsRoles />
          break;

          case "settingsTemplate":
             body = <SettingsTemplate />
          break;

          case "settingsLists":
             body = <SettingsLists />
          break;

          default:
            head = <Header user={this.state.user} />
            body = <Body content={this.state.body} user={this.state.user} />
            break;
        }




        if (this.state.isLoadingUserdata) {
            return (
                <div>
                    <div className="main-container">
                        <div className="main-container-header">
                            <div className="container-fluid">
                                {
                                    head
                                }
                            </div>
                        </div>

                        <div className="main-container-body">
                            <div className="container-fluid">
                                <div className="row">
                                     <div className="col-12">

                                            {
                                                body
                                            }

                                     </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-container-footer">
                            <div className="container-fluid">
                                <Footer />
                            </div>
                        </div>
                    </div>
                    {this.state.informers.map(
                        (informer, key) => {
                            return (<Informer key={key} message={informer} updateStatus={()=>{}}/>)
                        }
                    )}
                </div>
            )

        } else {
            return (

                <div>
                    <div className="main-container">
                        <div className="main-container-header">
                            <div className="container-fluid">

                                <Header />

                            </div>
                        </div>

                        <div className="main-container-body">
                            <div className="container">
                                <div className="row">
                                     <div className="col-12">
                                            Loading...
                                     </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-container-footer">
                            <div className="container-fluid">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default masterLayout