import React from "react";
import { FormControl, Input } from "native-base";

const TextFieldView = ({
  isRequired,
  isDisabled,
  isReadOnly,
  isInvalid,
  title,
  placeholder,
  errors,
  touched,
  ...rest
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isInvalid={isInvalid}
    >
      <FormControl.Label>{title}</FormControl.Label>
      <Input {...rest} p={2} placeholder={placeholder} />
      {touched && <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
export default TextFieldView;
