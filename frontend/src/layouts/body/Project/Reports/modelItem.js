import React from 'react'
import Axios from 'axios'
import {Link, Navigate} from 'react-router-dom'
//

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../../components/informer/main'
import Menu from './../../../../components/menu/sideBarMenu'
import ApiModel from './../../../../api/Models'
import history from './../../../../components/history';

class modelItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            objectData : this.props.objectData,
            sectionData : this.props.stageData,
            stageData : this.props.stageData,
            id : this.props.id,
            name : this.props.name,
            checkLists : this.props.checkLists,

            selectedCheckList : null,
            date : null,
        }
        //console.log(this.state)

    }


    componentDidMount() {
        this.maxDate()
    }

    componentWillUnmount() {
    }

    maxDate = () => {
        let maxDate = new Date('2000-01-01 00:00:00'),
            selectedCheckList = null

        if (this.state.checkLists.length > 0){
            this.state.checkLists.map(list => {
                selectedCheckList = list.id
                if (list.confirmed_criterion){
                    if (new Date(list.confirmed_criterion.date) > maxDate){
                        maxDate = list.confirmed_criterion.date
                    }
                } else {
                    maxDate = 0
                }
            })
        } else {
            maxDate = 0
        }

        this.setState({
            date : maxDate,
            selectedCheckList : selectedCheckList
        })
    }

    render(){
        let object, objectType, checkLists="no"
        if (this.state.objectData){
            object = this.state.objectData.name
            if (this.state.objectData.object_type)
                objectType = this.state.objectData.object_type.name
        }

        let modelAddClass = "d-flex flex-row bd-highlight mb-3 models_view_list-item justify-content-center checkFalse"

        return(

            <div className="d-flex flex-row bd-highlight mb-3 models_view_list-item justify-content-center" >
                <div className="models_view_list-object_name">
                    {object}
                </div>
                <div className="models_view_list-object_type">
                    {objectType}
                </div>
                <div className="models_view_list-model_stage">
                    {this.state.stageData.short_name}
                </div>
                <div className="models_view_list-model_name">
                    {this.state.name}
                </div>
                <div className="models_view_list-date">
                    {this.state.date}
                </div>
            </div>

        )

    }
}

export default modelItem