import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RGB from "./src/RGB";
import { useState } from "react";
import { Button } from "react-native-paper";
import HSL from "./src/HSL";
import GenerateHarmony from "./src/GenerateHarmony";

export default function App() {
  const [random1, setRandom1] = useState(Math.random());
  const [random2, setRandom2] = useState(Math.random());
  const [random3, setRandom3] = useState(Math.random());
  const onPress = () => {
    setRandom1(Math.random());
    setRandom2(Math.random());
    setRandom3(Math.random());
  };
  return (
    <View>
      {/* <Text style={styles.text}>
        The following are two ways to display colors. The first uses the RGB
        technique that uses the primary colors of the color wheel and gives it a
        value between 0-255.
      </Text>
      <Text style={styles.text}>
        The second is HSL which uses Hue, saturation and luminence.
      </Text>
      <Text style={styles.text}>
        We use the same random number to display both the different display
        colour types. The text in both the types uses the associated
        complimentary color to the background.
      </Text>
      <Text style={styles.text}>
        The button is used to generate another set of random numbers to create a
        new colour scheme.
      </Text> */}

      <View style={styles.container}>
        <View style={styles.colorContainer}>
          <RGB random1={random1} random2={random2} random3={random3} />
          {/* <HSL random1={random1} random2={random2} random3={random3} /> */}
        </View>
        <StatusBar style="auto" />
        <Button
          onPress={onPress}
          mode="outlined"
          style={styles.button}
          labelStyle={styles.label}
        >
          Change colour
        </Button>
      </View>
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
        buttonLabel="Choose analogus harmony"
      />
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
        buttonLabel="Choose complementary harmony"
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "space-evenly",
    width: "100%",
  },
  text: {
    flexWrap: "wrap",
    marginTop: 20,
    marginHorizontal: 20,
  },
});
