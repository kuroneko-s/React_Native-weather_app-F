import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import axios from "axios";
import Weather from "./Weather";
import { API_KEY } from "./config";

export default class App extends React.Component {
  state = {
    isLoading: false,
    temp: null,
    condition: "Clear",
  };
  // condition 기본값 이상하면 경고뱉음

  getWeather = async (lat, log) => {
    const uri = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(uri);
    this.setState({
      temp,
      isLoading: false,
      condition: weather[0].main,
    });
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
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
