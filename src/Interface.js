import React, { Component } from 'react';
import './App.css';
import places from './places.json';
import {  Map, TileLayer, Marker, Popup } from "react-leaflet";
import Carte from './Carte';

class Interface extends Component {
  state = {
    test: "0",
  }

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

  displaySouscat(i){

    var list =  document.getElementById('list'+i);
    if ( list.classList.contains("display-none")) {

      list.classList.remove('display-none');
    }else{
      list.classList.add('display-none');
    }
  }
  

  getCoord(lieux){
    for (var i = lieux.length - 1; i >= 0; i--) {
       console.log(lieux[i]);
       
        
    }
  }


  render() {
    console.log(places);
    return (
      <div>
      <Carte opacity="1"/>

      <div id="Int" className="Int" style={{left: 0 }}>

      {  places.map((place, i) =>  <div key={place + i }><h2 className="Int-cat" id={i} onClick={() => this.displaySouscat(i)}>{place.name}</h2>
        <ul id={'list'+i} className="display-none"> {  place.children.map((child, j) => <li key={child+j}  onClick={() => this.getCoord(child.places)}>{child.name}</li>)} </ul>
        </div> )}
        
      </div>
      <button id="Int-btn" className="Int-btn" onClick={this.displayInt} ></button>
      </div>
      );
  }
}

export default Interface;
