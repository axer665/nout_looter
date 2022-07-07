import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import Templates from './templates'

class settings extends React.Component {
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
            let templates = <Templates />

            return (
                <>
                    {templates}
                </>
            )


    }
}

export default settings