import React, { useState, useEffect } from 'react';
import { Map, Marker, Polyline, DirectionsRenderer, InfoWindow, GoogleApiWrapper } from 'google-maps-react'


const google = window.google

export class MapContainer extends React.Component {


  constructor(){
      super();
      this.state = {

        placeID : "ChIJvUYHUcs0K4gRN8i7jHsUiYs",
        lat : 43.654640,
        long : -79.380710,
        origin: { lat: 43.65922670222524, lng: -79.38266328512647 },
        destination: { lat: 43.649051, lng: -79.381694 }

      };

  }


  componentDidMount() {

    const directionsService = new google.maps.DirectionsService();

          directionsService.route(
            {
              origin: this.props.origin,
              destination: this.props.destination,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              console.log("Result:")
              console.log(result)
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );

  }


  render() {
    const mapStyles = {
      width: "30%",
      height: "50%",
      display: 'block',
      margin: '0 auto'
    };

    const pathCoordinates = [
        { lat: 43.65922670222524, lng: -79.38266328512647 },
        { lat: 43.649051, lng: -79.381694 }
    ];

    // don't display anything if null - only display once location is loaded
    // next steps:
    // 1. set default starting locations, if loc not found (set based on ip addr?)
    // 2. need to allow users to enter addr
    if(!this.props.position){
      return null;
    }





    return (

      <Map
        google={this.props.google}
        zoom={15}

        style={mapStyles}
        initialCenter={{ lat: this.props.position.latitude, lng: this.props.position.longitude }}
        origin={this.state.origin} destination={this.state.destination}
      >
        <Marker key="currMarker" position = {{ lat: this.props.position.latitude, lng: this.props.position.longitude }} />
        {//<Polyline
        //       path={pathCoordinates}
        //       geodesic={true}
        //       options={{
      //             strokeColor: "#ff2527",
      //             strokeOpacity: 0.75,
      //             strokeWeight: 2,
          //         icons: [
        //               {

            //               offset: "0",
              //             repeat: "20px"
              //         }
            //       ]
            //   }}
        //   />

}
      </Map>

    );
  }
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyBIri09wgE5LtGALmNIk1ubBbBTIhTe2O8'
})(MapContainer);
