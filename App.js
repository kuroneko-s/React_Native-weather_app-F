import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "f4315c6072147efa12747320bc02a892";

export default class App extends React.Component {
  state = {
    isLoading: false,
    temp: null,
  };

  getWeather = async (lat, log) => {
    console.log("lat - " + lat + "log - " + log);
    const uri = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(uri);
    console.log("uri - " + uri);
    console.log(data.main.temp);
    this.setState({ temp: data.main.temp, isLoading: false });
  };

  getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("error");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 6 });

      this.getWeather(latitude, longitude);
    } catch (e) {
      console.log(e);
      Alert.alert(" fail ", " 시발 ");
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getLocation();
  }

  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
}
