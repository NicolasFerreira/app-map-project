import React, { Component } from 'react';
import { render } from "react-dom";
import places from './places.json';
import {  Map, TileLayer, Marker, Popup  } from "react-leaflet";


const stamenTonerTiles =
"http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";

const stamenTonerAttr =
'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';


class Carte extends Component {
 constructor(props) {
   super(props);
   this.state = {
     mapCenter : [44.4475229, 1.441989],
     zoomLevel : 15
   };
 }

listMarkers() {
    const listFinal = [];
    for (var i=0; i < places.length; i++) {
      
        for (var j = places[i].children.length - 1; j >= 0; j--) {
          
          for (var k = places[i].children[j].places.length - 1; k >= 0; k--) {
            
            var lat = places[i].children[j].places[k].lat;
            var lon = places[i].children[j].places[k].lon;
      
            listFinal.push(<Marker position={[lat,lon]}></Marker>);
          }
        }

    }
    return listFinal;
}

 
 
 render() {
 
   return (
     <div id="map-position">
     <Map center={this.state.mapCenter} zoom={this.state.zoomLevel}>
     <TileLayer
     attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     
      {this.listMarkers()}

     </Map>
     
     </div>
     );
 }
}

export default Carte;