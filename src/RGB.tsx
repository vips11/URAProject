import { StyleSheet, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

type RGBProps = {
  random1: number;
  random2: number;
  random3: number;
};

const RGB = ({ random1, random2, random3 }: RGBProps) => {
  const red = random1 * 255;
  const green = random2 * 255;
  const blue = random2 * 255;
  const color = `rgb(${red}, ${green}, ${blue})`;
  const textColor = `rgb(${255 - red}, ${255 - green}, ${255 - blue})`;

  return (
    <View>
      <Card
        mode="contained"
        style={[styles.cardContainer, { backgroundColor: color }]}
      >
        <Card.Title
          title="RGB"
          style={{ alignSelf: "center", justifyContent: "center" }}
          titleStyle={{ color: textColor, marginTop: 10, fontSize: 20 }}
        ></Card.Title>
      </Card>
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
