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
  ArticleHead: {
    paddingBottom: 0,
    paddingLeft:5,
    fontSize: 18,
    fontWeight: "bold",
    color: articlefg,
  },
  Abstract: {
    paddingBottom: 0,
    paddingLeft:5,
    fontSize: 14,
    color: mainfg
  },
  ArticleContainer: {
    flexDirection: "row",
  },
  ArticleBody: {
    flex:1,
  },
});

export { styles, headingBG };