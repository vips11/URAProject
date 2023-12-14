import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RGB from "./src/RGB";
import { useState } from "react";
import { Button, Divider, RadioButton } from "react-native-paper";
import HSL from "./src/HSL";
import GenerateHarmony from "./src/GenerateHarmony";

export default function App() {
  const colourWheelOptions = ["random", "analogus", "complementary", "triadic"];
  const [random1, setRandom1] = useState(Math.random());
  const [random2, setRandom2] = useState(Math.random());
  const [random3, setRandom3] = useState(Math.random());
  const [checked, setChecked] = useState(colourWheelOptions[0]);
  const onPress = () => {
    setRandom1(Math.random());
    setRandom2(Math.random());
    setRandom3(Math.random());
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.colorContainer}>
          <RGB random1={random1} random2={random2} random3={random3} />
          <HSL random1={random1} random2={random2} random3={random3} />
        </View>
        <Button
          onPress={onPress}
          mode="outlined"
          style={styles.button}
          labelStyle={styles.label}
        >
          Change colour
        </Button>
        <Divider
          style={{
            borderColor: "grey",
            borderWidth: 0.5,
            width: "100%",
            marginVertical: 20,
          }}
        />
      </View>
      <Text>Choose a colour scheme to generate a colour palette:</Text>
      {colourWheelOptions.map((option, key) => (
        <RadioButton.Group
          onValueChange={(value) => setChecked(value)}
          value={checked}
          key={`radio-button-${key}`}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value={option} />
            <Text>{option}</Text>
          </View>
        </RadioButton.Group>
      ))}
      {checked === colourWheelOptions[0] ? (
        <GenerateHarmony
          colorCount={20}
          offsetAngle1={15}
          offsetAngle2={30}
          rangeAngle0={15}
          rangeAngle1={15}
          rangeAngle2={15}
          saturation={1}
          saturationRange={0.2}
          luminance={0.45}
          luminanceRange={0.5}
          buttonLabel="Choose random harmony"
        />
      ) : null}
      {checked === colourWheelOptions[1] ? (
        <GenerateHarmony
          colorCount={20}
          offsetAngle1={15}
          offsetAngle2={30}
          rangeAngle0={15}
          rangeAngle1={0}
          rangeAngle2={0}
          saturation={1}
          saturationRange={0.2}
          luminance={0.45}
          luminanceRange={0.5}
          buttonLabel="Choose analogus harmony"
        />
      ) : null}
      {checked === colourWheelOptions[2] ? (
        <GenerateHarmony
          colorCount={20}
          offsetAngle1={180}
          offsetAngle2={30}
          rangeAngle0={15}
          rangeAngle1={0}
          rangeAngle2={0}
          saturation={1}
          saturationRange={0.2}
          luminance={0.45}
          luminanceRange={0.5}
          buttonLabel="Choose complementary harmony"
        />
      ) : null}
      {checked === colourWheelOptions[3] ? (
        <GenerateHarmony
          colorCount={20}
          offsetAngle1={120}
          offsetAngle2={240}
          rangeAngle0={15}
          rangeAngle1={15}
          rangeAngle2={15}
          saturation={1}
          saturationRange={0.2}
          luminance={0.45}
          luminanceRange={0.5}
          buttonLabel="Choose triad harmony"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
    width: "100%",
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  label: {
    color: "black",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // width: "100%",
    marginRight: 20,
  },
  text: {
    flexWrap: "wrap",
    marginTop: 20,
    marginHorizontal: 20,
  },
});
