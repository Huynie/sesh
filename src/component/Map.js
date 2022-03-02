import React, { useState, useLayoutEffect, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Button, Spinner, Alert } from 'reactstrap';
import SideBar from './SideBar';
import Search from './Search';
import AddSpotModal from './AddSpotModal';
import useGMAP from '../hooks/useGMAP';
import useAPI from '../hooks/useAPI';
// import 'dotenv';

const MyMapComponent = ({center, zoom}) => {
  const mapRef = useRef();
  const sidebarRef = useRef();
  const sidebarToggleRef = useRef();
  const sidebarRefs = useRef({sidebarRef, sidebarToggleRef});
  const [sidebarData, setSidebarData] = useState(null);
  const {map, setSpots, addMarker} = useGMAP(center, zoom, mapRef, sidebarRef, sidebarToggleRef, setSidebarData);
  const api = useAPI();
  const alertRef = useRef();
  const [addSpotModalToggle, setAddSpotModalToggle] = useState(false);
  const [alert, setAlert] = useState({toggle: false, msg: null, color: 'success'});

  const toggleAlert = (msg, color) => {
    setAlert({toggle: true, msg, color});
    setTimeout(()=>{
      setAlert({...alert, toggle: false});
    }, 3000);
  };

  const addSpot = async (reqSpot, reqHours) => {
    try {
      const data = await api.addSpotAndHours(reqSpot, reqHours);
      await addMarker(data);
      setSpots(prev => [...prev, data]);
      setAddSpotModalToggle(!addSpotModalToggle);
      toggleAlert('Spot successfully added!', 'success');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="map">
      <div className="map__container">
        <div ref={mapRef} id="map"></div>
      </div>
      <Search map={map}/>
      <SideBar 
        data={sidebarData}
        ref={sidebarRefs}
      />
      <div className="map__buttons">
        <div className="map__addFav">
          <Button 
            className="map__addFav--add" 
            color="primary" 
            size="sm"
            onClick={() => setAddSpotModalToggle(!addSpotModalToggle)}
          >+</Button>
        </div>
      </div>
      <AddSpotModal 
        isOpen={addSpotModalToggle}
        toggle={() => setAddSpotModalToggle(!addSpotModalToggle)}
        submit={(spot, hours) => {
          addSpot(spot, hours);
        }}
      />
      <Alert // triggers strictmode warning
        isOpen={alert.toggle}
        children={alert.msg}
        color={alert.color}
        innerRef={alertRef}
      />
    </div>
  );
};


// add status as parameters
// if Render is fed as prop in Wrapper component
const Render = () => { 
  const [currentLocation, setCurrentLocation] = useState();
  const [status, setStatus] = useState(Status.LOADING)
  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (result) => { // 1st arg = permmission granted returns result.coords
        setCurrentLocation(
          {
            lat: result.coords.latitude,
            lng: result.coords.longitude,
          }
        );
        setStatus(Status.SUCCESS);
      },
      () => { // 2nd arg = permission denied returns error
        setCurrentLocation(
          {
            lat: 40.86126787896794,
            lng: -73.8548385706662
          }
          );
          setStatus(Status.SUCCESS);
      }
    ); 
  }, []);

  switch (status) {
    case Status.FAILURE:
      return <h3>{status}...</h3>;
    case Status.SUCCESS:
      return <MyMapComponent
        zoom={11}
        center={currentLocation}
      />
    default:
      return <h3><Spinner/>{status}...</h3>;
  }
};

export default function Map(){
  return (
    <Wrapper 
      apiKey={process.env.REACT_APP_API_KEY}
      render={Render}
      libraries={["places"]}
      id="google-map-script"
      // callback={(status, loader) => console.log(status, loader)}
    />
  );
}