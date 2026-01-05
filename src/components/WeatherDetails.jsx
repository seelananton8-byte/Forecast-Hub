import PropTypes from "prop-types";
import { Fragment } from "react";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";

function WeatherDetails({ icon, temp, city, country, lat, log, humidity, wind }) {
  return (
    <Fragment>
        <div className="image">
          <img src={icon} alt="Image" />
        </div>
        <div className="temp">{temp}°C</div>
        <div className="location">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
           <div>
             <span className="lat">latitude</span>
             <span>{lat}</span>
          </div>
          <div>
             <span className="lat">latitude</span>
             <span>{log}</span>
          </div>
        </div>
        <div className="data-container">
          <div className="element">
            <WiHumidity size={57} />
            <div className="data">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <WiStrongWind size={57} />
            <div className="data">
              <div className="wind-percent">{wind} km/h</div>
              <div className="text">WindSpeed</div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
}
export default WeatherDetails;