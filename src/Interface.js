import React, { Component } from 'react';
import './App.css';
import places from './places.json';

class Interface extends Component {
  displayInt(){
    var divInt = document.getElementById('Int');
    var btnInt = document.getElementById('Int-btn');
    
    if (divInt.style.left === "0px") {
      divInt.style.left = "-400px";
      btnInt.classList.add('left'); 
    }else{
      divInt.style.left = "0px";
      btnInt.classList.remove('left');
    }
  }


  render() {
    console.log(places);
    console.log(places[0].children[0].name);
    return (
      <div>
      <div id="Int" className="Int" style={{left: 0 }}>

      {  places.map((place, i) =>  <div><h2 className="Int-cat">{place.name}</h2>
        {  place.children.map((child, j) => <p>{child.name}</p>)}
        </div> )}

      </div>
      <button id="Int-btn" className="Int-btn" onClick={this.displayInt} ></button>
      </div>
      );
  }
}

export default Interface;
