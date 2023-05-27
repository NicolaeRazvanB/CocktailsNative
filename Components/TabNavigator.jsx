import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "./Icon";
import { colors, sizes } from "../constants/theme";
import { StyleSheet, Animated } from "react-native";
import HomeScreen from "../Views/HomeScreen";
import SearchCocktails from "../Views/SearchCocktails";
import FavoriteCocktails from "../Views/FavouriteCocktails";

const tabs = [
    {
        name: "CocktailsApp",
        screen: HomeScreen,
    },
    {
        name: "Discover",
        screen: SearchCocktails,
    },
    {
        name: "Favorites",
        screen: FavoriteCocktails,
    },
];

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const offsetAnimation = React.useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: true,
                    tabBarShowLabel: false,
                    headerTitleAlign: "center",
                }}
            >
                {tabs.map(({ name, screen }, index) => {
                    return (
                        <Tab.Screen
                            key={name}
                            name={name}
                            component={screen}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <Icon
                                            icon={name}
                                            size={40}
                                            style={{
                                                tintColor: focused
                                                    ? colors.primary
                                                    : colors.gray,
                                            }}
                                        />
                                    );
                                },
                            }}
                            listeners={{
                                focus: () => {
                                    Animated.spring(offsetAnimation, {
                                        toValue:
                                            index * (sizes.width / tabs.length),
                                        useNativeDriver: true,
                                    }).start();
                                },
                            }}
                        />
                    );
                })}
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    indicator: {
        position: "absolute",
        width: 10,
        height: 2,
        left: sizes.width / tabs.length / 2 - 10,
        bottom: 30,
        backgroundColor: colors.primary,
        zIndex: 100,
    },
});

export default TabNavigator;
