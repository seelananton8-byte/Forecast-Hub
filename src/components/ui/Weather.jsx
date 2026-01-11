import WeatherSkeleton from "../services/WeatherSkeleton";
import { UI_TEXT } from "../constants/strings";
import { IoSearch } from "react-icons/io5";
import WeatherDetails from "./WeatherDetails"
import { Fragment, useEffect, useState } from "react";
import { weatherIconMap } from "../../utils/weatherIconMap";
import clearIcon from "../../assets/01d.png";

function Weather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState();
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  
  const search = async() => {
    setShowSuggestions(false)
    setSuggestions([]) 
    setLoading(true) 

    const url = `${BASE_URL}weather?q=${text}&appid=${API_KEY}&units=Metric`
    try {
      const res = await fetch(url)
      const data = await res.json() 
      if (data.cod === "404") {
        console.error("City not found")
        setCityNotFound(true)
        setLoading(false)
        return;
      }

      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon)
      setCityNotFound(false)
    } catch(error) {
      console.error("An error occurred:", error.message)
      setError("An error occurred while fetching weather data.")
    } finally {
      setLoading(false)
    }
  }

  const fetchCitySuggestions = async(value) => {
    if (!value) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    try {
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`)
      const data = await res.json()
      setSuggestions(data)
      setShowSuggestions(true)
    }catch(error) {
      console.error(error)
    }
  }

  const handleCity = (e) => {
    setText(e.target.value)
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  useEffect(() => {
    search()
  }, [])

  useEffect(() => {
  if (isFirstLoad) {
    setIsFirstLoad(false)
    return 
  }

  const timer = setTimeout(() => {
    fetchCitySuggestions(text)
  }, 500)

  return () => clearTimeout(timer)
}, [text])

  return (
    <Fragment>
        <div className="container">
        <div className="input-container">
            <input type="text" className="cityInput" placeholder="Search City"
             onChange={handleCity} value={text}  onKeyDown={handleKeyDown}/>
            <div className="search-icon">
               <IoSearch  className="img" onClick={() => search()} />
            </div>
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((item, index) => (
                    <li
                    key={index}
                    onClick={() => {
                      setText(item.name)
                      setSuggestions([])   
                      setShowSuggestions(false)
                      search()
                    }}
                    >
                      {item.name}, {item.country}
                    </li>
                  ))}
                </ul>
            )}
          </div>

           {loading && <WeatherSkeleton />}
           {error && <div className="error-mess">{error}</div>}
           {cityNotFound && <div className="city-not-found">{UI_TEXT.CITY_NOT_FOUND}</div>}

           {!loading && !cityNotFound && !error ?
           (
           <WeatherDetails icon={icon} temp={temp} city={city} 
           country={country}  lat={lat} log={log}
           humidity={humidity} wind={wind}/>
           ): null }

            <p className="copyright">
              Designed by <span>{UI_TEXT.OWNER}</span>
            </p>
      </div>    
    </Fragment>
  )
}
export default Weather
