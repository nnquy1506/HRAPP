import React, { useState } from "react";
import { scale } from "react-native-size-matters";

import { Box, Icon, IconButton } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

import SearchBar from "../SearchBar";
import _ from "lodash";
import { useTimekeepingService } from "../../redux/TimeKeeping/timekeeping.service";
import { useDispatch } from "react-redux";

const InputSearch = (props) => {
  const { styles, closeSearchMode, state } = props;
  const dispatch = useDispatch();
  const timekeepingService = useTimekeepingService();
  const [textSearch, setTextSearch] = useState("");
  const handleSearch = _.debounce((text) => {
    setTextSearch(text);
    state.routes[state.index].params.callback(1, 10, text, null, true);
  }, 500);

  const closeSearch = () => {
    if (textSearch)
      state.routes[state.index].params.callback(1, 10, "", null, true);
    closeSearchMode();
  };
  return (
    <Box
      style={styles.searchMode}
      px="3"
      borderBottomWidth="1"
      borderStyle="solid"
      borderBottomColor="#EAEAEA"
      position="relative"
      bg="white"
    >
      <Box marginRight={scale(40)}>
        <SearchBar autoFocus onChangeText={(text) => handleSearch(text)} />
      </Box>
      <IconButton
        icon={
          <Icon
            as={Ionicons}
            name="ios-close"
            style={{ fontSize: scale(24) }}
            color="primary.700"
          />
        }
        onPress={() => closeSearch()}
        _pressed={{
          opacity: 0.5,
          backgroundColor: "white",
        }}
        style={styles.cancelSearchModeBtn}
      />
    </Box>
  );
};

export default InputSearch;
