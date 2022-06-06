import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
//import ReactCSSTransitionGroup from 'react-transition-group';

import ApiSettings from './../../../../api/Settings'
import ProjectType from './projectType'

class settingsProjectTypes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            types : props.types,

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){

            let header = (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                    <div className="s_project_types_list-item-name_header">
                        Наименование
                    </div>
                </div>
            )

            var types = []
            if (this.state.types)
                types = this.state.types.map((type, key) => {
                    return (<ProjectType key={key} type={type} />)
                })

            return (
                <div className="container-settings-lists-project_types">
                    {header}
                    <CSSTransition
                              in={true}
                              classNames="list-transition"
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={300}
                              timeout={400}
                              appear
                            >
                            <>
                                {types}
                            </>
                    </CSSTransition>
                </div>
            )
    }
}

export default settingsProjectTypes