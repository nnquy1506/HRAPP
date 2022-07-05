import React, { memo } from "react";
import { scale, ScaledSheet } from "react-native-size-matters";

import { Box, HStack, Icon, IconButton, Pressable } from "native-base";
import { Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import useBoolean from "../../hooks/useBoolean";
import { navigate } from "../../ultis/navigationHelpers";
import InputSearch from "../InputSearch";

const EmployeeTabBar = (props) => {
  const { state, descriptors, navigation } = props;
  const {
    value: isSearchMode,
    setFalse: closeSearchMode,
    setTrue: openSearchMode,
  } = useBoolean();
  if (isSearchMode) {
    return (
      <InputSearch
        styles={styles}
        closeSearchMode={closeSearchMode}
        state={state}
      />
    );
  }
  return (
    <HStack
      px="3"
      borderBottomWidth="1"
      borderStyle="solid"
      borderBottomColor="#EAEAEA"
      position="relative"
      bg="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={`tabBar-${label}-${index}`}
            >
              <Box
                style={[styles.tabBtn, isFocused && styles.activeTab]}
                borderBottomColor={isFocused ? "primary.700" : undefined}
              >
                <Animated.Text
                  style={styles.tabLabel}
                  color={isFocused ? "primary.700" : "grey.400"}
                >
                  {label}
                </Animated.Text>
              </Box>
            </Pressable>
          );
        })}
      </HStack>
      <HStack>
        <IconButton
          icon={
            <Icon
              as={Ionicons}
              name="ios-search"
              color="primary.700"
              size="7"
            />
          }
          onPress={() => {
            openSearchMode();
          }}
          _pressed={{
            opacity: 0.5,
            backgroundColor: "white",
          }}
        />
        {/* <IconButton
          icon={
            <Icon as={Feather} size="7" name="filter" color="primary.700" />
          }
          //   onPress={() => {
          //     navigate(INVOICE_FILTER_SCREEN);
          //   }}
          _pressed={{
            opacity: 0.5,
            backgroundColor: "white",
          }}
        /> */}
      </HStack>
    </HStack>
  );
};
const styles = ScaledSheet.create({
  tabLabel: {
    fontSize: "14@s",
    lineHeight: "20@s",
    fontWeight: "600",
  },
  tabBtn: {
    paddingVertical: "12@ms",
    paddingRight: "15@s",
  },
  activeTab: {
    borderBottomWidth: "5@ms",
    borderStyle: "solid",
  },
  cancelSearchModeBtn: {
    position: "absolute",
    right: 0,
    top: "5@ms",
  },
  searchMode: {
    paddingVertical: "10@ms",
  },
});
export default memo(EmployeeTabBar);
