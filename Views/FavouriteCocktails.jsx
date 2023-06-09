import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    RefreshControl,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteCocktails({ route }) {
    const [cocktails, setCocktails] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    // const { db } = route.params;
    const db = SQLite.openDatabase("savedCocktails.db");
    const navigation = useNavigation();

    const fetchCocktails = () => {
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
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCocktails();
    }, []);

    const handleCardPress = (cocktail) => {
        navigation.navigate("FavouriteCocktailDetailsScreen", { cocktail });
    };

    const renderCocktail = ({ item }) => {
        const windowWidth = Dimensions.get("window").width;
        const cardWidth = (windowWidth - 60) / 2;

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

    const onRefresh = () => {
        setRefreshing(true);
        fetchCocktails();
    };

    return (
        <View style={styles.container}>
            {cocktails.length ? (
                <FlatList
                    data={cocktails}
                    renderItem={renderCocktail}
                    keyExtractor={(item) => item.idDrink}
                    numColumns={2}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
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
        marginTop: 10,
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
        margin: 5,
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
