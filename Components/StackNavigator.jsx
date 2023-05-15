import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Views/HomeScreen";
import FavouriteCocktails from "../Views/FavouriteCocktails";
import SearchCocktails from "../Views/SearchCocktails";
import CocktailDetailsScreen from "../Views/CocktailDetailsScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
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
            />
            <Stack.Screen
                name="Favorites"
                component={FavouriteCocktails}
                options={{
                    title: "Favorite Cocktails",
                    headerStyle: {
                        backgroundColor: "black",
                    },
                    headerTitleStyle: {
                        color: "white",
                    },
                }}
            />
            <Stack.Screen
                name="Search"
                component={SearchCocktails}
                options={{
                    title: "Cocktail Search",
                    headerStyle: {
                        backgroundColor: "black",
                    },
                    headerTitleStyle: {
                        color: "white",
                    },
                }}
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
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
