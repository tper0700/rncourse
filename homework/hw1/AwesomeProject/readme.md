A readme file inside the zip file explaining in brief the working of your App, how many
hours it took you to complete it, what were the most challenging parts, and please cite
any websites or any other sources you used.

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

## Details
Project took about 10 hours to complete. The most challenging part, about 3 hours, was trying to figure out why the list of elements wasn't refreshing on update. It turned out that reusing the same list every time would mean the state wouldn't recognize a change.

## References

