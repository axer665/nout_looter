import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'

class userMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab : this.props.selectedTab,
            tabs : [
                {
                    id: 0,
                    name: 'Основная информация',
                    link: "/user/"+this.props.user.id+"/main",
                },
                {
                    id: 1,
                    name: "Проекты",
                    link: "/user/"+this.props.user.id+"/projects",
                },

            ]
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
            <div className="d-flex justify-content-start container-menu-user_menu">
                {tabs}
            </div>
        )

    }
}

export default userMenu