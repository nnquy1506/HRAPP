import React, { forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import {
  VStack,
  HStack,
  Divider,
  Icon,
  Text,
  View,
  Switch,
  Checkbox,
  Box,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { get } from "lodash";

const Title = ({ label, ...restProps }) => {
  if (!label) {
    return null;
  }

  return (
    <Text color="grey.500" ml="3" mt="3" {...restProps}>
      {label}
    </Text>
  );
};

const Button = ({ onPress, label, _text, leftLabel, _view, _leftLabel }) => (
  <TouchableOpacity onPress={onPress}>
    <HStack
      space="3"
      bg="white"
      p="3"
      borderRadius="8"
      justifyContent="space-between"
      alignItems="center"
      {..._view}
    >
      <Text textTransform="capitalize" {..._text}>
        {label}
      </Text>
      <HStack alignItems="center">
        {leftLabel && <Text {..._leftLabel}>{leftLabel}</Text>}
        <Icon as={MaterialIcons} name="chevron-right" color="primary.700" />
      </HStack>
    </HStack>
  </TouchableOpacity>
);

const ButtonSwitch = forwardRef(
  ({ onPress, label, _button, _text, _view, _switch, disabled }, ref) => (
    <TouchableOpacity onPress={onPress} {..._button}>
      <Box position="relative">
        <HStack
          space="3"
          bg="white"
          p="3"
          borderRadius="8"
          justifyContent="space-between"
          alignItems="center"
          ref={ref}
          {..._view}
        >
          <Text textTransform="capitalize" {..._text}>
            {label}
          </Text>
          <Switch size="md" {..._switch} />
        </HStack>
        {disabled && (
          <Box
            width="100%"
            height="100%"
            position="absolute"
            top="0"
            right="0"
          ></Box>
        )}
      </Box>
    </TouchableOpacity>
  )
);

const ButtonCheckBox = ({
  onPress,
  label,
  _button,
  _text,
  _view,
  _checkbox,
}) => (
  <TouchableOpacity onPress={onPress} {..._button}>
    <HStack
      space="3"
      bg="white"
      p="3"
      borderRadius="8"
      justifyContent="space-between"
      alignItems="center"
      {..._view}
    >
      <Text textTransform="capitalize" {..._text}>
        {label}
      </Text>
      <Checkbox {..._checkbox} colorScheme="primary" />
    </HStack>
  </TouchableOpacity>
);

const Group = ({ children, title, _title, ...VStackProps }) => {
  if (children.length > 0) {
    return (
      <>
        <Title label={title} {..._title} />
        <VStack bg="white" m="3" borderRadius="8" {...VStackProps}>
          {children.map((elm, index) => {
            if (get(elm, "props.hideBottomBorder")) {
              return null;
            }
            return (
              <React.Fragment key={index.toString()}>
                {elm}
                {index < children.length - 1 &&
                  !get(elm, "props.hideBorderBottom") && (
                    <View mx="0">
                      <Divider />
                    </View>
                  )}
              </React.Fragment>
            );
          })}
        </VStack>
      </>
    );
  }

  return (
    <>
      <Title label={title} {..._title} />
      <VStack bg="white" m="3" borderRadius="8" {...VStackProps}>
        {children}
      </VStack>
    </>
  );
};

const ButtonIcon = ({
  onPress,
  label,
  iconAs,
  nameIcon1,
  labelButton,
  leftLabel,
  _labelButton,
  _leftLabel,
}) => (
  <VStack space="5" w="full" bgColor="white" p="3" py="5">
    {label && (
      <Text color="grey.500" fontSize="md">
        {label}
      </Text>
    )}
    <TouchableOpacity onPress={onPress}>
      <HStack justifyContent="space-between">
        <HStack alignItems="center">
          {nameIcon1 && (
            <Icon
              size="sm"
              as={iconAs}
              name={nameIcon1}
              color="primary.700"
              mr="4"
            />
          )}
          <Text fontSize="md" color="primary.700" bold {..._labelButton}>
            {labelButton}
          </Text>
        </HStack>
        <HStack alignItems="center">
          {leftLabel && <Text {..._leftLabel}>{leftLabel}</Text>}
          <Icon
            size="sm"
            as={iconAs}
            name="chevron-forward-outline"
            color="primary.700"
          />
        </HStack>
      </HStack>
    </TouchableOpacity>
  </VStack>
);

export default {
  Group,
  Button,
  Title,
  Switch: ButtonSwitch,
  ButtonCheckBox,
  ButtonIcon,
};
