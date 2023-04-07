# EEP 523A: Homework 1
**Tomas Perez Rodriguez**  
Spring 2023

## App description

The main application implemented in `App.tsx` keeps track of a `catList`, appending and removing cats from it. It also keeps track of cat names to use when adding cats.

The top level `SafeView` component has a `View` for the heading, a `FlatList` and a button to add cats to the list. The FlatList uses a `Feline` component defined in `cat.js`, which defines a View with multiple `Text` boxes and a button to "delete" a cat.

All buttons in the app are implemented using `Pressable` components, to support visual display of buttons. This avoids the limitations of simple `Buttons` which don't support visual configuration.

The main app has two event handler functions `addCat` and `removeCat`. The `addCat` handler is called from the onPress event of the add cat button on the app itself.

```
      <Pressable
        style={({pressed}) => [ appStyles.ButtonBasic, pressed ? appStyles.ButtonDown : appStyles.ButtonUp ]}
        onPress={addCat}
        >
```

The removeCat handler is passed down to the `Feline` component as a prop.

```
    return <Feline cat={entry.item.name} index={entry.index} onRemove={removeCat}/>
```

`Feline` connects the event to the onPress of each `FlatList` row.

```
      <Pressable
        style={({pressed}) => [ catStyles.ButtonBasic, pressed ? catStyles.ButtonDown : catStyles.ButtonUp ]}
        onPress={() => props.onRemove(props.index)}
        >
```

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
Project took about 10 hours to complete. The most challenging part, about 3 hours, was trying to figure out why the list of elements wasn't refreshing on update. It turned out that reusing the same list every time would mean the state wouldn't recognize a change.

## References

* [FlatList and other component documentation](https://reactnative.dev/docs/flatlist)
* [How to run an app in xcode](https://help.apple.com/xcode/mac/current/#/dev5a825a1ca)
* [A deep dive into React Native FlatList](https://blog.logrocket.com/deep-dive-react-native-flatlist/)
