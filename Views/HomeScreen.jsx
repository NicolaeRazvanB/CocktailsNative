import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    ImageBackground,
    StatusBar,
} from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={require("../assets/welcome.jpg")}
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
