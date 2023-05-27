import { StyleSheet } from 'react-native';
  
const headingBG = "#262424";
const headingfg = "#e5dada";
const mainbg = "#323238";
const mainfg = "#f5dfdf";
const articlefg = "white";

const styles = StyleSheet.create({
  Main: {
    backgroundColor: mainbg,
    flex: 1,
    width: "100%"
  },
  List: {
    flexGrow: 1,
  },
  ContainerView: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },  
  Heading: {
    height: 85,
    backgroundColor: headingBG,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  Icon: {
    width: 75,
    height: 75,
  },
  TitleText: {
    fontSize: 42,
    color: headingfg,
  },
  SubTitle: {
    fontSize: 14,
    color: headingfg,
  },
  Text: {
    paddingBottom: 0,
    paddingLeft:5,
    fontSize: 18,
    color: mainfg
  },
  ButtonBasic: {
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
    padding: 10,
    margin: 8,
  },
  ButtonMovie: {
    height: 115,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
    padding: 10,
    margin: 8,
    flexWrap: 'wrap',
    flexShrink: 1,
    flexDirection: 'row',
    width: 125,
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