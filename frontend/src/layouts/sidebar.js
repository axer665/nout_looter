import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../components/informer/main'
import Menu from './../components/menu/sideBarMenu'
import ApiUser from './../api/User'

class sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userAssignments : null,
            key : 0,
        }
        //console.log('SIDEBAR PROPS : ')
        //console.log(props)
    }

    getUserAssignmentsInProject(){
        if (this.props.user)
            ApiUser.getProjectAssignments({'userId': this.props.user.id, 'projectId': this.props.projectId})
            .then(response => {
                //console.log( ' SidebarUserAssignments : ' )
                //console.log(response.data)
                this.setState({
                    userAssignments : response.data.assignments,
                    key : this.state.key+1
                })
            })
    }

    componentDidMount() {
        this.getUserAssignmentsInProject()
    }

    componentWillUnmount() {
    }

    render(){

        return(
            <div className="container-sidebar">
                <Menu key={this.state.key} projectId={this.props.projectId} selectedTab={this.props.tabSelected} user={this.props.user} userAssignments={this.state.userAssignments} />
            </div>
        )

    }
}

export default sidebar