import * as React from 'react';
import SideBar from './SideBar';
import { Alert, Button, Input } from 'reactstrap';
import { Loader } from "@googlemaps/js-api-loader";
import Axios from 'axios';
import AddSpotModal from './AddSpotModal';

const NonWrapperMap = () => {
  const [loader, setLoader] = React.useState();
  const [currentLocation, setCurrentLocation] = React.useState();
  const [map, setMap] = React.useState(null);
  const [geocoder, setGeocoder] = React.useState();
  const [spots, setSpots] = React.useState([]);
  // const [autocomplete, setAutocomplete] = React.useState(null);
  const [alertToggle, setAlertToggle] = React.useState(false);
  const [modalToggle, setModalToggle] = React.useState(false);
  const [sidebarData, setSidebarData] = React.useState(null);
  const endPoint = 'http://sesh-env.eba-t2bymcma.us-west-1.elasticbeanstalk.com';
  
  // useLayoutEffect loads first
  React.useLayoutEffect(() => {
    // prompt geolocation permission to get current location
    navigator.geolocation.getCurrentPosition(
      (result) => { // 1st arg = permmission granted returns result.coords
        setCurrentLocation(
          {
            lat: result.coords.latitude,
            lng: result.coords.longitude,
          }
        );
      },
      () => { // 2nd arg = permission denied returns error
        setCurrentLocation(
          {
            lat: 40.86126787896794,
            lng: -73.8548385706662
          }
        );
      }
    ); 
    const loadFirst = async () => {
      setLoader(
        await new Loader({
          apiKey: "AIzaSyAzFZcoRjWTTPDd4OqSG_yO8F4vhrMJcaM",
          version: "weekly",
          libraries: ["places"]
        }).load()
      );
      // API call all spots and hours 
      // combine and set spots state
      const spotsRes = await Axios({
        method: 'get',
        url: `${endPoint}/spots`
      });
      const hoursRes = await Axios({
        method: 'get',
        url: `${endPoint}/spothours`
      });
      const spotData = await spotsRes.data;
      const hoursData = await hoursRes.data;
      const data = () => {
        let combinedData = [];
        spotData.forEach((place)=>{
          hoursData.forEach((hour)=> {
            if(place.spot_id === hour.spot_id) {
              combinedData.push({...place, hours: hour})
            }
          });
        })
        return combinedData
      }
      setSpots(data());
    }
    loadFirst();
  }, []);

  //loads only if loader exists
  React.useEffect(async ()=>{
    if(currentLocation && loader) {
      setMap(
        await new google.maps.Map(document.getElementById("map"), {
          center: currentLocation,
          zoom: 11,
          mapId: 'b2e6fec7d55d0a59',
          disableDefaultUI: true
        })
      );
      setGeocoder(await new google.maps.Geocoder());
    }
  }, [currentLocation, loader]);

  React.useEffect(async ()=>{
    if(map) {
      const autocomplete = await new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {
          componentRestrictions: {'country': 'us'},
          types: ['(cities)'],
          fields: ["address_components", "formatted_address", "geometry"]
        })
      const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
          const coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        map.panTo(coordinates);
      };
      autocomplete.addListener('place_changed', handlePlaceSelect);
    }
  }, [map]);
    
  const addMarker = async (spot) => {
    try {
      await geocoder.geocode({ 'address': spot.address }, (results, status) => {
        if (status == 'OK') {
          new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            icon: "https://sesh-assets.s3.us-west-1.amazonaws.com/marker3.svg"
            // title: 'place holder'
          }).addListener("click", () => {
            const sidebar = document.querySelector('.sidebar');
            if(!sidebar.id) {
              setSidebarData(spot);
              if(sidebar.style.right == '-50vw'){
                document.querySelector('.sidebar__toggle').click();
              }
              sidebar.id = spot.spot_id;
              return
            }
            if(sidebar.id == spot.spot_id) {
              document.querySelector('.sidebar__toggle').click();
              return
            }
            if(sidebar.id != spot.spot_id) {
              if(sidebar.style.width == '-50vw') {
                document.querySelector('.sidebar__toggle').click();
              }
              setSidebarData(spot);
              sidebar.id = spot.spot_id;
              return
            }
          })
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } catch (error) {
      console.log(error.message)
    }
    //DO I NEED TO REMOVE CLICK HANDLER UPON UNMOUNT?
  };

  React.useEffect(() => {
    spots.forEach((spot) => {
      if(geocoder) {
        addMarker(spot);
      }
    });
  }, [spots, geocoder]);

  const toggleAlert = () => {
    setAlertToggle(true);
    setTimeout(()=>{
      setAlertToggle(false);
    }, 3000);
  }

  const addSpot = async (reqSpot, reqHours) => {
    try {
      const spotRes = await Axios({
        method: 'post',
        url: `${endPoint}/spots`,
        data: reqSpot,
      });
      const spotData = await spotRes.data;
      const hoursReqBody =  { spot_id: spotData.spot_id, ...reqHours };
      const hoursRes = await Axios({
        method: 'post',
        url: `${endPoint}/spothours`,
        data: hoursReqBody,
      });
      const hoursData = await hoursRes.data;
      const data = {...spotData, hours: hoursData};
      addMarker(data);
      setSpots(prev => [...prev, data]);
      setModalToggle(!modalToggle);
      toggleAlert();
      console.log('Spot added: ', data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="map">
      <div className="map__container">
        <div id="map"></div>
      </div>
      <div className="map__search">
        <Input
          id="autocomplete"
          className="w-100"
          name ="autocomplete"
          type="text"
          placeholder="Enter a city"
        />
      </div>
      <div className="map__buttons">
        <div className="map__addFav">
          <Button 
            className="map__addFav--add" 
            color="primary" 
            size="sm"
            onClick={() => setModalToggle(!modalToggle)}
          >+</Button>
          {/* <Button className="map__addFav--fav" color="primary" size="sm">O</Button> */}
        </div>
        {/* <Button color="primary" size="sm" className="map__chat">...</Button> */}
      </div>
      <SideBar data={sidebarData}/>
      <AddSpotModal 
        isOpen={modalToggle}
        toggle={() => setModalToggle(!modalToggle)}
        submit={(spot, hours) => {
          addSpot(spot, hours);
        }}
      />
      <Alert
        children="New spot added successfully!"
        fade
        isOpen={alertToggle}
      />
    </div>
  )
};

export default NonWrapperMap;
