import React, { Component } from 'react';
import './App.css';

class Interface extends Component {
  displayInt(){
    var divInt = document.getElementById('Int');
    var btnInt = document.getElementById('Int-btn');
    
    if (divInt.style.width === "400px") {
      divInt.style.width = "0";
      btnInt.classList.add('mg-left');
    }else{
      divInt.style.width = "400px";
      btnInt.classList.remove('mg-left');

    }
  }
  render() {
    return (
      <div>
      <div id="Int" className="Int">
      </div>
      <button id="Int-btn" className="Int-btn" onClick={this.displayInt}></button>
      </div>
      );
  }
}

export default Interface;
