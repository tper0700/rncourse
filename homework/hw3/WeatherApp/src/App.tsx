/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

// UI Styles
import { styles, headingBG } from './Styles';

// App components
import { weather, Weather } from './components/weather';
import { coord, location, LocationList } from './components/locationlist';
import { Error } from './components/error';

// Key and APIs for open weather map
const API_KEY = "3e4cbeb9ad9614d13c4a6c7db8441829";
const API_REVERSE = "http://api.openweathermap.org/geo/1.0/reverse?"
const API_LOOKUP = "http://api.openweathermap.org/geo/1.0/direct?"
const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?"

////////////
// Main application
function App(): JSX.Element {

  // User selected location
  const [location, setLocation] = useState<string>("");

  // error to display
  const [error, setError] = useState<string>("");

  // location options for customer input
  const [options, setOptions] = useState<location[]|null>(null);

  // current conditions at location
  const [conditions, setConditions] = useState<weather|null>(null);

  /*
  getWeather: when a user selects a location call weather API to 
  get latest weather.
   */
  async function getWeather(c: coord) {
    let uri = `${API_WEATHER}lat=${c.lat}&lon=${c.lon}&units=metric&appid=${API_KEY}`;
    let response = await fetch(uri);
    let json = await response.json();
    if (json.hasOwnProperty("cod") && json.cod != 200) {
      // server returned error
      setError("Weather info not found, server error: " + json["message"]);
      setConditions(null);
    } else {
      let result : weather = {
        "temp": json.main.temp,
        "weather": json.weather[0].main + ": " + json.weather[0].description,
        "min": json.main.temp_min,
        "max": json.main.temp_max,      
      }
      console.log(result);
      setConditions(result);
    }
  }

  /*
  setLocationByCoord: If the coordinates are known (i.e. current
  location), call OpenWeather to get the city name and update the app
  coordinates to the closest city.

  Also, update the weather in this case.
   */
  async function setLocationByCoord(c : coord) {
    // Call lot/long to location name API
    let uri = `${API_REVERSE}lat=${c.lat}&lon=${c.lon}&appid=${API_KEY}`;
    let response = await fetch(uri);
    let json = await response.json();

    if (json.hasOwnProperty("cod")) {
      // server returned error
      setError("City not found, server error: " + json["message"]);
      setConditions(null);
    } else {
      let city = json[0]
      setLocation(city["state"] ?
        `${city["name"]}, ${city["state"]}, ${city["country"]}` :
        `${city["name"]}, ${city["country"]}`);
      getWeather({
        "lat": city["lat"],
        "lon": city["lon"],
      })
    }
  }

  /*
  getCurrentLocation(): Call GeoLocation to get curent location 
   */
  function getCurrentLocation() {
    setError("");
    setOptions(null);
    Geolocation.getCurrentPosition((info) => {
      let c : coord = {
        "lat": info.coords.latitude,
        "lon": info.coords.longitude,
      }
      setLocationByCoord(c);
    });
  }

  /*
  setNewLocation: Handle user search for a location string.
  Displays a menu of options through options state if multiple
  cities match search, or sets the weather if only one city found.
   */
  async function setNewLocation(value: string) {
    setError("");
    setOptions(null);

    // Query location name API
    let uri = `${API_LOOKUP}q=${value}&limit=5&appid=${API_KEY}`;
    let response = await fetch(uri);
    let json = await response.json();

    if (json.hasOwnProperty("cod")) {
      // cod property has error message
      setError("City not found, server error: " + json["message"]);
      setConditions(null);
    } else {
      // Map OpenWeather city list to a list of locations.
      let o = json.map((city, index) => ({
          "location": city["state"] ?
            `${city["name"]}, ${city["state"]}, ${city["country"]}` :
            `${city["name"]}, ${city["country"]}`,
          "coord": {
            "lat": city["lat"],
            "lon": city["lon"],
          },
          "id": index
        }));

      if (o.length == 1) {
        // Only one location matches search, set weather.
        selectOption(o[0]);
      } else if (o.length == 0) {
        // No locations, show an error
        setError("City not found, try again.")
        setConditions(null);
      } else {
        // Multiple locations, show selector.
        setOptions(o);
        setConditions(null);
      }
    }
  }

  /*
  selectOption: set the weather for the location selected by the user.
   */
  function selectOption(option: location) {
    getWeather(option.coord);
    setLocation(option.location);
    setOptions(null);
  }

  // On startup, get the current weather for the current location.
  useEffect(() => { getCurrentLocation(); }, []);

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={headingBG}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>WeatherApp</Text>
        <Text style={styles.SubTitle}>powered by OpenWeather</Text>
      </View>
      </TouchableWithoutFeedback>
        <Error error={error}/>
        <View style={styles.ContainerView}>
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={getCurrentLocation}
            >
            <Text>Here</Text>
          </Pressable>
          <TextInput
            style={styles.Input}
            onChangeText={setLocation}
            onSubmitEditing={(value) => setNewLocation(value.nativeEvent.text)}
            value={location}
            placeholder="Please select a location."
            keyboardType="default"
            selectTextOnFocus={true}
          />
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => {setNewLocation(location)}}
            >
            <Text>Search</Text>
          </Pressable>
        </View>
        <LocationList onSelect={selectOption} options={options}/>
        <Weather conditions={conditions}/>
    </SafeAreaView>
  );
}

export default App;
