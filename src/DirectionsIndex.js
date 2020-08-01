import React, { Component } from "react";
import { compose, withProps } from "recompose";
import DirectionRenderComponent from "./DirectionRenderComponent";
//import { G_API_URL } from "../../utility/constants";
//import DummyLocations from "../../utility/dummyLocations";
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");
class Directions extends Component {
  state = {
    defaultZoom: 14,
    map: null,
    center: { lat: 43.65922670222524, lng: -79.38266328512647 },
    origin: { lat: 43.65922670222524, lng: -79.38266328512647 },
    destination: { lat: 43.649051, lng: -79.381694 }

  };
  render() {




    return (
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
      >
      {
    //    {DummyLocations.map((elem, index) => {
//          return (
    //        <DirectionRenderComponent
    //          key={index}
    //          index={index + 1}
    //          strokeColor={elem.strokeColor}
    //          from={elem.from}
    //          to={elem.to}
    //        />
    //      );
  //      })}
      }
      <DirectionRenderComponent

            //strokeColor={elem.strokeColor}
               from={this.state.origin}
               to={this.state.destination}
             />
      </GoogleMap>
    );

  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIri09wgE5LtGALmNIk1ubBbBTIhTe2O8&&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);
