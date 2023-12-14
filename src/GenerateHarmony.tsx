import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
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

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const GenerateHarmony = ({
  // colorCount,
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
  const [hexValues, setHexValues] = useState<string[]>([]);
  const [rangeAngle1, setRangeAngle1] = useState(0);
  const [colorCount, setColorCount] = useState(5);
  const [backgroundHex, setBackgroundHex] = useState("");
  const [textHex, setTextHex] = useState("");
  const [referenceAngle, setReferenceAngle] = useState(
    Math.round(Math.random() * 360)
  );
  const [ratio, setRatio] = useState<number>();
  function hexToRelativeLuminance(hex: string): number {
    const rgb = hexToRgb(hex);
    const rsrgb = rgbToSRGB(rgb.r / 255);
    const gsrgb = rgbToSRGB(rgb.g / 255);
    const bsrgb = rgbToSRGB(rgb.b / 255);
    const rL = relativeLuminance(rsrgb);
    const gL = relativeLuminance(gsrgb);
    const bL = relativeLuminance(bsrgb);
    return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
  }
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Remove the hash if present
    hex = hex.replace(/^#/, "");
    // Parse the hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
  function rgbToSRGB(value: number): number {
    return value <= 0.04045
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  }
  function relativeLuminance(srgb: number): number {
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  }
  function calculateContrastRatio(
    hexColor1: string,
    hexColor2: string
  ): number {
    const luminance1 = hexToRelativeLuminance(hexColor1);
    const luminance2 = hexToRelativeLuminance(hexColor2);
    const contrastRatio = (luminance1 + 0.05) / (luminance2 + 0.05);
    return contrastRatio;
  }
  const calculateRatio = () => {
    setRatio(Math.round(calculateContrastRatio(textHex, backgroundHex)));
  };

  const getColors = (chosenAngle: number) => {
    const newColors: HSL[] = [];
    const newHexValues: string[] = [];
    const randomAngle = (): number => Math.random() * 360;

    let referenceAngle = randomAngle();

    for (let i = 0; i < colorCount; i++) {
      let angle = randomAngle() * (rangeAngle0 + rangeAngle1 + rangeAngle2);

      if (angle < rangeAngle0) {
        angle -= rangeAngle0 / 2;
      } else if (angle < rangeAngle0 + rangeAngle1) {
        angle += offsetAngle1 - rangeAngle1 / 2;
      } else {
        angle += offsetAngle2 - rangeAngle2 / 2;
      }

      // Ensure the angle is in the range [0, 360)
      angle = (angle + 360) % 360;

      const newSaturation =
        saturation + (Math.random() - 0.5) * saturationRange;
      const newLuminance = luminance + +(Math.random() - 0.5) * luminanceRange;

      const hslColor = {
        hue: (referenceAngle + angle) / 360,
        sat: newSaturation,
        lum: newLuminance,
      };
      newColors.push(hslColor);
      newHexValues.push(
        hslToHex(
          hslColor.hue * 100,
          (hslColor.sat * 100) % 100,
          hslColor.lum * 100
        )
      );
    }
    setColors(newColors);
    setHexValues(newHexValues);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Number"
          value={colorCount.toString()}
          onChange={(e) => setColorCount(parseInt(e.target.value))}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Reference angle"
          value={referenceAngle.toString()}
          onChange={(e) => setReferenceAngle(parseInt(e.target.value))}
        />
        <Button
          onPress={() => getColors(rangeAngle1)}
          mode="outlined"
          style={styles.button}
          labelStyle={styles.label}
        >
          {buttonLabel}
        </Button>
      </View>
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
                width: 100,
                height: 150,
                alignSelf: "center",
              }}
              key={key}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "flex-end",
                  alignContent: "flex-end",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {hexValues[key]}
              </Text>
            </View>
          ))}
      </ScrollView>
      {colors.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ width: 100 }}>
            Calculate contrast ratio by entering the hex
          </Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Background Hex"
            value={backgroundHex.toString()}
            onChange={(e) => setBackgroundHex(e.target.value)}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Text Hex"
            value={textHex.toString()}
            onChange={(e) => setTextHex(e.target.value)}
          />
          <Button
            onPress={() => calculateRatio()}
            mode="outlined"
            style={styles.button}
            labelStyle={styles.label}
          >
            Calculate
          </Button>
          <Text>{ratio}</Text>
        </View>
      )}
    </View>
  );
};

export default GenerateHarmony;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginRight: 20,
  },
  label: {
    color: "black",
  },
  textInput: {
    width: "20%",
    marginRight: 20,
  },
});
