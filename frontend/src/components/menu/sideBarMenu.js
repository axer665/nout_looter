import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'

class sideBarMenu extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        let readiness =  [
                            {
                                id: 0,
                                name: 'О проекте',
                                link: "/project/"+this.props.projectId+"/read",
                            },
                            /*{
                                id: 1,
                                name: "EIR/BEP",
                                link: "/",
                            },*/

                        ]
        if (props.user && props.userAssignments){
            if ((props.user.user_role && props.userAssignments.roles_data.length > 0) || props.userAssignments.roles_ids.manager){
                readiness.push({
                    id: 2,
                    name: "Оценка готовности модели",
                    link: "/project/"+this.props.projectId+"/model_readiness",
                })
            }
            if (props.user.user_role)
                if (Number(props.user.user_role.role_id) == 2 || Number(props.user.user_role.role_id) == 1){
                    readiness.push({
                        id: 3,
                        name: "Оценка готовности модели 2",
                        link: "/project/"+this.props.projectId+"/report",
                    })
                }
        } else if (props.selectedTab == 2){
            readiness.push({
                id: 2,
                name: "Оценка готовности модели",
                link: "/project/"+this.props.projectId+"/model_readiness",
            })
        }


        //console.log('SIDEBAR PROPS :')
        //console.log(props)
        this.state = {
            selectedTab : this.props.selectedTab,
            tabs : readiness
        }
    }


   componentDidMount() {

   }

   componentWillUnmount() {
   }

    render(){
        let activeTab
        let defaultClass="menu-item"
        let tabs = this.state.tabs.map((tab, key) => {
            activeTab = ""
            if (tab.id == this.state.selectedTab)
                activeTab = defaultClass+" selected"
            else {
                activeTab = defaultClass
            }
            return (
                <Link key={key} to={tab.link} >
                    <div className={activeTab}>
                         {tab.name}
                    </div>
                </Link>
            )
        })

        return(
            <div className="container-menu-sidebar">
                {tabs}
            </div>
        )

    }
}

export default sideBarMenu