import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiProj from './../../api/Projects'
import ProjectAssignment from './projectAssignment'

class templates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    componentDidMount() {

    }

   componentWillUnmount() {
   }



    render(){
            return(
                <div>
                    Templates
                </div>
            )
    }
}

export default templates