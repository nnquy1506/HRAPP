import React from "react";
import { FormControl, TextArea } from "native-base";

const TextAreaView = ({
  isRequired,
  isDisabled,
  isReadOnly,
  title,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <FormControl.Label>{title}</FormControl.Label>
      <TextArea {...rest} h={20} placeholder={placeholder} />
      {error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
export default TextAreaView;
