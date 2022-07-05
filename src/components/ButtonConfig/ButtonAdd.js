import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ButtonAdd = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name="pluscircleo" size={24} color="primary.700" />
    </TouchableOpacity>
  );
};

export default ButtonAdd;
