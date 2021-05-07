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
  };

  getWeather = async (lat, log) => {
    console.log("lat - " + lat + "log - " + log);
    const uri = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(uri);
    console.log("uri - " + uri);
    console.log(data);
    this.setState({ temp: data.main.temp, isLoading: false });
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      this.getWeather(latitude, longitude);

      console.log(this.state.temp);
    } catch (e) {
      Alert.alert(" fail ", " 시발 ");
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : <Weather />;
  }
}
