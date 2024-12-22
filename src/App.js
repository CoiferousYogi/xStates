//import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");

    if (country) {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );

        const data = await response.json();

        setStates(data);
      } catch (error) {
        console.error("Error fetching states", error);
      }
    } else {
      setStates([]);
    }
  };

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");

    if (state) {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
        );

        const data = await response.json();

        setCities(data);
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = async (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <br></br>
      <div className="selectionContainer">
        <div className="countrySelector">
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="stateSelector">
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select a State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="citySelector">
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br></br>
      {selectedCountry && selectedState && selectedCity && (
        <p>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default App;
