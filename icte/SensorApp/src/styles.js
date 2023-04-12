import { StyleSheet } from 'react-native';
  
const headingBG = "white";
const mainbg = "white";

const styles = StyleSheet.create({
    Text: {
        fontSize: 16,
        color: "black"
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