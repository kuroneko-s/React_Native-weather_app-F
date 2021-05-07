import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "f4315c6072147efa12747320bc02a892";

export default function App() {
  const [loading, setLoading] = useState(null);
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    console.log("1" + loading + "");
    setLoading(true);
    (async () => {
      console.log("2" + loading + "");
      try {
        await Location.requestForegroundPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        getWeather(latitude, longitude);
        console.log(latitude, longitude);
        console.log("3" + loading + "");

        console.log("temp - " + temp);
      } catch (e) {
        Alert.alert(" fail ", " 시발 ");
      }
    })();
  }, [temp]);

  const getWeather = async (lat, log) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
    );
    setLoading(false);
    setTemp(data.main.temp);
  };

  return { loading } ? <Loading /> : <Weather temp={temp} />;
}
