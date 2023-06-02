import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { colors } from "../constants/theme";

export default function CocktailDetailsScreen({ route }) {
    const { cocktail } = route.params;
    const db = SQLite.openDatabase("./savedCocktails.db");
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState("ingredients");

    let ingredients = [];
    let ingredientsText = "";
    let measuresText = "";

    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients.push({ ingredient, measure });
            ingredientsText += `${ingredient};`;
            measuresText += `${measure};`;
        } else if (ingredient) {
            ingredients.push({ ingredient, measure: "-" });
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

    const renderContent = () => {
        if (activeTab === "ingredients") {
            return (
                <View style={styles.contentContainer}>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.ingredientText}>
                                    {ingredient.ingredient}
                                </Text>
                                <Text style={styles.measureText}>
                                    {ingredient.measure}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            );
        } else if (activeTab === "instructions") {
            return (
                <View style={styles.contentContainer}>
                    <Text style={{ fontSize: 16 }}>
                        {cocktail.strInstructions}
                    </Text>
                </View>
            );
        }
    };

    const imageHeight = (Dimensions.get("window").height - 20) / 2.5;
    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer, { height: imageHeight }]}>
                <Image
                    style={styles.image}
                    source={{ uri: cocktail.strDrinkThumb }}
                ></Image>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.tagsContainer}>
                    <Text style={{ marginRight: 10 }}>Tags:</Text>
                    <View style={styles.tag}>
                        <Text>{cocktail.strAlcoholic}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text>{cocktail.strCategory}</Text>
                    </View>
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>{cocktail.strDrink}</Text>
                    <TouchableOpacity>
                        <Image
                            style={styles.icon}
                            source={require("../assets/icons/heart-regular.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.switchContainer}>
                    <TouchableOpacity
                        onPress={() => setActiveTab("ingredients")}
                        style={[
                            styles.tabButton,
                            activeTab === "ingredients" && styles.switchOn,
                        ]}
                    >
                        <Text
                            style={[
                                styles.subtitle,
                                activeTab === "ingredients" &&
                                    styles.activeTabText,
                            ]}
                        >
                            Ingredients
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab("instructions")}
                        style={[
                            styles.tabButton,
                            activeTab === "instructions" && styles.switchOn,
                        ]}
                    >
                        <Text
                            style={[
                                styles.subtitle,
                                activeTab === "instructions" &&
                                    styles.activeTabText,
                            ]}
                        >
                            Instructions
                        </Text>
                    </TouchableOpacity>
                </View>
                {renderContent()}
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 10,
        position: "absolute",
    },
    textContainer: {
        flex: 1,
        alignItems: "flex-start",
        // justifyContent: "flex-start",
        padding: 10,
        width: "100%",
    },
    imageContainer: {
        // position: "relative",
        // height: 200,
        width: "100%",
        flex: 1,
        overflow: "hidden",
        borderRadius: 10,
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
    },
    tagsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    tag: {
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
        padding: 10,
        height: 40,
        width: 120,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    icon: {
        height: 30,
        width: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 30,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.blue,
        width: "80%",
        height: 50,
        borderRadius: 50,
        paddingHorizontal: 10,
        alignSelf: "center",
    },
    switchOn: {
        backgroundColor: colors.white,
        borderRadius: 50,
        width: "50%",
    },
    tabButton: {
        width: "50%",
        alignItems: "center",
        paddingVertical: 5,
    },
    activeTabText: {
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
    },
    contentContainer: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        width: "90%",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        paddingBottom: 5,
    },
    ingredientText: {
        marginRight: 10,
    },
    measureText: {
        marginLeft: 10,
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
