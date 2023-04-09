import { StyleSheet } from 'react-native';
  
const headingBG = "#262424";
const headingfg = "#e5dada";
const mainbg = "#ebebd3";

const styles = StyleSheet.create({
  Main: {
    backgroundColor: mainbg,
    flex: 1,
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
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 24,
    color: "#4466ED"
  },
  ModalContainer: {
    flexDirection: "column",
    height: 255,
  },
  ModalView: {
    flex:1,
  },
  ButtonView: {
    justifyContent: "flex-end"
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
  PromptContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  PromptView: {
    padding: 8,
    marginTop: 15,
    marginBottom: 60,
    backgroundColor: headingBG,
    borderRadius: 8,
  },
  PromptButtons: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export { styles, headingBG };