import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

type HSLProps = {
  random1: number;
  random2: number;
  random3: number;
};

const HSL = ({ random1, random2, random3 }: HSLProps) => {
  const hue = random1 * 360;
  const sat = random2 * 100;
  const lum = random2 * 100;
  const color = `hsl(${hue}, ${sat}%, ${lum}%)`;
  const textColor = `hsl(${360 - hue}, ${100 - sat}%, ${100 - lum}%)`;

  const colorDisplay = `hsl(${Math.round(hue)}, ${Math.round(
    sat
  )}%, ${Math.round(lum)}%)`;
  const textColorDisplay = `hsl(${Math.round(360 - hue)}, ${Math.round(
    100 - sat
  )}%, ${Math.round(100 - lum)}%)`;
  return (
    <View>
      <Card
        mode="contained"
        style={{
          backgroundColor: color,
          width: 150,
          justifyContent: "center",
        }}
      >
        <Card.Title
          title="HSL"
          style={{ alignSelf: "center", justifyContent: "center" }}
          titleStyle={{ color: textColor, marginTop: 10, fontSize: 20 }}
        ></Card.Title>
      </Card>
      <Text style={{ flexWrap: "wrap", width: 150, marginVertical: 10 }}>
        Background Color: {colorDisplay}
      </Text>
      <Text style={{ flexWrap: "wrap", width: 125 }}>
        Text color: {textColorDisplay}
      </Text>
    </View>
  );
};

export default HSL;

const styles = StyleSheet.create({});
