import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { usePosition } from 'use-position';
//import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from "./Map";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
import Directions from "./DirectionsIndex";


import Autocomplete from 'react-google-autocomplete';


//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBIri09wgE5LtGALmNIk1ubBbBTIhTe2O8


const apiKey = "AIzaSyBIri09wgE5LtGALmNIk1ubBbBTIhTe2O8";
const defaultZoom = 15;

// if location not enabled, let user know oif t

function App() {

  // origin detected from geolocation
  // this will be used for both origins detected from geolocation,
  // ANd through Autocomplete
  // origin: keys: placeID, lat, lng
  const [origin, setOrigin] = useState(0);

  // origin selected from autocomplete
//  const [originAutoComplete, setOriginAutoComplete] = useState();
  const [destination, setDest] = useState();
  const [url, setUrl] = useState()
  const [loading, setLoading] = useState();
//  you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined


  const [ipAddr, setIPAddr] = useState();






  useEffect(() => {

    if(origin !== undefined){


      // if using current geolocation, get the place id / address from google json api

      // precedence: place id -> addr -> lat/lng
      if(origin.placeID !== undefined && origin.placeID !== ''){
          setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${origin.placeID}&zoom=${defaultZoom}`);
          console.log(`setUrlll - 1: ${url}`)

      }

      else if(origin.addr !== undefined && origin.addr !== ''){
          setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${origin.addr}&zoom=${defaultZoom}`);
          console.log(`setUrlll - 2: ${url}`)

      }

      else if(origin.lat !== undefined && origin.lng !== undefined){

        setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${origin.lat},${origin.lng}&zoom=${defaultZoom}`);
        console.log(`setUrlll - 3: ${url}`)
      }


    }

    // reset the destionation whenever the origin changes
    // b/c otherwise it won't trigger useEFfect for destination changes
    // at least for now, until we implement the randomizing feature
  //  setDestination('');

},[origin.lat, origin.lng]);

/*
  useEffect(() => {

    if(originAutoComplete !== undefined){
      setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${originAutoComplete.placeID}&zoom=${defaultZoom}`);
        console.log(`setUrlll: ${url}`)
    }

  //  setDestination('');


  },[originAutoComplete]);
*/





  useEffect(() => {





        console.log(`setUrlll 2 : ${url}`)



  },[destination]);


// get current location
useEffect(() => {

  // if location is allowed,
  if (navigator.geolocation) {
    console.log("aaa")
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);


    var lat = position.coords.latitude
    var lng = position.coords.longitude


      if (lat !== undefined && lng !== undefined){
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
          .then(res => res.json())
          .then(
              (result) => {
          //      setIsLoaded(true);
            //    setItems(result.items);
            console.log("JSON Result: ")
              console.log(result.results[0].formatted_address)
              //placeID = result.results[0].place_id;


              var addr = result.results[0].formatted_address;
              setOrigin({addr:addr, lat:lat, lng:lng})
              // note: origin.addr is not updated here yet (async)


              //setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${addr}&zoom=${defaultZoom}`);

              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
              //  setIsLoaded(true);
            //    setError(error);

              // if address/place id is not retrieved, just use the lat/lng

            //  setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${origin.lat},${origin.lng}&zoom=${defaultZoom}`);
                console.log(`setUrlll - 3: ${url}`)
              }
            )
          }

        });

  }
  else{


  }

},[]);


// get ip addr
useEffect(() => {

  // only if current location is not enabled
  if(!navigator.geolocation){

  }

  fetch(`https://ipapi.co/json`)
    .then(res => res.json())
    .then(
        (result) => {
          console.log("IP Addr:")
          console.log(result.ip)
        console.log(result.longitude)
        console.log(result.latitude)
      //  setIPAddr(result.ipString)

      setUrl(`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${result.latitude},${result.longitude}&zoom=10`);
      console.log(`setUrlll - using ip: ${url}`)

        },

        (error) => {


        }
      )









}, []);
/*
useEffect(() => {

  fetch(`http://api.ipstack.com/${ipAddr}?access_key=14182789d54e3b723358831c92068d64`)
    .then(res => res.json())
    .then(
        (result) => {
          console.log("lat/long based on IP:")
        console.log(result.latitude + ", " + result.longitude)

        setUrl(`https://www.google.com/maps/embed/v1/view?key=${apiKey}&q=center=${result.latitude},${result.longitude}&zoom=${10}`);
        console.log(`setUrlll - using ip: ${url}`)


        },

        (error) => {


        }
      )


}, [ipAddr]);
*/

  if ("geolocation" in navigator) {
    console.log("Available");

  } else {
    console.log("Not Available");

  }

// also: if user doesn't allow the location, display a map in the current city using console.log(require('util').inspect(, { depth: null }));





console.log("dest:" + {destination});



