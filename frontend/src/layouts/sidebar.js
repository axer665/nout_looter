import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../components/informer/main'
import Menu from './../components/menu/sideBarMenu'

class sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        console.log(props)
    }


   componentDidMount() {
   }

   componentWillUnmount() {
   }

    render(){

        return(
            <div className="container-sidebar">
                <Menu projectId={this.props.projectId} selectedTab={this.props.tabSelected} user={this.props.user}/>
            </div>
        )

    }
}

export default sidebar