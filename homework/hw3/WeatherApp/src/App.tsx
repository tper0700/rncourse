/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Linking,
  Pressable,
  ScrollView,
} from 'react-native';

const API_KEY = "3e4cbeb9ad9614d13c4a6c7db8441829";
const API_REVERSE = "http://api.openweathermap.org/geo/1.0/reverse?"
const API_LOOKUP = "http://api.openweathermap.org/geo/1.0/direct?"
const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?"

import Geolocation from '@react-native-community/geolocation';

// UI Styles
import { styles, headingBG } from './Styles';

type coord = {
  "lon": number,
  "lat": number,
}

type location = {
  "location": string,
  "coord": coord,
  "id": number,
}

type weather = {
  "temp": string,
  "weather": string,
  "min": string,
  "max": string,
}

////////////
// Main application
function App(): JSX.Element {

  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<location[]|null>(null);
  const [conditions, setConditions] = useState<weather|null>(null);

  async function setCoords(c: coord) {
    let uri = `${API_WEATHER}lat=${c.lat}&lon=${c.lon}&units=metric&appid=${API_KEY}`;
    let response = await fetch(uri);
    let json = await response.json();
    if (json.hasOwnProperty("cod") && json.cod != 200) {
      setError(json["message"]);
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

  // Update the system and render the weather.
  async function setLocationByCoord(c : coord) {
    let uri = `${API_REVERSE}lat=${c.lat}&lon=${c.lon}&appid=${API_KEY}`;
    let response = await fetch(uri);
    let json = await response.json();
    if (json.hasOwnProperty("cod")) {
      setError(json["message"]);
    } else {
      let city = json[0]
      setLocation(city["state"] ?
        `${city["name"]}, ${city["state"]}, ${city["country"]}` :
        `${city["name"]}, ${city["country"]}`);
      setCoords({
        "lat": city["lat"],
        "lon": city["lon"],
      })
    }
  }

  // Get current location from system and resolve location name
  function getCurrentLocation() {
    setError(null);
    setOptions(null);
    Geolocation.getCurrentPosition((info) => {
      let c : coord = {
        "lat": info.coords.latitude,
        "lon": info.coords.longitude,
      }
      setLocationByCoord(c);
    });
  }

  async function setNewLocation(value: string) {
    setError(null);
    setOptions(null);
    let uri = `${API_LOOKUP}q=${value}&limit=5&appid=${API_KEY}`;
    let response = await fetch(uri);
    let json = await response.json();
    if (json.hasOwnProperty("cod")) {
      setError(json["message"]);
    } else {
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
        selectOption(o[0]);
      } else {
        setOptions(o);
        setConditions(null);
      }
    }
  }

  function selectOption(option: location) {
    setCoords(option.coord);
    setLocation(option.location);
  }

  useEffect(() => { getCurrentLocation(); }, []);

  const OptionItem = (props) => (
    <View>
      <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={() => { selectOption(props.option); setOptions(null)} }
        >
      <Text>{props.option.location}</Text>
      <Text>({props.option.coord.lat}, {props.option.coord.lon})</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={headingBG}
      />
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>WeatherApp</Text>
        <Text style={styles.SubTitle}>powered by OpenWeather</Text>
      </View>
        {
          error ? <View>
            <Text style={styles.Text}>Error from server</Text>
            <Text style={styles.Text}>{error}</Text>
          </View> : null
        }
          <View>
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
            onPress={getCurrentLocation}
            >
              <Text>Reset to here</Text>
            </Pressable>
          </View>
        {
          options ? <FlatList
            data={options}
            renderItem={({item}) => <OptionItem option={item} />}
            keyExtractor={item => item.id}
            /> : null
        }
        {
          conditions ? <View>
            <Text style={styles.Text}>Weather Conditions: {conditions.weather}</Text>
            <Text style={styles.Text}>Current Temp: {conditions.temp} C</Text>
            <Text style={styles.Text}>Min Temp: {conditions.min} C</Text>
            <Text style={styles.Text}>Max Temp: {conditions.max} C</Text>
          </View> : null
        }
    </SafeAreaView>
  );
}

export default App;