const setDestination = () => {

    //setDest({ latitude: 43.649051, longitude: -79.381694 })

    //const dest = 'ChIJf3Z9pdI0K4gRMfvVn-uyWpM'
    //setDest(dest)

    //console.log(`setDestination: ${destination}`)

    // better to use dest insteadd of the state variable,
    // b/c it seems to be asynchronous... meaning it can sometimes be undefined
    // (state being assigned after these if cases)
  //  if(dest !== undefined ){



    console.log("origin:::")
    console.log(origin.addr)
    console.log(origin.lat)

    var dest = '';
    const proxyurl = "https://cors-anywhere.herokuapp.com/"

    fetch(proxyurl + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin.lat},${origin.lng}&radius=500&opennow=true&type=restaurant&key=${apiKey}`)
      .then(res => res.json())
      .then(
          (result) => {
      //      setIsLoaded(true);
        //    setItems(result.items);
        console.log("JSON Result - nearby places: ")
          console.log(result)
          //placeID = result.results[0].place_id;



          // note: origin.addr is not updated here yet (async)


          //setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${addr}&zoom=${defaultZoom}`);

          const count = result.results.length
          console.log(`count: ${count}`)

          var random = Math.floor(Math.random() * Math.floor(count+1));

          console.log(`random: ${random}`)

          dest = result.results[random];


            if(result.status == "ZERO_RESULTS"){
              console.log("No results")
            }
            else{
              if(dest !== undefined && dest.place_id !== ''){
                  setDest(dest)
                  console.log(`Destination: ${dest}`)
                  setDestUrl(dest)

                      //returnDestDetails(dest)

              }

            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
          //  setIsLoaded(true);
        //    setError(error);

          // if address/place id is not retrieved, just use the lat/lng

        //  setUrl(`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${origin.lat},${origin.lng}&zoom=${defaultZoom}`);

          }
        )






}

const setDestUrl = (destObject) => {

  // precedence for origin  :
  // place ID -> address -> lat/lng



  const dest = destObject.place_id;

  if(origin !== undefined && origin.placeID !== undefined && origin.placeID != ''){
    setUrl(
        `https://www.google.com/maps/embed/v1/directions`
            + `?key=${apiKey}`
            + `&origin=place_id:${origin.placeID}`
            + `&destination=place_id:${dest}`
            + `&mode=walking`

          )


    }
    else if(origin !== undefined && origin.addr !== undefined && origin.addr !== ''){
      setUrl(
          `https://www.google.com/maps/embed/v1/directions`
              + `?key=${apiKey}`
              + `&origin=${origin.addr}`
              + `&destination=place_id:${dest}`
              + `&mode=walking`

            )
    }
    else if(origin !== undefined && origin.lat !== undefined && origin.lng !== undefined ){
        setUrl(
            `https://www.google.com/maps/embed/v1/directions`
                + `?key=${apiKey}`
                + `&origin=${origin.lat},${origin.lng}`
                + `&destination=place_id:${dest}`
        //        + `&destination=${destination.latitude},${destination.longitude}`
                + `&mode=walking`

              )

    }
    else{
        // send warning - origin not detected
        console.log("Origin not detected")
      // freeze the Go button if both origin and originPlaceID are not available yet?

    }



}

const returnDestDetails = () =>{

  if( destination === undefined){
    return null
  }



  return(


<div style={{marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
    <div id="destTitle">Destination:</div>
    <div id="destDetails">
        {destination.name} <br />

        <a href={`https://www.google.com/maps/place/?q=place_id:${destination.place_id}`} target="_blank">View Details</a>



    </div>
  </div>
  )
}




const getIPAddr = () =>{





}

/*
  const watch = true;
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch, {enableHighAccuracy: true});

*/




  return (
    <div className="App">
      <header className="App-header">
        <p>
          Place Me
          </p>
          </header>
          <div id="warning">Please allow location</div>
          <div>
          {
  //        latitude: {latitude}<br/>
  //    longitude: {longitude}<br/>
  //    accuracy: {accuracy && `${accuracy}m`}<br/>
  //    error: {error}
}
      </div>
      origin: {origin.lat}, {origin.lng} <br />
      <br />

      <div id="dest">

        {returnDestDetails()}

      </div>
        <div>
          <button type="button" onClick={setDestination}>GOO</button>
        </div>
        <div>

            <Autocomplete
          style={{width: '30%'}}
          onPlaceSelected={(place) => {
            setOrigin({placeID: place.place_id, lat:place.geometry.location.lat(), lng: place.geometry.location.lng()});
            console.log(place);
            console.log("geometry: " + place.geometry.location.lat() + ", " + place.geometry.location.lng());
            console.log("place ID: " + place.place_id);
          }}
      types={['address']}

      />
{
      //types={['(regions)']} -> list of types defined by google maps api:
      // refer to https://developers.google.com/places/web-service/supported_types for full list
    //componentRestrictions={{country: "ru"}}
}
      </div>
      <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'blue'}}  >
      {
      //  <MapContainer position={position} />

      //  <Directions />
      }
      <iframe
      frameborder="0" style={{border:0, width:"55vw", height:"25vw"}}
      src={url}  allowFullScreen>
      </iframe>

    {/* for directions:
      https://www.google.com/maps/embed/v1/directions
    ?key=YOUR_API_KEY
    &origin=Oslo+Norway
    &destination=Telemark+Norway
    &avoid=tolls|highways

    for places:
    https://www.google.com/maps/embed/v1/place
  ?key=YOUR_API_KEY
  &q=Eiffel+Tower,Paris+France

  */

}

        </div>

    </div>
  );
}

export default App;
