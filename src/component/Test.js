import React from 'react';
import Axios from 'axios';

const Test = () => {

  React.useEffect(() => {
    const getSpots = async() => {
      try {
        const response = await Axios({
          method: 'get',
          url: `https://seshn.netlify.app/spots`
        });
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getSpots();
  }, [])

  return (
    <div>Test</div>
  )
}

export default Test