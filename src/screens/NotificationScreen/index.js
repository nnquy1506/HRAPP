import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text } from "native-base";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

const NotificationScreen = ({ navigation }) => {
  const initData = useSelector((state) => state.homePage.initData);

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

export default NotificationScreen;
