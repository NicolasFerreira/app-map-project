import React, { Component } from 'react';
import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";


const stamenTonerTiles =
"http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";

const stamenTonerAttr =
'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';class Carte extends Component {
 constructor(props) {
   super(props);
   this.state = {
     mapCenter : [44.4475229, 1.441989],
     zoomLevel : 15
   };
 }
 
 componentDidMount() {
   fetch(
     "https://api.openweathermap.org/data/2.5/forecast?q=Cahors,fr&lang=fr&appid=3b2086e0bc075921948dadd86108f378"
     )
   .then(res => res.json())
   .then(resultat => {
     if (resultat.city) {
       this.setState({
         isLoaded: true,
         information: resultat
       });
     } else {
       this.setState({
         isLoaded: false,
         error: "Ville Introuvable"
       });
     }
     console.log(resultat);
   });
 }
 
 render() {
   return (
     <div id="map-position">
     <Map center={this.state.mapCenter} zoom={this.state.zoomLevel}>
     <TileLayer
     attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     </Map>
     </div>
     );
 }
}

export default Carte;