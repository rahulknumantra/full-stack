import React, { Component } from 'react'

export default class Counter extends Component {
    //this funtion used when component updated
componentDidUpdate(preProps,prevState){
    console.log("preProps",preProps.number);
    if(preProps.number !== this.props.number){
        console.log("Component updated");
    }
}

  render() {
    return (
      <div>
       <h1>{this.props.number >= 0 ? this.props.number : 0}</h1>
      </div>
    )
  }
}
