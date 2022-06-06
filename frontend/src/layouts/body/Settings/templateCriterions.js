import React, { useState, useCallback } from 'react'
import ReactDOM from "react-dom"
import { Routes, Route, useParams } from 'react-router-dom'
import Axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../../components/informer/main'
import ApiSettings from './../../../api/Settings'
import Dropzone from "./../../../components/DnD/dropzone"

import Gear from './../../../../src/images/menu/gear.png'

var connect = 0

const Project = (props) => {
    const [connect, setConnect] = useState(0);
    const [newTemplateCriterionName, setNewTemplateCriterionname] = useState('')
    const [criterions, updateCriterions] = useState(null)

    const params = useParams()
    const templateId = params.id

    function sortedCriterions(result){
        if (!result.destination) return;

        const items = Array.from(criterions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCriterions(items)

        const headers = ApiSettings.getHeaders()
        const data = {
            items : items
        }
        Axios.post('http://192.168.160.62:84/api/settingsSortedTemplateCriterions', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data)
            //this.getObjects()
        })
    }


    const editNewTemplateCriterionName = (event) => {
        setNewTemplateCriterionname(event.target.value)
    }

    const addNewTemplateCriterion = () => {
        //console.log(newTemplateCriterionName)
        if (newTemplateCriterionName){
            const headers = ApiSettings.getHeaders()
            const data = {
                template_id : templateId,
                name : newTemplateCriterionName,
                order : criterions.length * 100 + 100
            }
            Axios.post('http://192.168.160.62:84/api/createTemplateCriterion', data, {
                headers: headers
            })
            .then((response) => {
                criterions.push(response.data.templateCriterion)
                setConnect(criterions.length)
            })
        } else {
            console.log('newTemplateCriterionName is null')
        }
    }

    if (!criterions){
        ApiSettings.getTemplateCriterions({templateId : templateId})
        .then(response => {
            console.log('get criterions : ')
            console.log(response.data)
            updateCriterions(response.data.criterions)
        })
    }

    if (criterions) {
        let domCriterions = criterions.map((criterion, key) => {
            return (<div key={key}> {criterion.name} </div>)
        })

        let header = (
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center container-lists-header">
                <div className="template_criterions_list-number_header">
                    #
                </div>
                <div className="template_criterions_list-name_header">
                    Наименование
                </div>
            </div>
        )

        let addTemplateCriterion = (
            <div className="template_criterions_list-add">
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center template_criterions_list-item">
                    <div className="template_criterions_list-number">

                    </div>
                    <div className="template_criterions_list-name">
                        <input type="text" defaultValue={newTemplateCriterionName} onChange={editNewTemplateCriterionName} />
                    </div>
                    <div className="template_criterions_list-control">
                        <button type="button" className="btn btn-outline-success" onClick={addNewTemplateCriterion}>add</button>
                    </div>
                </div>
            </div>
        )

        let MainBlock = "col-12",
            SideBarBlock, sideBar, IndentLeft, IndentRight,
            Container = "container"

        if (sideBar){
            MainBlock = "col-8"
            IndentLeft = "col-1"
            IndentRight = "col-1"
            SideBarBlock = "col-2"
            Container = "container-fluid h-100"
        }

        let mainContent = (
            <div className="container-templates cl-w80">
                <div className="container-lists-template_criterions">
                    {header}
                    <DragDropContext onDragEnd={sortedCriterions}>
                      <Droppable droppableId="criterions">
                        {(provided) => (
                          <div className="template_criterions_list-items" {...provided.droppableProps} ref={provided.innerRef}>
                            {criterions.map(({id, name}, index) => {
                              let identificator = String(id)
                              return (
                                <Draggable key={identificator} draggableId={identificator} index={index}>
                                  {(provided) => (
                                    <div className="d-flex template_criterions_list-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      <div className="template_criterions_list-number">
                                        { index }
                                      </div>
                                      <div className="template_criterions_list-name">
                                        { name }
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    {addTemplateCriterion}
                </div>
            </div>
        )

        return (
            <div className={Container}>
                <div className="row h-100">
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={IndentLeft}>
                    </div>
                    <div className={MainBlock}>
                        {mainContent}
                    </div>
                    <div className={IndentRight}>
                    </div>
                </div>
            </div>
        )

    } else {
        return null
    }

}


export default Project