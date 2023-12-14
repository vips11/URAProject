import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

type RGBProps = {
  random1: number;
  random2: number;
  random3: number;
};

const RGB = ({ random1, random2, random3 }: RGBProps) => {
  const red = random1 * 255;
  const green = random2 * 255;
  const blue = random3 * 255;
  const color = `rgb(${red}, ${green}, ${blue})`;
  const textColor = `rgb(${255 - red}, ${255 - green}, ${255 - blue})`;
  const colorDisplay = `rgb(${Math.round(red)}, ${Math.round(
    green
  )}, ${Math.round(blue)})`;

  const textColorDisplay = `rgb(${Math.round(255 - red)}, ${Math.round(
    255 - green
  )}, ${Math.round(255 - blue)})`;

  const relativeLuminance = (red: number, green: number, blue: number) => {
    const RsRGB = red / 255;
    const GsRGB = green / 255;
    const BsRGB = blue / 255;
    let R;
    let B;
    let G;
    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = Math.exp((RsRGB + 0.055) / 1.055);
    }

    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = Math.exp((GsRGB + 0.055) / 1.055);
    }

    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = Math.exp((R = BsRGB + 0.055) / 1.055);
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const calculateContrast = () => {
    const L1 = relativeLuminance(255 - red, 255 - green, 255 - blue) + 0.05;
    const L2 = relativeLuminance(red, green, blue) + 0.05;
    if (L1 > L2) return Math.round(L1 / L2);
    else return Math.round((L2 / L1) * 100) / 100;
  };
  return (
    <View>
      <Card
        mode="contained"
        style={[styles.cardContainer, { backgroundColor: color }]}
      >
        <Card.Title
          title="RGB"
          style={{ alignSelf: "center", justifyContent: "center" }}
          titleStyle={{ color: textColor, fontSize: 20, marginTop: 10 }}
        ></Card.Title>
      </Card>
      <Text style={{ flexWrap: "wrap", width: 150, marginVertical: 10 }}>
        Background Color: {colorDisplay}
      </Text>
      <Text style={{ flexWrap: "wrap", width: 125 }}>
        Text color: {textColorDisplay}
      </Text>
      <Text>Color contrast: {calculateContrast()}</Text>
    </View>
  );
};

export default RGB;

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.5,
  },
});
