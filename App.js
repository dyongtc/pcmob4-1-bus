import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139"
  
  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bus arrival time: </Text>
      <Text style={styles.arrivalTime}>
        {" "}
        {loading ? <ActivityIndicator color={"blue"} /> : "Loaded"}
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
  text: {
    fontSize: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#bbf",
    padding: 20,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
