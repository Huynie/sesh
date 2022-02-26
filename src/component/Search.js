import * as React from 'react';
import { Input } from 'reactstrap';

const Search = ({map}) => {
  const searchRef = React.useRef();
  React.useEffect(async()=>{
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