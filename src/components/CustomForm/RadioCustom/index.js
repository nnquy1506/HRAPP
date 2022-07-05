import React from "react";
import { HStack, Text, FormControl, Divider, Radio } from "native-base";

const RadioCustom = (props) => {
  const {
    formControl,
    label,
    errorMsg,
    showDivider,
    _label,
    touchInput,
    options,
    _radio,
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
                fontSize={16}
                {..._label}
              >
                {label}
              </Text>
            </FormControl.Label>
          )}
          <HStack>
            <Radio.Group flexDirection="row" size={"md"} {..._radio}>
              {options &&
                options.map((op) => (
                  <Radio value={op.value} my="1" ml="3" size="sm">
                    {op.label}
                  </Radio>
                ))}
            </Radio.Group>
            {touchInput && errorMsg && (
              <FormControl.ErrorMessage
                _stack={{
                  justifyContent: "flex-end",
                }}
              >
                {errorMsg}
              </FormControl.ErrorMessage>
            )}
          </HStack>
        </HStack>
      </FormControl>
      {showDivider && <Divider w="full" />}
    </>
  );
};

export default RadioCustom;
