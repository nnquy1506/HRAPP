import React, { forwardRef } from "react";
import { Input, Icon } from "native-base";
import IonIcons from "@expo/vector-icons/Ionicons";

const SearchBar = ({ forwardedRef, ...inputProps }) => {
  return (
    <Input
      ref={forwardedRef}
      py="3"
      px="2"
      placeholder="Tìm kiếm"
      variant="filled"
      width="100%"
      bg="grey.100"
      borderRadius="8"
      placeholderTextColor="grey.500"
      borderWidth="0"
      InputLeftElement={
        <Icon
          ml="2"
          size="5"
          color="grey.500"
          as={<IonIcons name="ios-search" />}
        />
      }
      {...inputProps}
    />
  );
};

export default forwardRef((props, ref) => (
  <SearchBar {...props} forwardedRef={ref} />
));
