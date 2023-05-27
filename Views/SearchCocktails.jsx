import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";

export default function SearchCocktails({ route }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);

    const navigation = useNavigation();

    const searchCocktails = async () => {
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const data = await response.json();
        setCocktails(data.drinks);
    };

    const handleCardPress = (cocktail) => {
        navigation.navigate("CocktailDetailsScreen", { cocktail });
    };

    const renderCocktail = ({ item }) => {
        const windowWidth = Dimensions.get("window").width;
        const cardWidth = (windowWidth - 60) / 2;

        return (
            <TouchableOpacity
                style={[styles.card, { width: cardWidth }]}
                onPress={() => handleCardPress(item)}
            >
                <Image
                    style={styles.image}
                    source={{ uri: item.strDrinkThumb }}
                />
                <Text style={styles.title}>{item.strDrink}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>What do you want to explore today?</Text>
            <View style={styles.searchBarContainer}>
                <Image
                    source={require("../assets/icons/icons8_search_100.png")}
                    style={styles.searchIcon}
                />
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
        backgroundColor: colors.dirtyWhite,
    },
    text: {
        fontStyle: "italic",
        fontSize: 16,
        paddingBottom: 10,
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
        borderRadius: 20,
        paddingLeft: 36,
    },
    searchIcon: {
        position: "absolute",
        top: 8,
        left: 152,
        width: 25,
        height: 25,
        tintColor: colors.lightGray,
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
        margin: 5,
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
