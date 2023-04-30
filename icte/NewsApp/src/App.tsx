/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Linking,
  Pressable,
} from 'react-native';

// UI Styles
import { styles, headingBG } from './Styles';

// Article definition (matches NYT results)
type Article = {
  title: string,
  url: string,
  abstract: string,
  multimedia: null | [{
    format: string,
    width: string,
    height: string,
    url: string,
  }]
};

// Default article...
const loadingArticle : Article = {
  title: "No news available!",
  url: "",
  abstract: "Pull down to refresh...",
  multimedia: null
};

////////////
// Main application

function App(): JSX.Element {
  let testList : Article[] = [ loadingArticle ];
  const [newsArticles, setNewsArticles] = useState<Article[]>(testList);
  const [newsCache, setNewsCache] = useState<Article[]>(testList);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [textFilter, setTextFilter] = useState<string>("");

  // Render a single news article
  function renderArticle({item}: {item: Article}) {
    let icon = "";
    if (item.multimedia) {
      for (let img of item.multimedia) {
        if (img["format"] == "Large Thumbnail") { icon = img["url"]; }
      }
    }

    return <Pressable onPress={() => Linking.openURL(item.url)}>
      <View style={styles.ArticleContainer}>
      {
      icon ? <Image style={styles.Icon} source={{uri: icon}}/> : null
      }
      <View style={styles.ArticleBody}>
        <Text style={styles.ArticleHead}>{item.title}</Text>
        <Text style={styles.Abstract}>{item.abstract}</Text>
      </View>
    </View></Pressable>
  }

  async function getArticles() {
    console.log("fetch news...")
    try {
      if (textFilter == "please fail") { throw -1; }
      let response = await fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=5Ag27t8Rw6kQY3vcQCq6XdFsRXFfFRwz");
      let json = await response.json();
      console.log("News fetched...");
      setRefreshing(false);
      setNewsCache(json["results"]);
      updateDisplay(json["results"], textFilter);
    } catch(e : any) {
      console.log("exception: " + e.message)
      let error = [{title: "Error loading articles", url: "...", abstract: "Please check your network and pull down to try again..."}];
      setRefreshing(false);
      setNewsCache(error as any);
      updateDisplay(error as any, "");
    }
  }

  function onChangeFilter(value: string) {
    setTextFilter(value);
    updateDisplay(newsCache, value);
  }

  function updateDisplay(articles: Article[], filter: string) {
    let subset = null;
    if (filter != "") {
      filter = filter.toLowerCase();
      subset = articles.filter((val: Article) => {
        return val.title.toLowerCase().indexOf(filter) >= 0 ||
               val.abstract.toLowerCase().indexOf(filter) >= 0;
      });
    } else {
      subset = articles;
    }
    setNewsArticles(subset.slice());
  }

  useEffect(() => { getArticles(); }, []);

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>News App</Text>
        <Text style={styles.SubTitle}>Some headlines for you!</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFilter}
        value={textFilter}
        placeholder="Search Articles..."
        keyboardType="default"
      />
      <FlatList
        data={ newsArticles }
        extraData={ newsArticles }
        renderItem={ renderArticle }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getArticles} />}
      />
    </SafeAreaView>
  );
}

export default App;
