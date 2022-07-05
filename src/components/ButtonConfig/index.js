import { Button } from "native-base";
import React from "react";

export const ButtonSave = ({
  title,
  titleLoading,
  isLoading,
  onPress,
  ...rest
}) => {
  return (
    <Button
      onPress={onPress}
      isLoading={isLoading}
      isLoadingText={titleLoading}
      {...rest}
    >
      {title}
    </Button>
  );
};
export const ButtonDelete = ({
  title,
  titleLoading,
  isLoading,
  onPress,
  ...rest
}) => {
  return (
    <Button
      colorScheme="danger"
      onPress={onPress}
      isLoading={isLoading}
      isLoadingText={titleLoading}
      {...rest}
    >
      {title}
    </Button>
  );
};
