import React, { Component } from 'react';

import $ from 'jquery';

import './style.scss';

import Item from './item'

class Informer extends Component {

  constructor(props){
    super(props)
    this.state = {
        message : props.message,
        status : 0,
    }

  }

    timeOut = (status) => {
        //console.log(status)
        if (!status)
            setTimeout( ()=>{
                    this.setState({'status':1})
                    console.log('tik')
                    this.props.updateStatus(this.state)
                }, 4000);

    }

  addItem = (item) => {

  }

  componentDidMount() {

    let items = $('.informer-container')

    let lastItem = items[items.length-1]

    if (items.length > 0){

        let itemsArray = Array.prototype.reverse.call(items);

        itemsArray.filter((id, item) => {
            let thisPosition = item.getBoundingClientRect()
            let nextItem = items[id+1]
            if (nextItem){
                nextItem.style.top = thisPosition.top + thisPosition.height + 32 + 'px'
                console.log(nextItem)
            }
        })
    }
  }

  render() {
    this.timeOut(this.state.status)

    if (this.state.status == 0){
        return (
                    <div className="informer-container">
                        {this.state.message}
                    </div>
               )
    } else {
        return null
    }
  }
}

export default Informer;