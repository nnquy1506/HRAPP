import React from "react";
import { Box, CheckIcon, FormControl, Select } from "native-base";

const SelectView = ({
  isRequired,
  isDisabled,
  isReadOnly,
  isInvalid,
  title,
  placeholder,
  errors,
  option,
  ...rest
}) => {
  return (
    <Box mt={2}>
      <FormControl
        isRequired={isRequired}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isInvalid={isInvalid}
      >
        <FormControl.Label>{title}</FormControl.Label>
        <Select {...rest} placeholder={placeholder}>
          {option &&
            option.length > 0 &&
            option.map((item) => (
              <Select.Item label={item.label} value={item.value} />
            ))}
        </Select>
        <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
export default SelectView;
