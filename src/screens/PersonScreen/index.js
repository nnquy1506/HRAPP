import React, { useContext } from "react";
import { View, Text, Avatar, HStack, VStack, Box } from "native-base";
import { SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { COLORS } from "../../constants/Theme";
import { TouchableOpacity } from "react-native";
import SCREEN_NAME from "../../constants/ScreenName";
import { SignOut } from "../../redux/Authentication/authentication.action";
import { setRoot } from "../../ultis/navigationHelpers";
import { imageAvatar } from "../../config";

const PersonScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const signOut = () => {
    dispatch(SignOut());
    setRoot(SCREEN_NAME.LOGIN_SCREEN);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack p="3" space={3}>
          <HStack
            bgColor="white"
            p={3}
            justifyContent="space-between"
            alignItems="center"
            borderRadius="8"
          >
            <VStack>
              <Text fontSize="lg" fontWeight="600" color={COLORS.primary}>
                {currentUser?.hoVaTen}
              </Text>
              <Text>
                {currentUser?.tenQuyen} - {currentUser?.soDienThoai}
              </Text>
            </VStack>
            <Box>
              <Avatar
                size="lg"
                bg="cyan.500"
                source={{
                  uri: `${imageAvatar + currentUser?.Avatar}`,
                }}
              >
                {currentUser?.hoVaTen[0].toUpperCase()}
              </Avatar>
            </Box>
          </HStack>
          <VStack bgColor="white" borderRadius="8">
            <TouchableOpacity
              onPress={() =>
                navigation.push(SCREEN_NAME.CHANGE_PASSWORD_SCREEN)
              }
            >
              <HStack
                borderBottomWidth={1}
                borderColor={"#e5e7eb"}
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <Box flex={1}>
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text fontSize={"md"}>Đổi mật khẩu</Text>
                    <Box>
                      <Ionicons name="chevron-forward-outline" size={20} />
                    </Box>
                  </HStack>
                </Box>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signOut()}>
              <HStack
                borderBottomWidth={1}
                borderColor={"#e5e7eb"}
                alignItems="center"
                p={3}
              >
                <Box flex={1}>
                  <Text bold fontSize={"md"} color="error.500">
                    Đăng xuất
                  </Text>
                </Box>
              </HStack>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonScreen;
