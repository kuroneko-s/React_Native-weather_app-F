import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Thunderstorm: {
    iconName: "cloud-lightning",
    gradient: ["#232526", "#414345"],
  },
  Drizzle: {
    iconName: "cloud-drizzle",
    gradient: ["#7474BF", "#348AC7"],
  },
  Rain: {
    iconName: "cloud-rain",
    gradient: ["#4b6cb7", "#182848"],
  },
  Snow: {
    iconName: "cloud-snow",
    gradient: ["#ECE9E6", "#FFFFFF"],
  },
  Atmosphere: {
    iconName: "chrome",
    gradient: ["#50C9C3", "#96DEDA"],
  },
  Clear: {
    iconName: "sun",
    gradient: ["#c21500", "#ffc500"],
    title: "Sunny",
    subTitle: "good wheatherdsadsadsa",
  },
  Clouds: {
    iconName: "cloud",
    gradient: ["#274046", "#E6DADA"],
  },
  Haze: {
    iconName: "align-justify",
    gradient: ["#616161", "#9bc5c3"],
  },
};

export default Weather = ({ temp, condition }) => {
  condition = weatherOptions.hasOwnProperty(condition) ? condition : "Clear";
  return (
    // <View style={styles.container}>
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <Feather
          name={weatherOptions[condition].iconName}
          size={84}
          color="white"
        />

        <Text style={styles.temp}>
          {temp}°{condition}
        </Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subTitle}>
          {weatherOptions[condition].subTitle}
        </Text>
      </View>
    </LinearGradient>
    // </View>
  );
};

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 32,
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "300",
    marginBottom: 8,
  },
  subTitle: {
    fontWeight: "600",
    color: "white",
    fontSize: 17,
  },
  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 40,
    flex: 1,
  },
});
