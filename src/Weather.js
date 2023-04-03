import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      feels_like: response.data.main.feels_like,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3a94f3778290bfeee61278505dbbe51d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        className="form-control"
        onChange={updateCity}
      />

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );

  return (
    <Container className="Weather">
      {form}
      <Row className="justify-content-md-center">
        <Col>
          <h1>{city}</h1>
          <h2>
            <span>{weather.date}</span>
          </h2>
          <br />
          <h3>{weather.description}</h3>
          <br />
          <button type="submit" className="currentLocationButton">
            Current location
          </button>
        </Col>
        <Col>
          <Col className="weatherNow">
            <ul>
              <li classNames="tempNow">
                <strong>{Math.round(weather.temperature)}</strong>
                <a href="/" className="celsiusTemp">
                  °C
                </a>
                |
                <a href="/" className="farenheitTemp">
                  °F
                </a>
              </li>
              <li className="feelsLike">
                Feels like: {Math.round(weather.feels_like)} °C
              </li>
              <li className="humidity">Humidity: {weather.humidity} %</li>
              <li className="wind">Wind: {weather.wind} km/h</li>
            </ul>
          </Col>
          <Col>
            <img
              src={weather.icon}
              alt={weather.description}
              className="mainWeatherPic"
            />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
