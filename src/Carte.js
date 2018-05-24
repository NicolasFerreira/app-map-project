import React, { Component } from 'react';
import { render } from "react-dom";
import places from './places.json';
import {  Map, TileLayer, Marker, Popup  } from "react-leaflet";




class Carte extends Component {
 



render() {
 return (
   <div>
   { this.props.array.map((position,i) => <Marker position={position}></Marker>)}
   </div>
   );
}
}

export default Carte;