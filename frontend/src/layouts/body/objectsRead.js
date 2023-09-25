import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Informer from './../../components/informer/main'
import ApiObj from './../../api/Objects'
import ObjectInfo from './objectInfo'

class projectInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectId : this.props.projectId,
            objects : [],
            objectTypes : []
        }
        this.getObjects()
    }

    graph = (objects) => {
        const canvas = document.getElementById('objects_line');
        const ctx = canvas.getContext('2d');

        let container = document.getElementById('container-objects_line');
        let w = container.getBoundingClientRect().width
        let h = container.getBoundingClientRect().height
        //console.log(w + " : " + h)
        canvas.setAttribute('width', w); // Меняем ширину canvas элемента
        canvas.setAttribute('height', h); // Меняем ширину canvas элемента


        const mainWidth = canvas.getBoundingClientRect().width
        let xStart = 10
        let xStartLine = 10
        let xStep

        if (this.state.objects.length > 0){
            xStep = (mainWidth-30) / (this.state.objects.length - 1)
        }
        //console.log(this.state.objects.length)
        //console.log(xStep)

        if (this.state.objects.length>0){
            //console.log(this.state.objects)
        }

        objects.map(
            (object, key) => {
                let yPos
                let topDown
                if (key % 2){
                    yPos = 60
                } else {
                    yPos = 10
                }
                //console.log(key % 2)

                if (key+1 < objects.length){
                    ctx.beginPath();
                    ctx.strokeStyle = 'gray';
                    ctx.moveTo(xStart, 30);
                    ctx.lineTo(xStart+xStep, 30);
                    ctx.stroke();
                }

                let oName
                console.log(object.short_name)
                if (object.short_name)
                    oName = object.short_name
                else if (object.name)
                    oName = object.name

                ctx.beginPath();
                ctx.fillStyle = 'blue';
                ctx.font = "12px Arial";
                ctx.arc(xStart, 30, 5, 0, 2 * Math.PI);
                //ctx.measureText(object.name).width = 50
                let widthLength = xStart + ctx.measureText(oName).width
                if (widthLength > mainWidth){
                    //xStart = widthLength - (ctx.measureText(object.name).width * 2)
                }
                if (key+1 == objects.length && objects.length>1){
                    xStart = widthLength - (ctx.measureText(oName).width * 2)
                    yPos = yPos + 30
                } else if (objects.length == 1){
                    xStep = ctx.measureText(oName).width
                }

                ctx.fillText('(' + oName + ')', xStart, yPos, xStep*2-10);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(xStartLine, 30);
                ctx.lineTo(xStartLine, yPos);
                ctx.stroke();

                xStart = xStart+xStep
                xStartLine = xStartLine+xStep

            }
        )
    }

   componentDidMount() {

   }

   componentWillUnmount() {
   }

    getObjects = () => {
        ApiObj.getObjects({projectId:this.state.projectId})
        .then(response => {
            console.log("OBJECTS : ")
            console.log(response.data)
            this.setState({
                objects : response.data.objects,
                objectTypes : response.data.objectsCounts
            })

            this.graph(response.data.objects)
        })
    }

    render(){


        return(
            <div>

                <div className="container-object_types">
                    <div className="row">
                        {this.state.objectTypes.map(
                            (type, key) => {
                                return (
                                    <div key={key} className="col-3 text-center">
                                        <h1 className="head-blue">{type.count}</h1>
                                        <br/>
                                        <h4 className="head-blue"> {type.typeName} </h4>
                                    </div>)
                            }
                        )}
                    </div>
                </div>

                <div id="container-objects_line" className="container-objects_line">
                    <canvas id="objects_line" width="500" height="120"></canvas>
                </div>

                <br/>

                <table className="table-blue table-project_objects font-s14">
                    <thead>
                    <tr>
                        <th>
                            Тип объекта
                        </th>
                        <th>
                            Наименование
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.objects.map(
                            (object, key) => {
                                return ( <ObjectInfo key={key} object={object} /> )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        )

    }
}

export default projectInfo