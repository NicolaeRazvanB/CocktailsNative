import React, { useRef, useState, useEffect } from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomSplashScreen from "./Components/CustomSplashScreen";
import StackNavigator from "./Components/StackNavigator";
import TabNavigator from "./Components/TabNavigator";
import CocktailDetailsScreen from "./Views/CocktailDetailsScreen";
import FavouriteCocktailDetailsScreen from "./Views/FavouriteCocktailsDetailsScreen";

import * as SQLite from "expo-sqlite";
import * as Font from "expo-font";

const customFonts = {
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
};

export default function App() {
    const [splashLoaded, setSplashLoaded] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const fadeInAnim = useRef(new Animated.Value(0)).current;
    const Stack = createStackNavigator();

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
            <Stack.Navigator initialRouteName="Tab">
                <Stack.Screen
                    name="Tab"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CocktailDetailsScreen"
                    component={CocktailDetailsScreen}
                    options={({ route }) => ({
                        title: route.params.cocktail.strDrink,
                    })}
                />
                <Stack.Screen
                    name="FavouriteCocktailDetailsScreen"
                    component={FavouriteCocktailDetailsScreen}
                    options={({ route }) => ({
                        title: route.params.cocktail.name,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
