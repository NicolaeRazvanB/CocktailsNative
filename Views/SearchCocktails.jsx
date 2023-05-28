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
import { colors, shadow } from "../constants/theme";

export default function SearchCocktails({ route }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [filter, setFilter] = useState("");

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

    const handleFilterPress = (value) => {
        setFilter(value);
    };

    const handleShowAll = () => {
        setFilter("");
    };

    const filteredCocktails = cocktails.filter((cocktail) => {
        if (filter === "Alcoholic") {
            return cocktail.strAlcoholic === "Alcoholic";
        } else if (filter === "Non-Alcoholic") {
            return cocktail.strAlcoholic === "Non alcoholic";
        } else {
            return true;
        }
    });

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
            <View style={styles.filtersContainer}>
                <Text>Filter the results:</Text>
                <TouchableOpacity
                    style={[styles.button, !filter && styles.activeButton]}
                    onPress={handleShowAll}
                >
                    <Text style={styles.buttonText}>Show All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        filter === "Alcoholic" && styles.activeButton,
                    ]}
                    onPress={() => handleFilterPress("Alcoholic")}
                >
                    <Text style={styles.buttonText}>Alcoholic</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        filter === "Non-Alcoholic" && styles.activeButton,
                    ]}
                    onPress={() => handleFilterPress("Non-Alcoholic")}
                >
                    <Text style={styles.buttonText}>Non-Alcoholic</Text>
                </TouchableOpacity>
            </View>

            {filteredCocktails.length ? (
                <FlatList
                    data={filteredCocktails}
                    renderItem={renderCocktail}
                    keyExtractor={(item) => item.idDrink}
                    numColumns={2}
                />
            ) : (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No cocktails found</Text>
                </View>
            )}
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
    noResultsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    noResultsText: {
        fontStyle: "italic",
        fontSize: 16,
    },
    searchBarContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        // border: "1px solid black",
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 20,
        width: "80%",
        paddingLeft: 10,
    },
    searchBar: {
        height: 40,
        // width: "50%",
        // marginBottom: 10,
        // paddingHorizontal: 10,
        // alignSelf: "center",
        // marginHorizontal: "auto",
        flex: 1,
        marginLeft: 10,
    },
    searchIcon: {
        width: 22,
        height: 22,
        tintColor: colors.lightGray,
    },
    filtersContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    button: {
        backgroundColor: colors.blue,
        borderRadius: 20,
        padding: 10,
        height: 35,
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
        padding: 10,
        height: 35,
        marginHorizontal: 5,
    },
    buttonText: {
        color: colors.black,
        fontWeight: "400",
        fontSize: 12,
        alignSelf: "center",
        paddingHorizontal: 5,
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
