import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageBackground } from "react-native";
import SearchCocktailsScreen from "./Views/SearchCocktails";
import ViewFavoriteCocktailsScreen from "./Views/FavouriteCocktails";

const Stack = createStackNavigator();

export default function App() {
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
            onPress={() => navigation.navigate("Favorites")}
            color="orange"
          />
          <View style={styles.buttonSpacer}></View>
          <Button
            title="Search New Cocktails"
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
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
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
