import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, HStack, Center, Text, useTheme, VStack } from "native-base";

import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { SalaryCategoryList } from "../../constants/MenuList";
import Header from "../../components/Header";

const SalaryCategoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack bgColor="white" m="3" borderRadius="8">
          {SalaryCategoryList.map((screen, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(screen.screen)}
            >
              <HStack pl={2} justifyContent="space-between" alignItems="center">
                <Ionicons name={screen.icon} color={screen.color} size={20} />
                <Box
                  ml={3}
                  flex={1}
                  borderBottomWidth={screen.id === 5 ? undefined : 1}
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
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalaryCategoryScreen;
