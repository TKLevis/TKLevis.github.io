import React, { Component } from 'react';
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from './../data/countries.json';
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component{
    state = {color: "#ffff00"};

    color =["green", "blue", "yellow", "grey", "red"];

    componentDidMount (){
        console.log(mapData);
    }

    countryStyle = {
        fillColor: "red",
        fillOpacity: 0.5,
        color : "brown",
        weight: 1,
        //dashArray: 5
    };





    printToConsole =(event)=>{
        console.log("Clicked")
    };

    changeCountryColor = (event)=>{
        event.target.setStyle(
            {
                color: "green",
                fillColor: this.state.color,
                fillOpacity: 1,
            }
        );     
    };



    //layer represents thing that gets drawn on screen, it uses the country object which contains the geometry(array of points)
    //layer.on ... click / mouseover event: event has a target property which we can use to affect the clicked feature
    onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        console.log(countryName);
        layer.bindPopup(countryName + " ...it is probably beautiful here");

        layer.options.fillOpacity = Math.random();
        //const colorIndex = Math.floor(Math.random() * this.color.length);
        //layer.options.fillColor = this.color[colorIndex];

        layer.on({
            mouseover: this.printToConsole,
            click: this.changeCountryColor,
        });
    };

    //changes the state
colorChange = (event)=>{
    this.setState({color: event.target.value});
};

    render() {
        return  (
            <div>
                <h1 style={{textAlign: 'center'}}>My Map</h1>
                <MapContainer style= {{height:"80vh"}} zoom={2} center={[20, 100]}>
                    <GeoJSON style={this.countryStyle} data={mapData.features} onEachFeature={this.onEachCountry}/>

                </MapContainer>
                <input type="color" value={this.state.color} onChange={this.colorChange}/>
            </div>
        );
    }
}

export default MyMap;