import React, { Component } from 'react'
import Counter from './Counter';

export default class Lifecycle extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    console.log("componentDidMount : This lifecycle methods runs WHEN COMPOENT RENDERS FIRST TIME");
  }

  Increament = () => {
    // console.log("arrow fun", this.state);
    this.setState({ count: this.state.count + 1 })
  }
  Decrement() {

    this.setState({ count: this.state.count - 1 })
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.Decrement() }}>Decrease</button>
        {/* <h1>{this.state.count >= 0 ? this.state.count : 0}</h1> */}
        <Counter number={this.state.count}></Counter>
        <button onClick={() => { this.Increament() }}>Incraese</button>
      </div>
    )
  }
}
