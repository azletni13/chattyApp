import React, {Component} from 'react';

class Online extends Component{

  render() {
    return (
      <nav>
        <h1>Chatty</h1>
        <span>{this.props.currentOnline} users online</span>
      </nav>
    )
  }
}

export default Online;