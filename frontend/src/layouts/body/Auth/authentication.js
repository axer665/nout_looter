import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { Tabs, Tab } from 'react-bootstrap'
import ApiAuth from './../../../api/Authorisation'
import Store from 'store'
import Informer from './../../../components/informer/main'

import './../../style/body.scss';

class AuthenticationUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 0,
            login : '',
            first_name : '',
            last_name : '',
            patronymic : '',
            email : '',
            company : '',
            function : '',
            password : '',
            repassword : '',

            informers : [],
        }
    }

    addInformer = (message) => {
        let messageArray = []
        this.state.informers.filter(message => {
            messageArray.push(message)
        })
        messageArray.push(message)
        this.setState({informers:messageArray})
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    inputData = (event, trigger) => {
        this.setState({
            [trigger]: event.target.value
        })
        console.log(this.state)
    }

    login = () => {
        //const navigate = useNavigate();
        console.log(this.state.login)
        console.log(this.state.password)
        ApiAuth.authentication({
            'email': this.state.login,
            'password': this.state.password,
            //'token': Store.get('user').token
        })
        .then(response => {
            console.log(response.data)
            Store.set(
                'user', {
                    'name' : response.data.userData.login,
                    'email' : response.data.userData.email,
                    'token' : response.data.token
                }
            )
            document.location.reload(); //return false;
        })
        .catch(error => {
            if (error.response) {
                //console.log(error.response.status)
                console.log(error.response.data)
                this.addInformer(error.response.data.error)
            }
        })
    }

    registration = () => {
        /*if (!this.state.login){
            this.addInformer('Поле "Имя пользователя" не может быть пустым')
        } else*/ if (!this.state.email){
           this.addInformer('Поле "E-mail" не может быть пустым')
        }
        /*else if (!this.state.first_name){
           this.addInformer('Поле "Фамилия" не может быть пустым')
        }
        else if (!this.state.last_name){
           this.addInformer('Поле "Имя" не может быть пустым')
        }
        /*else if (!this.state.company){
           this.addInformer('Поле "Компания" не может быть пустым')
        }
        else if (!this.state.function){
           this.addInformer('Поле "Должность" не может быть пустым')
        }*/
        else if (this.state.password != this.state.repassword){
           this.addInformer('Пароли должны вовпадать')
        }
         else {
            ApiAuth.registration({
                'login':this.state.login,
                'email':this.state.email,
                'first_name':this.state.first_name,
                'last_name':this.state.last_name,
                'company':this.state.company,
                'function':this.state.function,
                'password':this.state.password,
                'repassword':this.state.repassword,
            })
            .then(response => {
                console.log(response.data)
                console.log(response.data.error)
                    Store.set('user', {
                        'name':response.data.user.login,
                        'email':response.data.user.email,
                        'token':response.data.token
                    })
                    //document.location.reload(); //return false;
                    this.props.history.push('/user/'+response.data.user.id+'/main')
                    this.props.rerender()

            })
            .catch(error => {
                console.log(error.response.status)
                if (error.response){
                    console.log(error.response.data)
                    if (error.response.data.error.email){
                        this.addInformer('Поле "E-mail" заполнено неверно')
                    }
                }
                this.props.rerender('registration')
            })
        }
    }

    render(){
            return(
                <div>
                    <div className="container-authentication">
                        <Tabs defaultActiveKey="enter" id="uncontrolled-tab-example" className="mb-3 nav-justified tabs-authentication" >
                          <Tab eventKey="enter" title="Вход">
                            <input type="text" onChange={event => this.inputData(event, 'login')} className="authentication-name" placeholder="Имя пользователя или e-mail" /><br/>
                            <input type="password" onChange={event => this.inputData(event, 'password')} className="authentication-password" placeholder="Пароль" /><br/>

                            <button type="submit" className="btn btn-primary" onClick={this.login} > Войти </button>
                          </Tab>
                          <Tab eventKey="registration" title="Регистрация">
                              {/*<input type="text" className="authentication-name" onChange={event => this.inputData(event, 'login')} placeholder="Имя пользователя (Логин)" /><br/>*/}
                            <input type="text" className="authentication-email" onChange={event => this.inputData(event, 'email')} placeholder="E-mail" /><br/>

                              {/* <input type="text" className="authentication-first_name" onChange={event => this.inputData(event, 'first_name')} placeholder="Фамилия" /><br/>
                            <input type="text" className="authentication-last_name" onChange={event => this.inputData(event, 'last_name')} placeholder="Имя" /><br/>
                            <input type="text" className="authentication-patronymic" onChange={event => this.inputData(event, 'patronymic')} placeholder="Отчество" /><br/>

                              <input type="text" className="authentication-company" onChange={event => this.inputData(event, 'company')} placeholder="Компания" /><br/>
                              <input type="text" className="authentication-function" onChange={event => this.inputData(event, 'function')} placeholder="Должность" /><br/>*/}
                            <input type="password" className="authentication-password" onChange={event => this.inputData(event, 'password')} placeholder="Пароль" /><br/>
                            <input type="password" className="authentication-repassword" onChange={event => this.inputData(event, 'repassword')} placeholder="Повторите пароль" /><br/>

                            <button type="submit" className="btn btn-primary" onClick={this.registration}> Регистрация </button>
                          </Tab>
                        </Tabs>
                    </div>
                    {this.state.informers.map(
                        (informer, key) => {
                            return (<Informer key={key} message={informer} updateStatus={()=>{}}/>)
                        }
                    )}
                </div>
            )

    }
}



export default AuthenticationUser