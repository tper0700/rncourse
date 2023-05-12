# Phones as Universal Remote Controls
**EEP523a Final Project Proposal**  
Tomas Perez-Rodriguez  

This project turns a single phone into a media control device that can manage playback of multiple network devices at the same time. The minimum viable product includes a media server application to play media on the host system, and a React Native application to remotely control the media playback.

## Topics Covered

* API: REST API to communicate between phone and media server
* Camera: QR Code Scanning Functionality
* GeoLocation: Location tracking to remember nearby servers

## Application Description

The mobile application will be implemented in two parts. A server will connect to a media player on the desktop computer, and expose a REST API for the mobile application to interact with. The application will use the camera and API to interact back with the server.

### Media Server

The media server will be a NodeJS web server application based on Express. It will expose a REST API with media control endpoints. These endpoints will allow clients to progamatically start playing media, stop playback, and adjust volume, as well as other media actions. To play media, the application will leverage the MPV media player via an API on the host.

### The Remote Control Application

The remote control application will serve as a client for the media server application. These are the key use cases:

* The user will be able to scan a QR Code to connect to the media server.
* The user will be able to select a video to play from a menu on the mobile application.
* The user will be able to pause, play, stop and change the volume from the phone.
* The media server will stop playback and return to the QR code screen when the remote is no longer around.

For QR code functionality, the app will use `react-native-qrcode-scanner` and `react-native-camera`. Once the application has a host URL, it will collect a playlist from the host. The screen will change to a playlist and playback control screen.

The most basic experience will show a list of movies to play available on the server. Once the user chooses one, the playback will begin, and the playback controls will be enabled in the phone.

While the application is open, it will keep in communication with the server keeping track of current playback state. This will be the cue for the server to continue playback or stop and return to the QR code screen.

In the media playback screen, the user will be able to return to the QR scanner page to connect to an additional server. If multiple servers have been connected, they will be shown on the QR code selection screen so the user doesn't have to scan QR codes to switch servers. The list of previously discovered servers will be filtered by geolocation: only servers within a few meters of the remote will be configurable by the application.

## Mobile User Interface



# Requirements

 * [x] A concise project title and brief description.
 * [x] A list of at least three covered topics (API, device sensors, external sensor, BLE, GeoLocation, Camera) that will be integrated into your application.
 * [x] A detailed scope outlining the app's features, functionalities, native APIs, and external APIs (if applicable).
 * [ ] A description of the user interface and user experience, including layout, navigation, design elements, and user feedback mechanisms.
 * [ ] An overview of anticipated technical challenges and potential solutions.
