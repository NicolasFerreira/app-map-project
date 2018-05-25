import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import './App.css';
import places from './places.json';
import {  Map, TileLayer, Marker, Popup } from "react-leaflet";
import Carte from './Carte';


var tab = [];//tableau pour déterminer la visibilité
var points = [];//les coordonnées
var names = [];//les noms des lieux

const stamenTonerTiles =
"http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";

const stamenTonerAttr =
'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

class Interface extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      tableau: [],
      names: [],
      mapCenter : [44.4475229, 1.441989],
      zoomLevel : 15,
      tab: [],
    }

    this.Init();
  }

  Init(){
    for (var i=0; i < places.length; i++) {

      for (var j = places[i].children.length - 1; j >= 0; j--) {

        var etat = { visible: false , id: places[i].children[j].id, coords: {} };
        tab.push(etat)

      }
    }
  }
  


  getCoord(id,lieux){

    for (var i = 0; i < tab.length; i++) {    
      var eye = document.getElementById("img#"+id);
      if(id === tab[i].id && tab[i].visible === false ){
        tab[i].visible = true;
        // eye.classList.remove('display-none');
        eye.innerHTML = 'visibility';

      }else if(id === tab[i].id && tab[i].visible === true){
        tab[i].visible = false;
        // eye.classList.add('display-none');
        eye.innerHTML = 'visibility_off';

      }
    } 

    this.setState({ tableau: [] })
    this.setState({ names: [] })
    points = [];
    names = [];

    for (var i = 0; i < tab.length; i++) {
      if(tab[i].visible === true ){

       for (var j = 0; j < lieux.length; j++) {

        for (var k = 0; k < lieux[j].children.length; k++) {
          if(lieux[j].children[k].id === tab[i].id ){

            for (var l = 0; l < lieux[j].children[k].places.length; l++) {
              var coords = [lieux[j].children[k].places[l].lat, lieux[j].children[k].places[l].lon];
              var name = lieux[j].children[k].places[l].name;
              names.push(name);
              points.push(coords);
            }
          }
        }
      }
    }
  }

  this.setState({ tableau: points })
  this.setState({ names: names })

  // console.log(this.state.tableau)
  // console.log(this.state.names)
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

render() {
 return (
  <div>
  <div id="Int" className="Int" style={{left: 0 }}>

  {  places.map((place, i) =>  
    <div key={place + i }>
    <h2 className="Int-cat" id={i} onClick={() => this.displaySouscat(i)}>{place.name}</h2>
    <ul id={'list'+i} className="display-none"> {  place.children.map((child, j) => 
      <li key={child+j}  id={child.id} onClick={() => this.getCoord(child.id,places)}><i id={"img#"+child.id} className="material-icons eye">
      visibility_off</i>{child.name}</li>)} 
    </ul>
    </div> )}
  </div>
  <button id="Int-btn" className="Int-btn" onClick={this.displayInt} ></button>

  <div id="map-position">
  <Map center={this.state.mapCenter} zoom={this.state.zoomLevel}>
  <TileLayer
  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <Carte array={this.state.tableau} names={this.state.names}/>
  </Map>
  </div>
  </div>
  );
}
}
export default Interface;
