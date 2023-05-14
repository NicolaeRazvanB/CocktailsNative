import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";

export default function CocktailDetailsScreen({ route }) {
    const { cocktail } = route.params;
    // const { db } = route.params;
    const db = SQLite.openDatabase("./savedCocktails.db");
    const [saved, setSaved] = useState(false);
    // const [db, setDb] = useState(null);

    // useEffect(() => {
    //     if (route.params && route.params.db) {
    //         setDb(route.params.db);
    //     }
    // }, [route.params]);

    let ingredients = [];
    let ingredientsText = "";
    let measuresText = "";

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

    const deleteCocktail = (idDrink) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM favorites WHERE idDrink = ?",
                [idDrink],
                () => {
                    console.log("Cocktail deleted from favorites");
                    tx.executeSql(
                        "SELECT * FROM favorites",
                        [],
                        (_, { rows }) => console.log(rows)
                    );
                },
                (err) => console.log("Error deleting cocktail:", err)
            );
        });
    };

    const handleSaveToFavorites = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO favorites (idDrink, name, category, type, glass, instructions, imageUrl, ingredients, measures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    cocktail.idDrink,
                    cocktail.strDrink,
                    cocktail.strCategory,
                    cocktail.strAlcoholic,
                    cocktail.strGlass,
                    cocktail.strInstructions,
                    cocktail.strDrinkThumb,
                    ingredientsText,
                    measuresText,
                ],
                () => {
                    console.log("Cocktail saved to favorites");
                    tx.executeSql(
                        "SELECT * FROM favorites",
                        [],
                        (_, { rows }) => console.log(rows)
                    );
                },
                (err) =>
                    console.log("Error inserting cocktail into favorites:", err)
            );
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveToFavorites}
                >
                    <Text style={styles.buttonText}>Save to Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteCocktail(cocktail.idDrink)}
                >
                    <Text style={styles.buttonText}>Delete from Favorites</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: cocktail.strDrinkThumb }}
                />
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
    button: {
        backgroundColor: "blue",
        borderRadius: 5,
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
