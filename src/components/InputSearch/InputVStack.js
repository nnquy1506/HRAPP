import React from "react";
import {
  VStack,
  Text,
  Input,
  TextArea,
  FormControl,
  Divider,
} from "native-base";

const InputVStack = (props) => {
  const {
    formControl,
    label,
    input,
    textArea,
    errorMsg,
    showDivider,
    labelText,
  } = props;
  return (
    <>
      <FormControl {...formControl}>
        <VStack my="2">
          {label && (
            <FormControl.Label>
              <Text
                color="grey.900"
                fontWeight="bold"
                fontSize="16"
                {...labelText}
              >
                {label}
              </Text>
            </FormControl.Label>
          )}
          {input && (
            <Input
              color="grey.900"
              borderBottomWidth="0"
              pl="0"
              fontSize="16"
              {...input}
            />
          )}
          {textArea && (
            <TextArea color="grey.900" pl="0" fontSize="16" {...textArea} />
          )}
          <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
        </VStack>
      </FormControl>
      {showDivider && <Divider w="full" />}
    </>
  );
};

export default InputVStack;
