function mungeLocation(apiResponse){
  return {
    formatted_query: apiResponse[0].display_name,
    latitude: apiResponse[0].lat,
    longitude: apiResponse[0].lon,
  };
}



function mungeWeather(apiResponse){

  const parsedData = apiResponse.data.map(item => {
    return {
      forecast: item.weather.description,
      time: new Date(item.ts * 1000).toDateString(),
    };
  });

  return parsedData;
}

function mungeReviews(apiResponse){
    
  const parsedData = apiResponse.businesses.map(item => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url,
    };
  }
  );
  return parsedData;
  
}

module.exports = {
  mungeLocation, mungeWeather, mungeReviews
};