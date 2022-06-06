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
        console.log(w + " : " + h)
        canvas.setAttribute('width', w); // Меняем ширину canvas элемента
        canvas.setAttribute('height', h); // Меняем ширину canvas элемента


        const mainWidth = canvas.getBoundingClientRect().width
        let xStart = 10
        let xStep
        if (this.state.objects.length > 0){
            xStep = mainWidth / this.state.objects.length
        }

        if (this.state.objects.length>0){
            console.log(this.state.objects)
        }

        objects.map(
            (object, key) => {
                if (key+1 < objects.length){
                    ctx.beginPath();
                    ctx.strokeStyle = 'gray';
                    ctx.moveTo(xStart, 30);
                    ctx.lineTo(xStart+xStep, 30);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.fillStyle = 'blue';
                ctx.arc(xStart, 30, 5, 0, 2 * Math.PI);
                ctx.fillText('(' + object.name + ')', xStart, 30 +30);
                ctx.fill();

                xStart = xStart+xStep
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
            //console.log(response.data.objects)
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