import React from "react";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";

import { TouchableOpacity } from "react-native";
import {
  HStack,
  VStack,
  Heading,
  Text,
  Icon,
  Spacer,
  Box,
  Divider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const AddListSection = (props) => {
  const {
    listTitle,
    icon,
    addBtnLabel,
    labelIcon,
    children,
    onPress,
    showAddBtn,
    isRenderChildAtBottom,
    _listTitle,
    _listTitleContainer,
    ...restVStackProps
  } = props;
  return (
    <VStack bg="shades.0" {...restVStackProps}>
      {listTitle && (
        <HStack
          mt="3"
          justifyContent="space-between"
          alignItems="center"
          {..._listTitleContainer}
        >
          <Heading fontSize="16" {..._listTitle}>
            {listTitle}
          </Heading>
          {labelIcon ? labelIcon : <Spacer />}
        </HStack>
      )}
      {!isRenderChildAtBottom && children}
      {showAddBtn && (
        <TouchableOpacity
          onPress={() => {
            onPress && onPress();
          }}
        >
          <HStack
            space="3"
            bg="white"
            py="3"
            borderRadius="8"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack alignItems="center">
              {icon}
              <Text
                textTransform="capitalize"
                fontSize="16"
                bold
                ml="3"
                color="primary.700"
              >
                {addBtnLabel}
              </Text>
            </HStack>
            <Icon
              as={MaterialIcons}
              name="chevron-right"
              color="primary.700"
              size="md"
            />
          </HStack>
        </TouchableOpacity>
      )}
      {isRenderChildAtBottom && (
        <>
          <Divider />

          <Box paddingY={scale(8)}>{children}</Box>
        </>
      )}
    </VStack>
  );
};

const styles = ScaledSheet.create({
  addBtnLabel: {
    marginLeft: "18@s",
    fontSize: "16@s",
    fontWeight: "600",
    lineHeight: "32@s",
  },
});

AddListSection.defaultProps = {
  showAddBtn: true,
};

export default AddListSection;
