import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";

export default function FavouriteCocktailDetailsScreen({ route }) {
    const { cocktail } = route.params;
    const db = SQLite.openDatabase("./savedCocktails.db");
    const [saved, setSaved] = useState(false);

    const ingredientsList = cocktail.ingredients.split(";");
    const measuresList = cocktail.measures.split(";");

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

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{cocktail.name}</Text>
                <Text style={styles.subtitle}>Ingredients:</Text>
                <View style={styles.tableContainer}>
                    {ingredientsList.map((ingredient, index) => {
                        const measure = measuresList[index]
                            ? measuresList[index]
                            : "-";
                        if (ingredient && measure) {
                            return (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.ingredientText}>
                                        {ingredient}
                                    </Text>
                                    <Text style={styles.measureText}>
                                        {measure}
                                    </Text>
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>
                <Text style={styles.subtitle}>Instructions:</Text>
                <Text>{cocktail.instructions}</Text>
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
                    source={{ uri: cocktail.imageUrl }}
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
    tableContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    ingredientText: {
        marginRight: 10,
    },
    measureText: {
        marginLeft: 10,
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
