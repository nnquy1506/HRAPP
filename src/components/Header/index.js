import React from "react";
import { ArrowBackIcon, Text, HStack, Box } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants/Theme";
import { TouchableOpacity } from "react-native";
const Header = ({
  navigation,
  title,
  isAdd,
  isBack,
  screenCreate,
  onGetList,
}) => {
  return (
    <HStack
      shadow="1"
      bgColor="white"
      p={5}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        {isBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBackIcon size="6" />
          </TouchableOpacity>
        )}
      </Box>

      <Text bold fontSize="lg">
        {title}
      </Text>
      <Box>
        {isAdd && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(screenCreate, { getList: onGetList || "" })
            }
          >
            <AntDesign name="pluscircleo" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </Box>
    </HStack>
  );
};
export default Header;
