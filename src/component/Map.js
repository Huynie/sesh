import React, { useState, useLayoutEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Button, Spinner, Alert } from "reactstrap";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import AddSpotModal from "./AddSpotModal";
import useGMAP from "../utilities/useGMAP";
import { addSpotAndHours } from "../utilities/apiCalls";

const MapComponent = ({ center, zoom }) => {
  const mapRef = useRef();
  const sidebarRef = useRef();
  const sidebarToggleRef = useRef();
  const sidebarRefs = useRef({ sidebarRef, sidebarToggleRef });
  const [sidebarData, setSidebarData] = useState(null);
  const { setSpots, setAutocomplete } = useGMAP(
    center,
    zoom,
    mapRef,
    sidebarRef,
    sidebarToggleRef,
    setSidebarData
  );
  const alertRef = useRef();
  const [addSpotModalToggle, setAddSpotModalToggle] = useState(false);
  const [alert, setAlert] = useState({
    toggle: false,
    msg: null,
    color: "success",
  });

  const toggleAlert = (msg, color) => {
    setAlert({ toggle: true, msg, color });
    setTimeout(() => {
      setAlert({ ...alert, toggle: false });
    }, 3000);
  };

  const addSpot = async (reqSpot, reqHours, validate) => {
    try {
      validate();
      const data = await addSpotAndHours(reqSpot, reqHours);
      setSpots((prev) => [...prev, data]);
      setAddSpotModalToggle(!addSpotModalToggle);
      toggleAlert("Spot successfully added!", "success", "success");
    } catch (error) {
      toggleAlert(error.message, "danger");
      console.log(error.message);
    }
  };

  return (
    <div className="map">
      <div className="map__container">
        <div ref={mapRef} id="map"></div>
      </div>
      <SearchBar setAutocomplete={setAutocomplete} />
      <SideBar data={sidebarData} ref={sidebarRefs} />
      <Button
        className="map__button--add"
        size="sm"
        onClick={() => setAddSpotModalToggle(!addSpotModalToggle)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="white"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>
      <AddSpotModal
        isOpen={addSpotModalToggle}
        toggle={setAddSpotModalToggle}
        setAutocomplete={setAutocomplete}
        submit={addSpot}
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
  const [status, setStatus] = useState(Status.LOADING);
  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        // 1st arg = permmission granted returns result.coords
        setCurrentLocation({
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        });
        setStatus(Status.SUCCESS);
      },
      () => {
        // 2nd arg = permission denied returns error
        setCurrentLocation({
          lat: 40.86126787896794,
          lng: -73.8548385706662,
        });
        setStatus(Status.SUCCESS);
      }
    );
  }, []);

  switch (status) {
    case Status.FAILURE:
      return <h3>{status}...</h3>;
    case Status.SUCCESS:
      return <MapComponent zoom={11} center={currentLocation} />;
    default:
      return (
        <h3>
          <Spinner />
          {status}...
        </h3>
      );
  }
};

export default function Map() {
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
