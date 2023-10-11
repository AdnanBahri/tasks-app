import { StyleSheet, TouchableOpacity, View } from "react-native";

const ToggleSwitch = ({ swicth, open, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={swicth}
      style={[
        styles.outter,
        open
          ? {
              justifyContent: "flex-end",
              backgroundColor: "#0f172a",
            }
          : {
              justifyContent: "flex-start",
              backgroundColor: "gray",
            },
      ]}
      activeOpacity={1}
    >
      <View style={styles.inner} />
    </TouchableOpacity>
  );
};
export default ToggleSwitch;
const styles = StyleSheet.create({
  outter: {
    width: 60,
    height: 28,
    backgroundColor: "gray",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  inner: {
    width: 22,
    height: 22,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 8,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
});
