import React from 'react'
import ApiProj from './../../api/Projects'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'

class projects extends React.Component {
    constructor(props) {
      super(props)
      console.log(props)
    }

   componentDidMount() {
   }

   componentWillUnmount() {
   }

    render(){



        return (

             <div> test {this.props.number} </div>

        )
    }
}

export default projects