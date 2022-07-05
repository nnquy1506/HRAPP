import React from "react";
import {
  HStack,
  VStack,
  Text,
  Input,
  FormControl,
  Divider,
  Button,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";

const InputHStack = (props) => {
  const {
    formControl,
    label,
    input,
    errorMsg,
    showDivider,
    button,
    buttonLabel,
    phoneInput,
    _label,
    touchInput,
    file,
  } = props;
  return (
    <>
      <FormControl {...formControl}>
        <HStack
          flex="1"
          justifyContent="space-between"
          alignItems="center"
          my="2"
        >
          {label && (
            <FormControl.Label mb="0" flex="6">
              <Text
                color="gray.900"
                fontWeight="bold"
                {..._label}
                fontSize="16"
              >
                {label}
              </Text>
            </FormControl.Label>
          )}
          {input && (
            <VStack flex="7">
              <Input
                color="gray.900"
                borderBottomWidth="0"
                textAlign="right"
                variant="unstyled"
                fontSize="16"
                {...input}
              />
              {touchInput && errorMsg && (
                <FormControl.ErrorMessage
                  _stack={{
                    justifyContent: "flex-end",
                  }}
                >
                  {errorMsg}
                </FormControl.ErrorMessage>
              )}
            </VStack>
          )}
          {phoneInput && (
            <VStack flex="7">
              <PhoneInput
                countryPickerButtonStyle={{
                  width: 50,
                  marginRight: 0,
                }}
                textContainerStyle={{
                  backgroundColor: "#FFFFFF",
                }}
                codeTextStyle={{
                  fontSize: 12,
                  marginRight: 0,
                  marginLeft: 0,
                }}
                textInputProps={{
                  maxWidth: 95,
                  textAlign: "right",
                }}
                textInputStyle={{
                  fontSize: 12,
                }}
                {...phoneInput}
              />
              <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
            </VStack>
          )}
          {button && (
            <Button
              variant="ghost"
              pr="0"
              _text={{
                color: "gray.900",
                fontWeight: "normal",
                fontSize: "16",
              }}
              endIcon={
                <Icon
                  as={MaterialIcons}
                  name="chevron-right"
                  color="primary.700"
                />
              }
              {...button}
            >
              {buttonLabel || ""}
            </Button>
          )}
          {file &&
            (!buttonLabel ? (
              <Button
                variant="ghost"
                pr="0"
                _text={{ color: "gray.900", fontWeight: "normal" }}
                endIcon={
                  <Icon
                    as={MaterialIcons}
                    name="cloud-upload"
                    color="primary.700"
                  />
                }
                {...file}
              ></Button>
            ) : (
              <Text>{buttonLabel}</Text>
            ))}
        </HStack>
      </FormControl>
      {showDivider && <Divider w="full" />}
    </>
  );
};

export default InputHStack;
