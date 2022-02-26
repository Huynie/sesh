import Axios from 'axios';
const baseURL = 'http://sesh-env.eba-t2bymcma.us-west-1.elasticbeanstalk.com';

const getSpots = async () => {
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
}
const getHours = async () => {
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
}

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

const spotsData = async () => {
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
}

export {
  getSpots,
  getHours,
  spotsData,
  addSpotAndHours
};