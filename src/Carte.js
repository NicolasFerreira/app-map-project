import React, { Component } from 'react';
import { render } from "react-dom";
import places from './places.json';
import {  Map, TileLayer, Marker, Popup  } from "react-leaflet";




class Carte extends Component {

	render() {
		return (
			<div>
			{ this.props.array.map((data,i) => <Marker position={[data.lat,data.lon]}>
				<Popup>
				<span>
				<h3>{data.name }</h3>
				<p>{data.description}</p>
				</span>
				</Popup>

				</Marker>)}
			</div>
			);
	}
}

export default Carte;