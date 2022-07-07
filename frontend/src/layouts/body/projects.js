import React, { useState } from 'react'
import ApiProj from './../../api/Projects'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { Routes, Route, useParams } from 'react-router-dom';

import './../style/body.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'
import Body from './../body'

const Projects = (props) => {
    const [connect, setConnect] = useState(0);

    const params = useParams()
    const projType = params.type

    return (
        <Body content={props.content} key={projType} type={projType} user={props.user} />
    )

}


export default Projects