import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-web";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Original data: ");
        console.log(responseData);
        const myBus = responseData.services.filter(
          (item) => item.no ==="155"
        )[0];
        console.log("My bus: ");
        console.log(myBus.next.time);
        setArrival(myBus.next.time);
        console.log(myBus);
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 5000);
    return () => clearInterval(interval);
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bus arrival time: </Text>
      <Text style={styles.arrivalTime}>
        {" "}
        {loading ? <ActivityIndicator color="blue" size="large"/> : arrival}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText}> Refresh </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 100,
  },
  title: {
    fontSize: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
