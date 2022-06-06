import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import $ from 'jquery';
import {Popover, OverlayTrigger, Overlay, Button} from 'react-bootstrap';
import {faComment} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactSlider from 'react-slider'

class projectInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.data.id,
            criterionId: props.data.criterion_id,
            value: props.data.criterion_value,
            listId: props.data.list_id,
            name: (props.data.criterion_data) ? props.data.criterion_data.name : null,
            footnote: props.data.footnote,
        }
    }


   componentDidMount() {

   }

   componentWillUnmount() {
   }

   handleEvent = (event) => {
        let value = $(event.target).html()
        let criterion = {
            id : this.state.id,
            value : value
        }
        this.props.assignGrade(criterion)
   }

   editFootnote = (event) => {
        let criterion = {
           id : this.state.id,
           value : event.target.value
        }
        this.props.assignFootnote(criterion)
        this.setState({
            footnote : event.target.value
        })
   }

    render(){
        let mark = [0, 100]
        if (this.props.data.confirmed_last_criterion)
            mark = [0, this.props.data.confirmed_last_criterion.value, 100]


        let overlay
        if (this.props.data.confirmed_last_criterion){
            if (this.props.data.confirmed_last_criterion.footnote){
                const popover = (
                  <Popover id="popover-basic">
                    <Popover.Header as="h3">
                        Комментарий к результату предыдущей проверки
                    </Popover.Header>
                    <Popover.Body>
                        {this.props.data.confirmed_last_criterion.footnote}
                    </Popover.Body>
                  </Popover>
                );
                const Example = () => (
                    //trigger="click"
                    <div>
                        <OverlayTrigger  placement="left" overlay={popover}>
                            <span className="cl_criterion-footnote-icon"><FontAwesomeIcon icon={faComment} /></span>
                        </OverlayTrigger>
                    </div>
                );
                overlay = <Example />
            }
        }
        if (this.state.name){
            return(
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">

                    <div className="cl_criterion-name">
                        {this.state.name}
                    </div>
                    <div className="cl_criterion-value">
                        <ReactSlider
                            className="horizontal-slider"
                            marks={mark}
                            defaultValue={this.state.value}
                            markClassName="example-mark"
                            min={0}
                            max={100}
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            renderThumb={(props, state) => <div {...props} onMouseUp={ this.handleEvent }><p>{state.valueNow}</p></div>}
                            renderMark={(props) => {
                                if (props.key != 0 && props.key != 100){
                                    return (
                                        <div key={props.key+this.state.id}>
                                            <div className="example-mark-line" style={{width:props.style.left}}>
                                            </div>
                                            <div {...props} className="example-mark-number">
                                                <p>{props.key}</p>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    let controlClass
                                    if (props.key == 0)
                                        controlClass = "example-mark-control start"
                                    else if (props.key == 100)
                                        controlClass = "example-mark-control finish"
                                    return (
                                        <div key={this.state.id+props.key+Math.random()} className={controlClass}>
                                            <p>
                                                {props.key}%
                                            </p>
                                            <div></div>
                                        </div>
                                    )
                                }
                              }}
                        />
                    </div>
                    <div className="cl_criterion-footnote">
                        <textarea defaultValue={this.state.footnote} onChange={this.editFootnote} />
                        {overlay}
                    </div>
                </div>
            )
        } else {
            return null
        }

    }
}

export default projectInfo