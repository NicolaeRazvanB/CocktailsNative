import React from "react";
import { View, Animated } from "react-native";
import LottieView from "lottie-react-native";

const CustomSplashScreen = ({ fadeInAnim, setSplashLoaded }) => (
    <View
        style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FEF5F5",
        }}
    >
        <Animated.Text
            style={{
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 50,
                opacity: fadeInAnim,
            }}
        >
            Welcome to the World of Cocktails!
        </Animated.Text>
        <LottieView
            style={{ width: 300, height: 300 }}
            source={require("../assets/splashScreen.json")}
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

export default CustomSplashScreen;
