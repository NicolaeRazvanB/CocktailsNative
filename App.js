import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground } from 'react-native';
import SearchCocktailsScreen from './Views/SearchCocktails';
import ViewFavoriteCocktailsScreen from './Views/FavouriteCocktails';
import CocktailDetailsScreen from './Views/CocktailDetailsScreen';
import LottieView from 'lottie-react-native';

import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();

export default function App() {
  const [splashLoaded, setSplashLoaded] = useState(false);

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  const customSplashScreen = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF5F5',
      }}
    >
      <Animated.Text
        style={{
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 50,
          opacity: fadeInAnim,
        }}
      >
        Welcome to the World of Cocktails!
      </Animated.Text>
      <LottieView
        style={{ width: 300, height: 300 }}
        source={require('./assets/splashScreen.json')}
        autoPlay
        loop={false}
        speed={0.3}
        onAnimationFinish={() => setSplashLoaded(true)}
      />
      <Animated.Text
        style={{
          fontSize: 15,
          marginTop: 5,
          opacity: fadeInAnim,
        }}
      >
        Filling up the glasses...
      </Animated.Text>
    </View>
  );
  // const [db, setDb] = useState(null);

  useEffect(() => {
    const db = SQLite.openDatabase('savedCocktails.db');

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
        'CREATE TABLE IF NOT EXISTS favorites (idDrink TEXT PRIMARY KEY, name TEXT, category TEXT, type TEXT, glass TEXT, instructions TEXT, imageUrl TEXT, ingredients TEXT, measures TEXT);',
        [],
        () => console.log('Favorites table created'),
        (err) => console.log('Error:', err)
      );
    });
    // setDb(dbFile);
  }, []);

  if (!splashLoaded) {
    return customSplashScreen();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
          // initialParams={{ db }}
        />
        <Stack.Screen
          name='Favorites'
          component={ViewFavoriteCocktailsScreen}
          options={{
            title: 'Favorite Cocktails',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
          // initialParams={{ db }}
        />
        <Stack.Screen
          name='Search'
          component={SearchCocktailsScreen}
          options={{
            title: 'Cocktail Search',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
          // initialParams={{ db }}
        />
        <Stack.Screen
          name='CocktailDetailsScreen'
          component={CocktailDetailsScreen}
          options={({ route }) => ({
            title: route.params.cocktail.strDrink,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              color: 'white',
            },
          })}
          // initialParams={{ db }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation, route }) {
  // const { db, setDb } = useState(null);
  // useEffect(() => {
  //     if (route.params && route.params.db) {
  //         setDb(route.params.db);
  //     }
  // }, [route.params]);

  return (
    <ImageBackground
      source={require('./assets/welcome.jpg')}
      resizeMode='cover'
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to Cocktail Empire</Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Favorite Cocktails'
            onPress={() => navigation.navigate('Favorites')}
            color='orange'
          />
          <View style={styles.buttonSpacer}></View>
          <Button
            title='Search New Cocktails'
            onPress={() => navigation.navigate('Search')}
            color='orange'
          />
        </View>
      </View>
      <StatusBar style='auto' />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonSpacer: {
    marginHorizontal: 5,
  },
});
