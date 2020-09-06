import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import star from './star.png';
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
const radius=555;
// if location not enabled, let user know oif t

/*
Types to allow:

restaurant
supermarket
shopping_mall
store
parking
park
bar
cafe
clothing_store
car_dealer
spa
tourist_attraction
movie_theater
night_club
museum


*/




function App() {

  // origin detected from geolocation
  // this will be used for both origins detected from geolocation,
  // ANd through Autocomplete
  // origin: keys: placeID, lat, lng
  const [origin, setOrigin] = useState(0);

  // origin selected from autocomplete
//  const [originAutoComplete, setOriginAutoComplete] = useState();

  // note: the destination is now an object (object from JSON returned by google api), rather than just a place ID
  // so for example, to get the place id, use "destination.place_id"
  const [destination, setDest] = useState();
  const [destCount, setDestCount] = useState(); // -1 means not started yet

  const [url, setUrl] = useState()
  const [loading, setLoading] = useState();
//  you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined

  const [ipAddr, setIPAddr] = useState();

  var placeTypeSelected = "restaurant";
  //var started = false; // determining whether the place has started or not (more for the "No places" msg)

  const [started, setStarted] = useState();


  const [placeType, setPlaceType] = useState();

  const placeTypesList = {
    "Restaurant" : "restaurant" ,
    "Supermarket" : "supermarket" ,
    "Shopping Mall" : "shopping_mall",
    "Store" : "store",
    "Parking" : "parking",
    "Park" : "park",
    "Bar" : "bar",
    "Cafe" : "cafe",
    "Clothing Store" : "clothing_store",
    "Car Dealer" : "car_dealer",
    "Spa" : "spa",
    "Tourist Attraction" : "tourist_attraction",
    "Movie Theater" : "movie_theater",
    "Night Club" : "night_club",
    "Museum" : "museum"

  }
// Format: {display name : actual type value}

// since key-value pairs cannot be sorted, convert to array (only the display names)
// and then, look up the actual type value when generating the dropdown boxes with placeTypes;
// with  display names as the keys.
  const placeTypesSorted = Object.keys(placeTypesList).sort()




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


// get current location
useEffect(() => {

  setStarted(false);
  setPlaceType("restaurant")

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

/*
  // test place json
  console.log('fetching:');
  fetch('./testplace.json')
    .then((res) => res.json())
    .then((data) => {
      console.log('data:', data);
      setDest(data)
    })
*/

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
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const mapUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin.lat},${origin.lng}&radius=${radius}&opennow=true&type=${placeType}&key=${apiKey}`

    fetch(proxyUrl + mapUrl)
      .then(res => res.json())
      .then(
          (result) => {
      //      setIsLoaded(true);
        //    setItems(result.items);
        console.log("Dest Map URL:" + mapUrl)
        console.log("JSON Result - nearby places: ")

          //placeID = result.results[0].place_id;

        // note: origin.addr is not updated here yet (async)

          // get total # of results
          const count = result.results.length
          console.log(`count: ${count}`)

          setDestCount(count)

          var random = Math.floor(Math.random() * Math.floor(count+1));

          console.log(`random: ${random}`)

          dest = result.results[random];


            setStarted(true)

            if(result.status === "ZERO_RESULTS"){
              console.log("No results")


            }
            else{
              if(dest !== undefined && dest.place_id !== ''){
                  setDest(dest)
                  //console.log(`Destination: ${JSON.stringify(dest)}`)
                  setDestUrl(dest)

                  console.log(dest)
                  // save history to MongoDB through flask API
                  fetch('/api/save', {
                    method: 'POST',
                    cache: "no-cache",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                      "time": Date().toLocaleString(),
                      "originAddr": origin.addr,
                      "originLat": origin.lat,
                      "originLng": origin.lng,
                      "placeID": dest.place_id,
                      "placeName": dest.name,
                      "placeType": dest.types[0]
                      })
                  })
                  .then(res => res.json())
                   .catch(console.error)





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

  const dest = destObject.place_id;


  // precedence for origin  :
  // place ID -> address -> lat/lng

  if(origin !== undefined && origin.placeID !== undefined && origin.placeID !== ''){
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


// generating the dropdown boxes for the place types
const returnPlaceTypes = () => {

console.log("returnPlaceTypes")
console.log(placeTypesSorted)


  if(placeTypesSorted){
      return placeTypesSorted.map((item) => {

        var selected = "";

        //select "Restaurant" as the default one
        if(item === "Restaurant"){
            selected = "selected";

        }
          return(

            <option value={placeTypesList[item]} selected={selected}>
                {item}
            </option>
          )


        })
      }




}


const returnDestDetails = () =>{

  console.log("returnDestDetails() " + started)

  if( !started && destination === undefined){
    return null
  }


  // need to display something if no opennow locations are available nearby

  // cases to test:
  // once desstination is found,
  // change the address where no destinatino could be found
  // see if it behaves as expected

  // "NO OPEN PLACES" -> this should not be displayed the first time. Or when the current place cahnges

  else if( started && (destination === undefined || destCount === 0)){
    return(
        <div id="noPlacesNearby" >
          No open places nearby :(
        </div>
    )

  }
  else{


      var starr = "star";
      var rating="";

      if(destination.rating !== undefined && destination.rating !== 0){
           rating = ( <div>( {destination.rating}

              &nbsp;<img src={star} id="star" />  ) </div>


          )
      }



      return(


        <div>
            <div id="destTitle">Your destination:</div>
            <div id="destDetails">
                {destination.name} {rating}
            </div>
            <div id="destLinkContainer">
                <a href={`https://www.google.com/maps/place/?q=place_id:${destination.place_id}`} target="_blank" id="destLink">View Details</a>
            </div>
          </div>
      )

  }


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
        <p id="title">
          Place Me!
          </p>
          <div id="subtitle">
            Pick a random place around you!
          </div>
          <hr id="line" />
        </header>
          <div className="message">1. Please allow location services, <b><u>or</u></b> enter your current address below:</div>

          <div>
          {
  //        latitude: {latitude}<br/>
  //    longitude: {longitude}<br/>
  //    accuracy: {accuracy && `${accuracy}m`}<br/>
  //    error: {error}
}
      </div>
    {
//       origin: {origin.lat}, {origin.lng} <br />
    }

    <div id="">

        <Autocomplete id="autocomplete"

      onPlaceSelected={(place) => {
        setStarted(false);

        setOrigin({placeID: place.place_id, lat:place.geometry.location.lat(), lng: place.geometry.location.lng()});
        console.log(place);
        console.log("geometry: " + place.geometry.location.lat() + ", " + place.geometry.location.lng());
        console.log("place ID: " + place.place_id);
      }}
  types={['address']}
placeholder="Enter your current location"
  />
{
// PROBLEM: dropdown option gone when changing origin from autocomplete


  //types={['(regions)']} -> list of types defined by google maps api:
  // refer to https://developers.google.com/places/web-service/supported_types for full list
//componentRestrictions={{country: "ru"}}
}
  </div>
  <div className="message">2. Pick a category:</div>
  <div id="dropdownDiv">
    <form action = "" >
  {
    //   <select id="dropdown" onChange={(e) => placeTypeSelected = e.target.value}>
  }
     <select id="dropdown" onChange={(e) => setPlaceType(e.target.value)}>
        {returnPlaceTypes()}
      </select>
      </form>
  </div>
    <div>
      <button type="button" onClick={setDestination} id="button">GO!!</button>
    </div>

<div id="destContainer">

        {returnDestDetails()}
</div>


      <div style={{marginLeft:'auto', marginRight:'auto'}}  >
      {
      //  <MapContainer position={position} />

      //  <Directions />
      }


      <iframe
      frameBorder="0"
      src={url}  allowFullScreen id="map">
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
