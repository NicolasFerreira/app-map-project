import React, { Component } from 'react';
import { render } from "react-dom";
import places from './places.json';
import {  Map, TileLayer, Marker, Popup  } from "react-leaflet";




class Carte extends Component {
 



render() {

 return (
   <div>
   {this.props.listMarkers}
   </div>
   );
}
}

export default Carte;