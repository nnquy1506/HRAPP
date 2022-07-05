import React from "react";
import { FormControl, Input } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimeView = ({
  isRequired,
  isDisabled,
  isReadOnly,
  isInvalid,
  title,
  placeholder,
  errors,
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
      <DateTimePicker {...rest} />
      <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage>
    </FormControl>
  );
};
export default DateTimeView;
