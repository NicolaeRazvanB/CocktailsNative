import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function CocktailDetailsScreen({ route }) {
  const { cocktail } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        <Text>{cocktail.strIngredient1}</Text>
        <Text>{cocktail.strIngredient2}</Text>
        <Text>{cocktail.strIngredient3}</Text>
        <Text>{cocktail.strIngredient4}</Text>
        <Text>{cocktail.strIngredient5}</Text>
        <Text>{cocktail.strIngredient6}</Text>
        <Text>{cocktail.strIngredient7}</Text>
        <Text>{cocktail.strIngredient8}</Text>
        <Text>{cocktail.strIngredient9}</Text>
        <Text>{cocktail.strIngredient10}</Text>
        <Text style={styles.subtitle}>Instructions:</Text>
        <Text>{cocktail.strInstructions}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});
