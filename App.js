import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen({ navigation }) {
  const [BusStopNo, setBusStopNo] = useState("");
  const [BusNo, setBusNo] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.title}> Bus Stop Number </Text>
      <TextInput
        style={styles.subtitle}
        placeholder="Enter Bus Stop Number"
        onChangeText={newBusStopNo => setBusStopNo(newBusStopNo)}
        defaultValue={BusStopNo}
      ></TextInput>
      <Text style={styles.title}> Bus Number </Text>
      <TextInput
        style={styles.subtitle}
        placeholder="Enter Bus Number"
        onChangeText={newBusNo => setBusNo(newBusNo)}
        defaultValue={BusNo}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DetailsScreen", //{ 
          // BusStopNo: newBusStopNo,
          // BusNo: newBusNo 
          // }
          )}
      >
        <Text> Fetch arrival time</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function DetailsScreen({}) {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  // const { BusStopNo } = route.params;
  // const { BusNo } = route.params;
  const [busNo, setBusNo] = useState("");
  const [busStopNo, setBusStopNo] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        // console.log("Original data: ");
        // console.log(responseData);
        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        // console.log("My bus: ");
        // console.log(myBus.next.time);
        setBusNo(myBus.no);
        // setBusStopNo(myBus.next.stopNo);
        const duration_ms = myBus.next.duration_ms;
        console.log(duration_ms);
        const duration_mins = Math.floor(duration_ms / 60 / 1000);
        setArrival(`${duration_mins} mins`);

        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bus Stop No: </Text>
      <Text style={styles.subtitle}>
        {" "}
        {loading ? <ActivityIndicator color="blue" size="large" /> : "83139"}
      </Text>
      <Text style={styles.title}> Bus No: </Text>
      <Text style={styles.subtitle}>
        {" "}
        {loading ? <ActivityIndicator color="blue" size="large" /> : busNo}
      </Text>

      <Text style={styles.title}> Bus arrival time: </Text>
      <Text style={styles.subtitle}>
        {" "}
        {loading ? <ActivityIndicator color="blue" size="large" /> : arrival}
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
    fontSize: 40,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
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
