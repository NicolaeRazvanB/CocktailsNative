import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteCocktails({ route }) {
    const [cocktails, setCocktails] = useState([]);
    // const { db } = route.params;
    const db = SQLite.openDatabase("savedCocktails.db");
    const navigation = useNavigation();

    useEffect(() => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM favorites",
                    [],
                    (_, { rows: { _array } }) => {
                        if (_array && _array.length) {
                            setCocktails(_array);
                        }
                    }
                );
            });
        } catch (error) {
            console.log("Error retrieving data from database:", error);
        }
    }, []);

    const handleCardPress = (cocktail) => {
        navigation.navigate("FavouriteCocktailDetailsScreen", { cocktail });
    };

    const renderCocktail = ({ item }) => {
        const windowWidth = Dimensions.get("window").width;
        const cardWidth = (windowWidth - 30) / 2;

        return (
            <TouchableOpacity
                style={[styles.card, { width: cardWidth }]}
                onPress={() => handleCardPress(item)}
            >
                <Image style={styles.image} source={{ uri: item.imageUrl }} />
                <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {cocktails.length ? (
                <FlatList
                    data={cocktails}
                    renderItem={renderCocktail}
                    keyExtractor={(item) => item.idDrink}
                />
            ) : (
                <Text>No saved cocktails found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
