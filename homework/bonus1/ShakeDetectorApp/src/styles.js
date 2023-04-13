import { StyleSheet } from 'react-native';
  
const headingBG = "white";
const mainbg = "white";

const styles = StyleSheet.create({
        Text: {
          fontSize: 16,
          color: "black"
        },
        ShookText: {
          fontSize: 32,
          color: "red"
        },
        UnShookText: {
          fontSize: 24,
          color: "blue"
        },
        ButtonBasic: {
        height: 45,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 8,
        padding: 10,
        margin: 2,
      },
      ButtonUp: {
        backgroundColor: "orange",
      },
      ButtonDown: {
        backgroundColor: "red",
      },
      ButtonLabel: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        color: "white",
      },    
});

export { styles, headingBG };