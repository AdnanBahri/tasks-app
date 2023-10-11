import { StyleSheet, TouchableOpacity } from "react-native";

const Button = ({
  children,
  color,
  radius,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  style,
  ...props
}) => {
  const buttonStyle = StyleSheet.flatten([
    color !== undefined && { backgroundColor: color },
    radius !== undefined && { borderRadius: radius },
    padding !== undefined && { padding: padding },
    paddingHorizontal !== undefined && { paddingHorizontal: paddingHorizontal },
    paddingVertical !== undefined && { paddingVertical: paddingVertical },
    paddingTop !== undefined && { paddingTop: paddingTop },
    paddingBottom !== undefined && { paddingBottom: paddingBottom },
    style,
  ]);
  return (
    <TouchableOpacity style={[buttonStyle, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
