import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   useParams,
   Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import logo from './logo.svg';
import './App.scss';

import MasterLayout from './../layouts/masterLayout'
import Homea from './../pages/Home'
import Footer from './../layouts/footer'
import ApiUser from './../api/User'

import Store from 'store'
import Header from './../layouts/header'


class App extends Component {

  constructor(props){
    super(props)
    let anonymousUser = {
        'name' : false,
        'email' : false,
        'token' : false
    }

    this.state = {
        user : {},
        checkToken : null,
    }

    //Store.set('user', {'name':'Misha', 'email':'misha@mail.ru'})

    /*if (Store.get('user')){
        this.setState({
           user : Store.get('user'),
           checkToken : true
        })
    } else{
        this.setState({
           user : anonymousUser,
           checkToken : false
        })
    }*/

    //this.checkToken()
  }

  checkToken = () => {
        let token = 0
        if (Store.get('user'))
            token = Store.get('user').token

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }

        Axios.get('http://192.168.2.119:84/api/checkToken',  {
             headers: headers,
             params: {}
           })
          .then((response) => {
                this.setState({
                    checkToken : true,
                    user : response.data.user
                })
          })
          .catch(error => {
              this.setState({
                  checkToken : false
              })
          })

  }

  componentDidMount(){
     //console.log(this.state)
  }

  componentWillUnmount() {

  }


  render() {
      return "asfagfg"
    /*
    let user = this.state.user

    if (this.state.checkToken !== null){
        return (
            <div>
                <Router>

                    <Routes>
                        <Route path="/"
                            element={<MasterLayout body="start" user={user} />}
                         />

                        <Route path="/projects/:type" element={<MasterLayout key='projects' body='projects' user={this.state.user} checkToken={this.state.checkToken} />} />
                        <Route path="/project/:id/:trigger" element={<MasterLayout key='project' body='project' user={this.state.user} checkToken={this.state.checkToken} />} >
                        </Route>

                        <Route path="/reports/:type" element={<MasterLayout key='reports' body='reports' user={this.state.user} checkToken={this.state.checkToken} />} />

                        <Route path="/checkList/:projId/:id" element={<MasterLayout key='checkList' body='checkList' user={this.state.user} checkToken={this.state.checkToken} />} />

                        <Route path="/user" element={<MasterLayout key='user' body='user' user={this.state.user} checkToken={this.state.checkToken}  />} />
                        <Route path="/user/:id/:trigger" element={<MasterLayout key='userData' body='userData' user={this.state.user} checkToken={this.state.checkToken}  />} />

                        <Route path="/object/:id" element={<MasterLayout key='object' body='object' user={this.state.user} checkToken={this.state.checkToken} />} />
                        <Route path="/model/:id" element={<MasterLayout key='model' body='model' user={this.state.user} checkToken={this.state.checkToken} />} />

                        <Route path="/settings/templates" element={<MasterLayout key='settingsTemplates' body='settingsTemplates' user={this.state.user} checkToken={this.state.checkToken} />} />
                        <Route path="/settings/users" element={<MasterLayout key='settingsUsers' body='settingsUsers' user={this.state.user} checkToken={this.state.checkToken} />} />
                        <Route path="/settings/lists" element={<MasterLayout key='settingsLists' body='settingsLists' user={this.state.user} checkToken={this.state.checkToken} />} />

                        <Route path="/settings/template/:id" element={<MasterLayout key='settingsTemplate' body='settingsTemplate' user={this.state.user} checkToken={this.state.checkToken} />} />

                    </Routes>
                </Router>
            </div>
          )
    } else {
        return null
    }*/
  }
}

export default App;
