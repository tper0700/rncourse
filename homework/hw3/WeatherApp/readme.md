# EEP 523A: Homework 3
**Tomas Perez Rodriguez**  
Spring 2023

## App description

This application allows the user to check weather conditions for any city they can search for. It uses the OpenWeather API to get weather data as needed.

On load, the application shows a search box set to the current location. After querying the OpenWeather API, it displays the weather conditions. The user can then search for and select other cities using the search box.

### APIs used

| API Variable | URL |
|--------------|-----|
| API_REVERSE  | http://api.openweathermap.org/geo/1.0/reverse |
| API_LOOKUP   | http://api.openweathermap.org/geo/1.0/direct |
| API_WEATHER  |https://api.openweathermap.org/data/2.5/weather |

* **API_REVERSE**: Converts from Lat/Long to city names
* **API_LOOKUP**: Converts from city names to lat/long
* **API_WEATHER**: Queries the weather conditions for a given lat/long

### Data Flow
There are two ways to query weather in the application:

* Searching for a city by name. Since the weather API requires lat/long values instead of a city name, the `setNewLocation` function takes the user input from the text box and calls `API_LOOKUP` to get the lat/long. If multiple options are available, the application calls `setOptions` to display a selection UI. If a single option returns, or when the user chooses one of the UI options, the app calls `selectOption` and `getWeather` to update the UI.
* Loading the weather for the current physical location. The `setLocationByCoord` queries the location from GeoLocation, and then calls the `API_REVERSE` API in `setLocationByCoord`. Given the updated lat long from API_REVERSE, the app then calls `setLocation` and `getWeather` to update the UI.

In either case, armed with Lat/Long for a city, the application calls `getWeather` to access the `API_WEATHER` and update the weather display.

Weather information is shown in a `Weather` component implemented in `components/weather.tsx`. When multiple cities are available, the app shows a list of cities using the `LocationList` component implemented in `locationlist.tsx`.

## Installation

After creating the folder locally (unzip or clone from git), run the following commands in the project folder:

```
npm install
npx pod-install
```

Next, using xcode or android studio, configure the device to test with. After that, run the application with:

```
npx react-native run-ios
```

## Details

This project took approximately 8 hours to complete.

* 1 hour for project setup and API configuration.
* 3 hours to implement and test the city selection functionality.
* 2 hour to implement the weather query and rendering.
* 2 hour for polish and documentation.


### Challenges

The only minor challenges in this project were configuring and testing the API, and deciding on a design to select cities.

The API configuration issues were resolved by correcting network configuration on the phone, particularly enabling `NSExceptionAllowsInsecureHTTPLoads` for OpenWeather.

The UI design revolved around choosing to display a popup UI when selecting multiple cities. For this application it made more sense to display the options as buttons in place of the weather display that was no longer applicable. This made it clear that the city currently in the search box is the city for which weather is displayed.

## References

[Using openweather for reverse location lookup](https://openweathermap.org/api/geocoding-api#reverse)

[Geolocation component for local lat/log](https://www.npmjs.com/package/@react-native-community/geolocation)