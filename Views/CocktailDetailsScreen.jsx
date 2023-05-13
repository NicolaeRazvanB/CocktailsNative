import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import SQLite from "react-native-sqlite-storage";
import * as SQLite from 'expo-sqlite';

export default function CocktailDetailsScreen({ route }) {
  const { cocktail } = route.params;
  const [saved, setSaved] = useState(false);

  let ingredients = [];
  let ingredientsText = '';
  let measuresText = '';

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(
        <Text key={`ingredient${i}`}>
          {ingredient} - {measure}
        </Text>
      );
      ingredientsText += `${ingredient};`;
      measuresText += `${measure};`;
    } else if (ingredient) {
      ingredients.push(<Text key={`ingredient${i}`}>{ingredient}</Text>);
      ingredientsText += `${ingredient};`;
    }
  }

  // --- db functionality ---
  const db = SQLite.openDatabase('savedCocktails.db');
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, type TEXT, glass TEXT, instructions TEXT, imageUrl TEXT, ingredients TEXT, measures TEXT);',
      [],
      () => console.log('Favorites table created'),
      //   console.log(cocktail),
      //   console.log(ingredientsText),
      //   console.log(measuresText),
      (err) => console.log('Error:', err)
    );
  });

  const handleSaveToFavorites = () => {
    db.transaction((tx) => {
      try {
        console.log(cocktail.strDrink),
          console.log(cocktail.strCategory),
          console.log(cocktail.strAlcoholic),
          console.log(cocktail.strGlass),
          console.log(cocktail.strInstructions),
          console.log(cocktail.strDrinkThumb),
          console.log(ingredientsText),
          console.log(measuresText),
          tx.executeSql(
            'INSERT INTO favorites (name, category, type, glass, instructions, imageUrl, ingredients, measures) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
              cocktail.strDrink,
              cocktail.strCategory,
              cocktail.strAlcoholic,
              cocktail.strGlass,
              cocktail.strInstructions,
              cocktail.strDrinkThumb,
              ingredientsText,
              measuresText,
            ],
            () => console.log('Cocktail saved to favorites'),
            (err) => console.log('Error2:', err)
          );
      } catch (error) {
        console.log('Error inserting cocktail into favorites:', error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {ingredients}
        <Text style={styles.subtitle}>Instructions:</Text>
        <Text>{cocktail.strInstructions}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSaveToFavorites}>
          <Text style={styles.buttonText}>Save to Favorites</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
