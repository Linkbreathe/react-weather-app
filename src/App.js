import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import {CURRENT_WEATHER_API_URL,WEATHER_API_KEY} from './api'
import './App.css';
import { useState } from 'react';

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

  return (
    <div className="contanier">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather data={currentWeather}/>
    </div>
  );
}

export default App;
