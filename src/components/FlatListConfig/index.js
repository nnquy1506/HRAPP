import {
  Box,
  HStack,
  Text,
  Divider,
  Pressable,
  Heading,
  View,
  Icon,
} from "native-base";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import SearchBar from "../SearchBar";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import Empty from "../Empty";

const FlatlistConfig = ({
  handleSearch,
  loading,
  dataList,
  contentDisplay,
  handleLoadMore,
  totalPage,
  page,
  onRefresh,
  refreshing,
  onGetList,
  callbackFunction,
  screenEdit,
  allowanceList,
  selectItem,
  listItem,
}) => {
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        if (callbackFunction) {
          if (!allowanceList) {
            callbackFunction(item.id);
            goBack();
          } else {
            selectItem(item);
          }
        } else {
          navigate(screenEdit, {
            item,
            callback: { onGetList },
          });
        }
      }}
      bg="white"
      _pressed={{ opacity: 0.5 }}
    >
      <HStack alignItems="center" p="3" justifyContent="space-between">
        <Heading isTruncated>{item[contentDisplay]}</Heading>
        {allowanceList &&
          listItem &&
          listItem?.length > 0 &&
          listItem?.map((val) => {
            if (val === item.id) {
              return <Icon as={Ionicons} name="checkmark" />;
            }
          })}
      </HStack>
    </Pressable>
  );
  return (
    <>
      <Divider />
      <Box padding="3" backgroundColor="shades.0">
        <SearchBar onChangeText={(text) => handleSearch(text)} />
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View mx="3">
            <Divider />
          </View>
        )}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={
          loading && (
            <Box my="2">
              <ActivityIndicator />
            </Box>
          )
        }
        onEndReached={() => {
          if (!loading && totalPage > 0 && page !== totalPage) {
            handleLoadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          loading ? null : (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
      />
    </>
  );
};
export default FlatlistConfig;
