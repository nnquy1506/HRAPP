import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text } from "native-base";
import Header from "../../components/Header";

const DevScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Header navigation={navigation} title={"Thông báo"} />
        <Text mt={3} textAlign="center">
          Tính năng đang phát triển
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DevScreen;
