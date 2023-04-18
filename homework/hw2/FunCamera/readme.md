# EEP 523A: Homework 2
**Tomas Perez Rodriguez**  
Spring 2023

## App description

![Application Components](./doc/ui.svg)

## Installation

After creating the folder locally (unzip or clone from git), run the following commands in the project folder:

```
npm install
sudo gem install cocoapods
cd ios
pod install
cd ..
```

Next, using xcode or android studio, configure the device to test with. After that, run the application with:

```
npx react-native run-ios
```

## Details

### Challenges
Adding Expo manually to a react native app was very hard. The manual expo install required a manual update to the AppDelegate.mm file. That had an out of date reference. This function has changed since it was documented, it now requires a second boolean parameter:

```
RCTAppSetupPrepareApp(application, false);
```

I had to completely disable the simulator functionality to accelerate development. When the phone disconnected from Metro, the build environment would try to build for x86_64 (simulator) and report many cryptic and unresolvable errors which seemed legitimate until I recognized (many hours later) that expo libraries are not supported in the simulator environment.

Additionally, adding expo changed my application name definition, so I had to investigate until the "Main was not defined" error linked in the references below.

Besides working on Expo, I also had issues editing images. I couldn't find a reasonable way to blur images in code and save the resulting files without resorting to "screen capture" solutions or other unpredictable approaches. I tried using the JIMP library, but that is only supported for Node. The code compiles for react-native, but when you try to run it, JIMP objects return empty objects with no functions instead. I finally had to switch to React Native Photo Manipulator which supports simple cropping and overlay image editing.

## References

[react-native-image-picker types](https://github.com/react-native-image-picker/react-native-image-picker/blob/main/src/types.ts)

[Main was not defined error: stack overflow solution](https://stackoverflow.com/questions/62649381/invariant-violation-main-has-not-been-registered)

[How to Use React-Native-Image-Picker](https://javascript.plainenglish.io/using-react-native-image-picker-4495776c8bae)

[Question Mark icon from icons8.com](https://icons8.com/icon/80933/question-mark)

[Follow Expo install instructions](https://docs.expo.dev/bare/installing-expo-modules/)

[Follow Expo Face Detector install](https://github.com/expo/expo/tree/sdk-48/packages/expo-face-detector)

[FaceDetector Usage](https://docs.expo.dev/versions/latest/sdk/facedetector/#facefeaturebounds)

[ReactNative OpenCV: drop to C++ and implement natively](https://medium.com/hackernoon/how-to-use-opencv-in-react-native-for-image-processing-db997e73678c)

[React Native Photo Manipulator](https://openbase.com/js/react-native-photo-manipulator)

[Getting started with JIMP](https://www.section.io/engineering-education/jimp-image-processing/)