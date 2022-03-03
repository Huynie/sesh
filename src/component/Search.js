import * as React from 'react';
import { Input } from 'reactstrap';

const Search = ({setAutocomplete}) => {
  const searchRef = React.useRef();
  const handlePlaceSelect = React.useCallback((map, autocomplete) => () => {
    const place = autocomplete.getPlace();
    const coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    map.panTo(coordinates);
  }, []);

  React.useEffect(()=>{
    if(setAutocomplete) {
      setAutocomplete(searchRef, handlePlaceSelect);
    }
  }, [setAutocomplete, searchRef, handlePlaceSelect]);

  return (
    <div className="map__search">
      <Input
        innerRef={searchRef}
        id="autocomplete"
        className="w-100"
        name ="autocomplete"
        type="text"
        placeholder="Enter a city"
      />
      {/* <input type="text" ref={searchRef}/> */}
    </div>
  )
};

export default Search;