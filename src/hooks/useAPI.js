import Axios from 'axios';
import {useCallback} from 'react';

const useAPI = () => {
  const getSpots = useCallback(async () => {
    try {
      const spots = await Axios({
        method: 'get',
        url: process.env.REACT_APP_URL_SPOTS
      });
      const data = await spots.data;
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }, []);

  const getHours = useCallback(async () => {
    try {
      const hours = await Axios({
        method: 'get',
        url: process.env.REACT_APP_URL_SPOTHOURS
      });
      const data = await hours.data;
      return data
    } catch (error) {
      console.log(error.message)
    }
  }, []);

  const addSpotAndHours = async (reqSpot, reqHours) => {
    try {
      const spot = await Axios({
        method: 'post',
        url: process.env.REACT_APP_URL_SPOTS,
        data: reqSpot,
      });

      const spotData = await spot.data;
      const newReqHours =  { spot_id: spotData.spot_id, ...reqHours };

      const hoursRes = await Axios({
        method: 'post',
        url: process.env.REACT_APP_URL_SPOTHOURS,
        data: newReqHours,
      });
      const hoursData = await hoursRes.data;
      const data = {...spotData, hours: hoursData};
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }

  const spotsData = useCallback(async () => {
    let combinedData = [];
    const spots = await getSpots();
    const hours = await getHours();
    spots.forEach((place)=>{
      hours.forEach((hour)=> {
        if(place.spot_id === hour.spot_id) {
          combinedData.push({...place, hours: hour})
        }
      });
    })
    return combinedData
  }, [getSpots, getHours]);

  return {
    getSpots,
    getHours,
    addSpotAndHours,
    spotsData
  }
}

export default useAPI;