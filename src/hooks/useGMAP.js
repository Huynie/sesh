import {useState, useEffect, useCallback} from 'react';
import useAPI from './useAPI';

const useGMAP = async ( center, zoom, mapRef, sidebarRef, sidebarToggleRef, setSidebarData) => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [spots, setSpots] = useState(null);
  const {spotsData} = useAPI();
  
  const getMap = useCallback(async () => {
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
  },[center,zoom, mapRef]);

  const getGeocoder = async() => setGeocoder(await new window.google.maps.Geocoder());

  
  const addMarker = useCallback( async(spot) => {
    const handleMarkerClick = () => {
      // const sidebarToggle = document.getElementbyId('sidebarToggle');
      // console.log(sidebarRef.current.style, sidebarRef.current.id);
      if(!sidebarRef.current.id) {
        setSidebarData(spot);
        if(sidebarRef.current.style.right == '-50vw'){
          sidebarToggleRef.current.click();
        }
        sidebarRef.current.id = spot.spot_id;
        return
      }
      if(sidebarRef.current.id == spot.spot_id) {
        sidebarToggleRef.current.click();
        return
      }
      if(sidebarRef.current.id != spot.spot_id) {
        if(sidebarRef.current.style.right == '-50vw') {
          sidebarToggleRef.current.click();
        }
        setSidebarData(spot);
        sidebarRef.current.id = spot.spot_id;
        return
      }
    };
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
          marker.addListener("click", handleMarkerClick);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [geocoder, map, sidebarRef, sidebarToggleRef, setSidebarData]);

  useEffect(() => {
    const doAll = async() => {
      await getMap();
      await getGeocoder();
      setSpots(await spotsData());
    }
    
    if(window.google) {
      doAll();
    } else {
      const googleScript = document.getElementById('google-map-script');
      
      googleScript.addEventListener('load', () => doAll());
    }
    // doAll();
  }, [getMap, spotsData]);

  useEffect(()=>{
    if(spots){
      spots.forEach( async(spot) => {
        await addMarker(spot);
      });
    }
  }, [spots, addMarker]);

  return {
    getMap,
    getGeocoder,
    geocoder,
    addMarker,
    spots,
    setSpots,
    map
  }
}

export default useGMAP;