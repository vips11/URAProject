import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import Slider from "@react-native-community/slider";

type HSL = {
  hue: number;
  sat: number;
  lum: number;
};

type GenerateHarmonyProps = {
  colorCount: number;
  offsetAngle1: number;
  offsetAngle2: number;
  rangeAngle0: number;
  rangeAngle1: number;
  rangeAngle2: number;
  saturation: number;
  saturationRange: number;
  luminance: number;
  luminanceRange: number;
  buttonLabel: string;
};

const GenerateHarmony = ({
  colorCount,
  offsetAngle1,
  offsetAngle2,
  rangeAngle0,
  rangeAngle2,
  saturation,
  saturationRange,
  luminance,
  luminanceRange,
  buttonLabel,
}: GenerateHarmonyProps) => {
  const [colors, setColors] = useState<HSL[]>([]);
  const [rangeAngle1, setRangeAngle1] = useState(0);
  const referenceAngle = Math.random() * 360;

  const getColors = (chosenAngle: number) => {
    const newColors: HSL[] = [];
    for (var i = 0; i < colorCount; i++) {
      console.log(chosenAngle);
      let randomAngle =
        Math.random() * (rangeAngle0 + rangeAngle1 + rangeAngle2);

      if (randomAngle > rangeAngle0) {
        if (randomAngle < rangeAngle0 + rangeAngle1) {
          randomAngle += offsetAngle1;
        } else {
          randomAngle += offsetAngle2;
        }
      }

      const newSaturation =
        saturation + (Math.random() - 0.5) * saturationRange;
      const newLuminance = luminance + +(Math.random() - 0.5) * luminanceRange;

      newColors.push({
        hue: ((referenceAngle + randomAngle) / 360.0) % 1.0,
        sat: newSaturation,
        lum: newLuminance,
      });
    }
    setColors(newColors);
  };
  console.log(rangeAngle1);
  return (
    <View>
      <Button
        onPress={() => getColors(rangeAngle1)}
        mode="outlined"
        style={styles.button}
        labelStyle={styles.label}
      >
        {buttonLabel}
      </Button>
      <Text>Range angle 1 slider</Text>
      <Slider
        minimumValue={0}
        maximumValue={360}
        onValueChange={setRangeAngle1}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          paddingBottom: 50,
        }}
      >
        {colors &&
          colors.map((color, key) => (
            <View
              style={{
                backgroundColor: `hsl(${color.hue * 360}, ${
                  color.sat * 100
                }%, ${color.lum * 100}%)`,
                width: 50,
                height: 150,
                alignSelf: "center",
              }}
              key={key}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default GenerateHarmony;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    color: "black",
  },
});
