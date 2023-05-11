import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

export default function SearchCocktailsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();
    setCocktails(data.drinks);
  };

  const renderCocktail = ({ item }) => {
    const windowWidth = Dimensions.get("window").width;
    const cardWidth = (windowWidth - 30) / 2;

    return (
      <View style={[styles.card, { width: cardWidth }]}>
        <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
        <Text style={styles.title}>{item.strDrink}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Cocktails"
          onChangeText={setSearchTerm}
          onSubmitEditing={searchCocktails}
        />
      </View>
      <FlatList
        data={cocktails}
        renderItem={renderCocktail}
        keyExtractor={(item) => item.idDrink}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginHorizontal: "auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  image: {
    height: 200,
    resizeMode: "contain",
  },
});
