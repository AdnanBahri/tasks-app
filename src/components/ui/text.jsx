import { StyleSheet, Text as RNText } from "react-native";
import React from "react";

const Text = ({
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  small,
  color,
  weight,
  lines,
  style,
  ...props
}) => {
  const textStyle = StyleSheet.flatten([
    {
      fontSize: 16,
    },
    h1 !== undefined && { fontSize: 36, fontWeight: "800" },
    h2 !== undefined && { fontSize: 28, fontWeight: "700" },
    h3 !== undefined && { fontSize: 24, fontWeight: "600" },
    h4 !== undefined && { fontSize: 22, fontWeight: "500" },
    p !== undefined && { fontSize: 18, fontWeight: "400" },
    small !== undefined && { fontSize: 14, fontWeight: "400" },
    color !== undefined && { color: color },
    weight !== undefined && { fontWeight: weight },
  ]);
  return (
    <RNText style={[textStyle, style]} {...props} numberOfLines={lines}>
      {children}
    </RNText>
  );
};

export default Text;
