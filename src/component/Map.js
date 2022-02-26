import * as React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Button, Spinner, Alert } from 'reactstrap';
import { spotsData, addSpotAndHours } from './api';
import SideBar from './SideBar';
import Search from './Search';
import AddSpotModal from './AddSpotModal';
// import 'dotenv';

const MyMapComponent = ({center, zoom}) => {
  const mapRef = React.useRef();
  const sidebarRef = React.useRef();
  const alertRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [spots, setSpots] = React.useState([]);
  const [sidebarData, setSidebarData] = React.useState(null);
  const [geocoder, setGeocoder] = React.useState();
  const [addSpotModalToggle, setAddSpotModalToggle] = React.useState(false);
  const [alert, setAlert] = React.useState({toggle: false, msg: null, color: 'success'});

  const toggleAlert = (msg, color) => {
    setAlert({toggle: true, msg, color});
    setTimeout(()=>{
      setAlert({...alert, toggle: false});
    }, 3000);
  };

  const handleMarkerClick = React.useCallback(spot => () => {
    if(!sidebarRef.current.id) {
      setSidebarData(spot);
      if(sidebarRef.current.style.right === '-50vw'){
        document.querySelector('.sidebar__toggle').click();
      }
      sidebarRef.current.id = spot.spot_id;
      return
    }
    if(sidebarRef.current.id == spot.spot_id) {
      document.querySelector('.sidebar__toggle').click();
      return
    }
    if(sidebarRef.current.id != spot.spot_id) {
      if(sidebarRef.current.style.right === '-50vw') {
        document.querySelector('.sidebar__toggle').click();
      }
      setSidebarData(spot);
      sidebarRef.current.id = spot.spot_id;
      return
    }
  });

  const addMarker = async (spot) => {
    try {
      await geocoder.geocode({ 'address': spot.address }, (results, status) => {
        if (status == 'OK') {
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            icon: "https://sesh-assets.s3.us-west-1.amazonaws.com/marker3.svg",
            title: spot.name
          });
          marker.addListener("click", handleMarkerClick(spot));
        }
      });
    } catch (error) {
      toggleAlert(`Geocode Error: ${spot.name} - ${error.code}`, 'danger');
      console.log(error.message, spot.name);
    }
    //DO I NEED TO REMOVE CLICK HANDLER UPON UNMOUNT?
  };

  const addSpot = async (reqSpot, reqHours) => {
    try {
      const data = await addSpotAndHours(reqSpot, reqHours);
      addMarker(data);
      setSpots(prev => [...prev, data]);
      setAddSpotModalToggle(!addSpotModalToggle);
      toggleAlert('Spot successfully added!', 'success');
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(async() => {
    try {
      setSpots(await spotsData());
      setMap(new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapId: 'b2e6fec7d55d0a59',
        disableDefaultUI: true
        })
      );
      setGeocoder(new google.maps.Geocoder());
    } catch (error) {
      console.log(error.message)
    }
  },[]);
  
  React.useEffect(() => {
    spots.forEach((spot) => {
      if(geocoder) {
        addMarker(spot);
      }
    });
  }, [spots, geocoder]);

  return (
    <div className="map">
      <div className="map__container">
        <div ref={mapRef} id="map"></div>
      </div>
      <Search map={map}/>
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
      <SideBar 
        data={sidebarData} 
        ref={sidebarRef}
      />
      <AddSpotModal 
        isOpen={addSpotModalToggle}
        toggle={() => setAddSpotModalToggle(!addSpotModalToggle)}
        submit={(spot, hours) => {
          addSpot(spot, hours);
        }}
      />
      {/* <Alert // triggers strictmode warning
        isOpen={alert.toggle}
        children={alert.msg}
        color={alert.color}
        innerRef={alertRef}
      /> */}
    </div>
  );
};


// add status as parameters
// if Render is fed as prop in Wrapper component
const render = () => { 
  const [currentLocation, setCurrentLocation] = React.useState();
  const [status, setStatus] = React.useState(Status.LOADING)
  React.useLayoutEffect(() => {
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
    case Status.LOADING:
      return <h3><Spinner/>{status}...</h3>;
    case Status.FAILURE:
      return <h3>{status}...</h3>;
    case Status.SUCCESS:
      return <MyMapComponent
        zoom={11}
        center={currentLocation}
      />
  }
};

export default function Map(){
  return (
    <Wrapper 
      apiKey={"AIzaSyAzFZcoRjWTTPDd4OqSG_yO8F4vhrMJcaM"}
      render={render}
      libraries={["places"]}
    />
  );
}