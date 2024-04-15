import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import {CURRENT_WEATHER_API_URL,WEATHER_API_KEY} from './api'
import { useState } from 'react';

import './App.css';

function App() {
  
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecastWeather,setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log( searchData);
    const [lat,lon] = searchData.value.split(",");
    const currentWeatherFetch = fetch( `${CURRENT_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric` );
    const forecastrFetch = fetch( `${CURRENT_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric` );

    Promise.all([currentWeatherFetch,forecastrFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecastWeather({city: searchData.label, ...forecastResponse});
    })
    .catch(err => console.log(err))
  }

  console.log("hello")

  return (
    <div className="contanier">
      <Search onSearchChange={handleOnSearchChange} />
      
      {/* 
        // Conditional rendering, when currentWeather exists, render the CurrentWeather component
      */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}


    </div>
  );
}

export default App;
