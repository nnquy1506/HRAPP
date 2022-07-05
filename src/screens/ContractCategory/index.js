import React from "react";
import { Box, HStack, Center, Text, VStack } from "native-base";
import { SafeAreaView, ScrollView } from "react-native";

import BtnGroup from "../../components/ButtonConfig/ButtonGroup";

import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { ContractCategoryList } from "../../constants/MenuList";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import { navigate } from "../../ultis/navigationHelpers";

const ContractCategoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack bgColor="white" m="3" borderRadius="8">
          {/* {ContractCategoryList.map((screen, i) => (
            <TouchableOpacity key={i} onPress={() => navigate(screen.screen)}>
              <HStack pl={3} justifyContent="space-between" alignItems="center">
                <Ionicons name={screen.icon} color={screen.color} size={20} />
                <Box
                  ml={3}
                  flex={1}
                  borderBottomWidth={screen.id === 2 ? undefined : 1}
                  borderColor={"#e5e7eb"}
                >
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    my={2}
                    py="2"
                  >
                    <Text fontSize={"md"}>{screen.nameList}</Text>
                    <Box mr={2}>
                      <Ionicons name="chevron-forward-outline" size={20} />
                    </Box>
                  </HStack>
                </Box>
              </HStack>
            </TouchableOpacity>
          ))} */}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContractCategoryScreen;
