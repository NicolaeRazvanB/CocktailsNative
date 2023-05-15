import React, { useRef, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Animated,
    Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageBackground } from "react-native";
import SearchCocktailsScreen from "./Views/SearchCocktails";
import ViewFavoriteCocktailsScreen from "./Views/FavouriteCocktails";
import CocktailDetailsScreen from "./Views/CocktailDetailsScreen";
import CustomSplashScreen from "./Components/CustomSplashScreen";

import * as SQLite from "expo-sqlite";
import * as Font from "expo-font";

const customFonts = {
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
};
const Stack = createStackNavigator();

export default function App() {
    const [splashLoaded, setSplashLoaded] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeInAnim, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
        }).start();
    }, [fadeInAnim]);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync(customFonts);
            setFontsLoaded(true);
        };
        loadFonts();
        const db = SQLite.openDatabase("savedCocktails.db");

        // --- cod de sters bd daca e nevoie la debugging - NU STERGETI
        // dbFile.transaction((tx) => {
        //     tx.executeSql(
        //         "DROP TABLE IF EXISTS favorites",
        //         [],
        //         () => console.log("Favorites table deleted"),
        //         //   console.log(cocktail),
        //         //   console.log(ingredientsText),
        //         //   console.log(measuresText),
        //         (err) => console.log("Error:", err)
        //     );
        // });

        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS favorites (idDrink TEXT PRIMARY KEY, name TEXT, category TEXT, type TEXT, glass TEXT, instructions TEXT, imageUrl TEXT, ingredients TEXT, measures TEXT);",
                [],
                () => console.log("Favorites table created"),
                (err) => console.log("Error:", err)
            );
        });
    }, []);

    if (!splashLoaded || !fontsLoaded) {
        return (
            <CustomSplashScreen
                fadeInAnim={fadeInAnim}
                setSplashLoaded={setSplashLoaded}
            />
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "Home",
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                    }}
                    // initialParams={{ db }}
                />
                <Stack.Screen
                    name="Favorites"
                    component={ViewFavoriteCocktailsScreen}
                    options={{
                        title: "Favorite Cocktails",
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                    }}
                    // initialParams={{ db }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchCocktailsScreen}
                    options={{
                        title: "Cocktail Search",
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                    }}
                    // initialParams={{ db }}
                />
                <Stack.Screen
                    name="CocktailDetailsScreen"
                    component={CocktailDetailsScreen}
                    options={({ route }) => ({
                        title: route.params.cocktail.strDrink,
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                    })}
                    // initialParams={{ db }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={require("./assets/welcome.jpg")}
            resizeMode="cover"
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.text}>Welcome to Cocktail Empire</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Favorite Cocktails"
                        style={styles.button}
                        onPress={() => navigation.navigate("Favorites")}
                        color="orange"
                    />
                    <View style={styles.buttonSpacer}></View>
                    <Button
                        title="Search New Cocktails"
                        titleStyle={styles.button}
                        onPress={() => navigation.navigate("Search")}
                        color="orange"
                    />
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    text: {
        fontSize: 24,
        color: "white",
        marginBottom: 5,
        fontFamily: "Poppins-Bold",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    buttonSpacer: {
        marginHorizontal: 5,
    },
});
