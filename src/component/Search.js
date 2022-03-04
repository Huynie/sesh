import * as React from 'react';
import { Input } from 'reactstrap';

const Search = ({setAutocomplete}) => {
  const searchRef = React.useRef();
  const handlePlaceSelect = React.useCallback((map, autocomplete) => async() => {
    const place = await autocomplete.getPlace();
    const coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    map.panTo(coordinates);
  }, []);
  
  React.useEffect(()=>{
    if(searchRef.current) {
      setAutocomplete('(cities)',searchRef, handlePlaceSelect);
    }
  }, [setAutocomplete, searchRef, handlePlaceSelect]);

  return (
    <div className="map__search">
      <Input
        innerRef={searchRef}
        id="search"
        className="w-100"
        name ="autocomplete"
        type="text"
        placeholder="Enter a city"
      />
    </div>
  )
};

export default Search;