import Axios from 'axios';
import {useCallback} from 'react';

const useAPI = () => {
  const baseURL = 'http://sesh-env.eba-t2bymcma.us-west-1.elasticbeanstalk.com';
  // const [data, setData] = useState();
  const getSpots = useCallback(async () => {
    try {
      const spots = await Axios({
        method: 'get',
        url: `${baseURL}/spots`
      });
      const data = await spots.data;
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }, [baseURL]);

  const getHours = useCallback(async () => {
    try {
      const hours = await Axios({
        method: 'get',
        url: `${baseURL}/spothours`
      });
      const data = await hours.data;
      return data
    } catch (error) {
      console.log(error.message)
    }
  }, [baseURL]);

  const addSpotAndHours = async (reqSpot, reqHours) => {
    try {
      const spot = await Axios({
        method: 'post',
        url: `${baseURL}/spots`,
        data: reqSpot,
      });

      const spotData = await spot.data;
      const newReqHours =  { spot_id: spotData.spot_id, ...reqHours };

      const hoursRes = await Axios({
        method: 'post',
        url: `${baseURL}/spothours`,
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

  // useEffect(() => {
  //   const runFirst = 
  // })

  return {
    getSpots,
    getHours,
    addSpotAndHours,
    spotsData,
    // data
  }
}

export default useAPI;