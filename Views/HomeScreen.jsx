import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";

const CocktailCard = ({ cocktail }) => {
    const navigation = useNavigation();

    const handleCardPress = (cocktail) => {
        navigation.navigate("CocktailDetailsScreen", { cocktail });
    };
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(cocktail)}
        >
            <Image
                source={{ uri: cocktail.strDrinkThumb }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <Text style={styles.cardName}>{cocktail.strDrink}</Text>
        </TouchableOpacity>
    );
};

const CocktailCategory = ({ title, cocktailIds }) => {
    const [cocktails, setCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const response = await Promise.all(
                    cocktailIds.map((id) =>
                        axios.get(
                            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                        )
                    )
                );
                const data = response.map((res) => res.data.drinks[0]);
                setCocktails(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching cocktails:", error);
            }
        };

        fetchCocktails();
    }, [cocktailIds]);

    return (
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{title}</Text>
            {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cocktails.map((cocktail) => (
                        <CocktailCard
                            key={cocktail.idDrink}
                            cocktail={cocktail}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default function HomeScreen() {
    const alcoholicCocktailIds = ["13162", "11027", "178325", "11050", "11025"];
    const nonAlcoholicCocktailIds = [
        "12560",
        "15106",
        "12572",
        "12890",
        "13807",
    ];
    const holidayPicksCocktailIds = [
        "17223",
        "178336",
        "17212",
        "15224",
        "11008",
    ];
    return (
        <ScrollView style={styles.container}>
            <CocktailCategory
                title="Alcoholic Cocktails"
                cocktailIds={alcoholicCocktailIds}
            />
            <CocktailCategory
                title="Non-Alcoholic Cocktails"
                cocktailIds={nonAlcoholicCocktailIds}
            />
            <CocktailCategory
                title="Holiday Picks"
                cocktailIds={holidayPicksCocktailIds}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        backgroundColor: colors.dirtyWhite,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    categoryContainer: {
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        width: 190,
        height: 200,
        marginRight: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 2,
    },
    cardImage: {
        width: "80%",
        height: "80%",
        borderRadius: 0,
    },
    cardName: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
});
