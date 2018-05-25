import React, { Component } from 'react';
import { render } from "react-dom";
import places from './places.json';
import {  Map, TileLayer, Marker, Popup  } from "react-leaflet";
import L from 'leaflet';


var iconPerson = new L.Icon({
					iconUrl: require('./img/tile-color.png'),
					iconSize: new L.Point(60, 75),
					className: 'leaflet-div-icon'
				});



class Carte extends Component {

	constructor(props) {
    super(props);    
    this.state = {
      icon: iconPerson,
    }

    
  }

	getIcons(icon){

		if(icon === 'Parkings'){
			var iconPerson = new L.Icon({
					iconUrl: require('./img/parking.png'),
					iconSize: new L.Point(60, 60),
					className: 'leaflet-div-icon'
				});
		}else if(icon === 'Arrêts de bus'){
      var iconPerson = new L.Icon({
					iconUrl: require('./img/bus.png'),
					iconSize: new L.Point(60, 60),
					className: 'leaflet-div-icon'
				});
		}else if(icon === 'École Maternelle'){
      var iconPerson = new L.Icon({
					iconUrl: require('./img/maternelle.png'),
					iconSize: new L.Point(60, 60),
					className: 'leaflet-div-icon'
				});
		}else if(icon === 'École Primaire'){
      var iconPerson = new L.Icon({
					iconUrl: require('./img/primaire.png'),
					iconSize: new L.Point(60, 60),
					className: 'leaflet-div-icon'
				});
		}else if(icon === 'Récup Verre'){
      var iconPerson = new L.Icon({
					iconUrl: require('./img/verre.png'),
					iconSize: new L.Point(60, 60),
					className: 'leaflet-div-icon'
				});
		}else{
			var iconPerson = new L.Icon({
					iconUrl: require('./img/decheterie.png'),
					iconSize: new L.Point(60, 60),
					className: 'leaflet-div-icon'
				});
		}
		

		return iconPerson;

	}

	render() {
		
		return (
			<div>
			{ this.props.array.map((data,i) => 

				 
				<div>
				
				<Marker icon={this.getIcons(data.icon)} position={[data.lieu.lat,data.lieu.lon]}>
				
				<Popup>
				<span>
				<h3>{data.lieu.name }</h3>
				<p>{data.lieu.description}</p>
				</span>
				</Popup>

				</Marker>
				</div>)}
			</div>
			);
	}
}

export default Carte;