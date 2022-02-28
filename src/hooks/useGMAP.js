import {useState, useEffect} from 'react';
import useAPI from './useAPI';
// const google = window.google = window.google ? window.google : {};

const useGMAP = ( center, zoom, mapRef, sidebarRef, sidebarToggleRef) => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [sidebarData, setSidebarData] = useState(null);
  const [spots, setSpots] = useState(null);
  const api = useAPI();


  const getMap = async () => {
    const map = await new window.google.maps.Map(
      mapRef.current, 
      {
        center,
        zoom,
        mapId: 'b2e6fec7d55d0a59',
        disableDefaultUI: true
      }
    );
    setMap(map);
  };

  const getGeocoder = async() => setGeocoder(await new window.google.maps.Geocoder());

  const handleMarkerClick = spot => () => {
    // const sidebarToggle = document.getElementbyId('sidebarToggle');
    if(!sidebarRef.current.id) {
      setSidebarData(spot);
      if(sidebarRef.current.style.right === '-50vw'){
        sidebarToggleRef.current.click();
      }
      sidebarRef.current.id = spot.spot_id;
      return
    }
    if(sidebarRef.current.id === spot.spot_id) {
      sidebarToggleRef.current.click();
      return
    }
    if(sidebarRef.current.id !== spot.spot_id) {
      if(sidebarRef.current.style.right === '-50vw') {
        sidebarToggleRef.current.click();
      }
      setSidebarData(spot);
      sidebarRef.current.id = spot.spot_id;
      return
    }
  };

  const addMarker = async(spot) => {
    try {
      await geocoder.geocode({ 'address': spot.address }, (results, status) => {
        if (status === 'OK') {
          const marker = new window.google.maps.Marker(
            {
              map,
              position: results[0].geometry.location,
              icon: "https://sesh-assets.s3.us-west-1.amazonaws.com/marker3.svg",
              title: spot.name
            }
          );
          marker.addListener("click", handleMarkerClick(spot));
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const doAll = async() => {
      await getMap();
      await getGeocoder();
      setSpots(await api.spotsData());
    }
    
    if(window.google) {
      doAll();
    } else {
      const googleScript = document.getElementById('google-map-script');
  
      googleScript.addEventListener('load', () => doAll());
    }
    // doAll();
  },[]);

  useEffect(()=>{
    if(spots){
      spots.forEach( async(spot) => {
        await addMarker(spot);
      });
    }
  }, [spots]);

  return {
    getMap,
    getGeocoder,
    geocoder,
    addMarker,
    sidebarData,
    spots,
    setSpots,
    map
  }
}

export default useGMAP;