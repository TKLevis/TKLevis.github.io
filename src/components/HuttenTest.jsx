import React, { Component } from 'react';
import { Map, MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import huttenData from './../data/Hutten.json';
import iconPath from './../data/Icon.png';
import L from 'leaflet';
import proj4 from 'proj4';


class HuttenTest extends Component{
    state = {};

    markerIcon = new L.Icon({
        iconUrl: require('./../data/Icon.png'),
        iconSize: [35, 45],
    });

    

    componentDidMount (){
        {huttenData.features.map(hut => (
        console.log(hut.properties.Name),
        console.log([hut.geometry.coordinates[1], hut.geometry.coordinates[0]]),
        console.log(proj4('+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs', [hut.geometry.coordinates[1], hut.geometry.coordinates[0]]))
    ))}
        }


    render() {
        return  (
            <div>
                <h1 style={{textAlign: 'center'}}>Franken Adventure</h1>
                <MapContainer style= {{height:"80vh"}} center={[49.477268, 10.989780]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {huttenData.features.map(hut => (
        <Marker
        key = {hut.properties.id}
        position = {proj4('+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs', [hut.geometry.coordinates[1], hut.geometry.coordinates[0]])}
        icon={this.markerIcon}
        >
            <Popup>
                <body>
                <b>{hut.properties.Name}</b> <br></br>
                {hut.properties.Datum} <br></br>
                {hut.properties.Beschreib} <br></br>
                <button> click </button>

                </body>
                
            </Popup>
        </Marker>

      ))}

</MapContainer>

<h1 style={{textAlign: 'center'}}>created by Timo Kindl using react-leaflet and QGIS data</h1>

            </div>
        );
    }
}

export default HuttenTest;