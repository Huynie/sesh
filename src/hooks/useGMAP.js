import {useState, useEffect, useCallback} from 'react';
import useAPI from './useAPI';

const useGMAP = ( center, zoom, mapRef, sidebarRef, sidebarToggleRef, setSidebarData) => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [spots, setSpots] = useState(null);
  const {spotsData} = useAPI();
  
  const getMap = useCallback(async () => {
    const newMap = await new window.google.maps.Map(
      mapRef.current, 
      {
        center,
        zoom,
        mapId: process.env.REACT_APP_MAP_ID,
        disableDefaultUI: true
      }
    );
    setMap(newMap);
  },[center,zoom, mapRef]);

  const getGeocoder = async() => setGeocoder(await new window.google.maps.Geocoder());

  const setAutocomplete = useCallback( async(locationType, ref, handlePlaceSelect) => {
    if(map && ref.current){
      const newAutocomplete = await new window.google.maps.places.Autocomplete(ref.current, {
        componentRestrictions: {'country': 'us'},
        types: [locationType],
        fields: ["address_components", "formatted_address", "geometry"]
      });
      if(handlePlaceSelect){
        newAutocomplete.addListener('place_changed', handlePlaceSelect(map, newAutocomplete));
      }
    }
  },[map]);
  
  const addMarker = useCallback( async(spot) => {
    const handleMarkerClick = () => {
      const show = sidebarRef.current.classList.contains('sidebar--show');
      const spot_id = spot.spot_id.toString();
      if(!sidebarRef.current.id) {
        setSidebarData(spot);
        if(!show){
          sidebarToggleRef.current.click();
        }
        sidebarRef.current.id = spot_id;
        return
      }
      if(sidebarRef.current.id === spot_id) {
        sidebarToggleRef.current.click();
        return
      }
      if(sidebarRef.current.id !== spot_id) {
        if(!show) {
          sidebarToggleRef.current.click();
        }
        setSidebarData(spot);
        sidebarRef.current.id = spot_id;
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
    const loadFirst = async() => {
      await getMap();
      await getGeocoder();
      setSpots(await spotsData());
    }
    
    if(window.google) {
      loadFirst();
    } else {
      const googleScript = document.getElementById('google-map-script');
      
      googleScript.addEventListener('load', () => loadFirst());
    }
  }, [getMap, spotsData]);

  useEffect(()=>{
    if(spots){
      spots.forEach( async(spot) => {
        await addMarker(spot);
      });
    }
  }, [spots, addMarker]);

  return {
    map,
    geocoder,
    spots,
    getMap,
    getGeocoder,
    addMarker,
    setSpots,
    setAutocomplete
  }
}

export default useGMAP;