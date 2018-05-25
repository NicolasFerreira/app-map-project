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
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
        eye.innerHTML = 'visibility';

      }else if(id === tab[i].id && tab[i].visible === true){
        tab[i].visible = false;
        eye.innerHTML = 'visibility_off';

      }
    } 

    this.setState({ tableau: [] })
    points = [];

    for (var i = 0; i < tab.length; i++) {
      if(tab[i].visible === true ){

       for (var j = 0; j < lieux.length; j++) {

        for (var k = 0; k < lieux[j].children.length; k++) {
          if(lieux[j].children[k].id === tab[i].id ){

            for (var l = 0; l < lieux[j].children[k].places.length; l++) {
              var datas = {lieu: lieux[j].children[k].places[l], icon: lieux[j].children[k].name};
              points.push(datas);
            }
          }
        }
      }
    }
  }

  this.setState({ tableau: points })
  console.log(this.state.tableau)
}

displayInt(){
  var divInt = document.getElementById('Int');
  var btnInt = document.getElementById('Int-btn');
  var arrow = document.getElementById('arrow');

  if (divInt.style.left === "0px") {
    divInt.style.left = "-350px";
    btnInt.classList.add('left'); 
    arrow.innerHTML = 'keyboard_arrow_right';
  }else{
    divInt.style.left = "0px";
    btnInt.classList.remove('left');
    arrow.innerHTML = 'keyboard_arrow_left';
  }
}

displaySouscat(i){
  var list =  document.getElementById('list'+i);
  var addCat = document.getElementById('add-cat'+i);
  if ( list.classList.contains("display-none")) {
    list.classList.remove('display-none');
    addCat.innerHTML = "remove";
  }else{
    list.classList.add('display-none');
    addCat.innerHTML = "add";
  }
}

getTile(couleur){
  if(couleur === "color"){
    this.setState({ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' })
  }else if(couleur === "grey"){
     this.setState({ url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png' })
  }else if(couleur === "sat"){
     this.setState({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' })
  }

}

render() {
 return (
  <div>
  <div id="Int" className="Int" style={{left: 0 }}>
  <div className="Int-header">
  <h2>VILLE DE CAHORS</h2>
  </div>

  {  places.map((place, i) =>  
    <div key={place + i }>
    <h2 className="Int-cat" id={i} onClick={() => this.displaySouscat(i)}>
    <i id={"add-cat"+i} class="material-icons">add</i>
    {(place.name).toUpperCase()}
    </h2>
    <ul id={'list'+i} className="display-none"> {  place.children.map((child, j) => 
      <li key={child+j}  id={child.id} onClick={() => this.getCoord(child.id,places)}>
      <i id={"img#"+child.id} className="material-icons eye">visibility_off</i>
      {child.name}
      </li>)} 
    </ul>
    </div> )}
  </div>
  <button id="Int-btn" className="Int-btn" onClick={this.displayInt} ><i id="arrow" class="material-icons">keyboard_arrow_left</i></button>

  <div id="map-position">
  <Map center={this.state.mapCenter} zoom={this.state.zoomLevel}>
  <TileLayer
  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  url={this.state.url}
  />

 
  <Carte array={this.state.tableau} names={this.state.names}/>
  </Map>

  </div>

  <div className='App-tiles'>
    <div className='App-tiles-color'  onClick={() => this.getTile('color')} ></div>
    <div className='App-tiles-grey' onClick={() => this.getTile('grey')}></div>
    <div className='App-tiles-sat' onClick={() => this.getTile('sat')}></div>
  </div>
  </div>
  );
}
}
export default Interface;
// 
//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
//http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png
//https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}