import React, { useState } from "react";
import { Country, State, City }  from 'country-state-city';

import Select from "react-select";

const SelectLocation = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = Country.getAllCountries();
 
  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const states =
    selectedCountry !== ""
      ? State.getStatesOfCountry(selectedCountry)
      : [];
  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));
 
  const cities =
    selectedState !== ""
      ? City.getCitiesOfState(selectedState)
      : [];
  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));


  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setSelectedCity("");
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  return (
    <div>
      <Select
        placeholder="Select Country"
        options={countryOptions}
        onChange={handleCountryChange}
      />
      {selectedCountry !== "" && (
        <Select
          placeholder="Select State"
          options={stateOptions}
          onChange={handleStateChange}
        />
      )}
      {selectedState !== "" && (
        <Select
          placeholder="Select City"
          options={cityOptions}
          onChange={handleCityChange}
        />
      )}
    </div>
  );
};

export default SelectLocation;
