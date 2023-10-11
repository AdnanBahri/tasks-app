import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";

const SelectDropdown = ({ value, changeValue, className }) => {
  const { categories } = useSelector((state) => state.tasks);
  const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    let list = [];
    categories.map((category) =>
      list.push({
        label: category,
      })
    );
    setData([...list]);
  }, [categories]);

  return (
    <View style={styles.container} className={className}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="label"
        placeholder={!isFocus ? "Select item" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={({ label }) => {
          changeValue(label);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
