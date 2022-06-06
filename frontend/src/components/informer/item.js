import React, { Component } from 'react';

import './style.scss';

class Informer extends Component {

  constructor(props){
    super(props)
    this.state = {
        lifeTime : 10000,
        id : props.id,
        message : props.message,
        status : 0
    }
  }

  timeOut = () => {
    setTimeout(()=>{
        if (this.props.updateItems){
            this.setState({'status':1})
            //this.props.updateItems(this.state)
        }
    }, this.state.lifeTime);
  }

  render() {
    this.timeOut()
    if (this.state.message){
        return (
            <div className="informer-container-item">
                {this.state.id} :
                {this.state.message} :
                {this.state.status}
            </div>
          )
    } else {
        return null
    }
  }
}

export default Informer;