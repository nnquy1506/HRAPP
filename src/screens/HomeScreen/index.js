import React, { useContext } from "react";
import { View, Text, Button } from "native-base";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import SCREEN_NAME from "../../constants/ScreenName";
import { AuthContext } from "../../components/AuthContext/context";
import Header from "../../components/Header";

const HomeScreen = ({ navigation }) => {
  const initData = useSelector((state) => state.homePage.initData);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Header navigation={navigation} title={"Trang chủ"} />
        <Text mt={3} textAlign="center">
          Tính năng đang phát triển
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
