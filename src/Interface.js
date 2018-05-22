import React, { Component } from 'react';
import './App.css';
import places from './places.json';

class Interface extends Component {
  displayInt(){
    var divInt = document.getElementById('Int');
    var btnInt = document.getElementById('Int-btn');
    
    if (divInt.style.left == "0px") {
      divInt.style.left = "-400px";
      btnInt.classList.add('left'); 
    }else{
      divInt.style.left = "0px";
      btnInt.classList.remove('left');
    }
  }


  render() {
    console.log(places);
    console.log(places[0]);
    return (
      <div>
      <div id="Int" className="Int" style={{left: 0 }}>

      {  places.map((place, i) =>  <p>{places[i].name}</p> ) }

      </div>
      <button id="Int-btn" className="Int-btn" onClick={this.displayInt} ></button>
      </div>
      );
  }
}

export default Interface;
