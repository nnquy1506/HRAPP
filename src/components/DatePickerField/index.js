import React, { useMemo, useState } from "react";
import moment from "moment";
import { scale, ScaledSheet } from "react-native-size-matters";

import {
  Box,
  Divider,
  FormControl,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
const DatePickerField = (props) => {
  const {
    label,
    onChangeDate,
    date,
    useDivider,
    _datePicker,
    _label,
    mode,
    formControl,
    errorMsg,
    touchInput,
  } = props;

  return (
    <FormControl {...formControl}>
      <HStack
        flex={1}
        justifyContent={"space-between"}
        alignItems="center"
        py="3"
      >
        <FormControl.Label mb="0">
          <Heading color="grey.900" fontWeight="bold" fontSize="16" {..._label}>
            {label}
          </Heading>
        </FormControl.Label>
        <DateTimePicker
          style={{ display: "flex", flex: 1 }}
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChangeDate}
          {..._datePicker}
        />
      </HStack>
      {useDivider && <Divider w="full" />}
    </FormControl>
  );
};

DatePickerField.defaultProps = {
  date: new Date(),
};

export default DatePickerField;
