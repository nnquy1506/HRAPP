import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { View, Text, HStack, Box, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTimesheetService } from "../../redux/TimeSheet/timesheet.service";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Empty from "../../components/Empty";

const TimesheetScreen = (props) => {
  const dispatch = useDispatch();
  const timesheetService = useTimesheetService();

  const timesheetList = useSelector((state) => state.timesheet.timesheetList);
  const totalPage = useSelector((state) => state.timesheet.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListTimesheet = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = "",
    isRefresh
  ) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter || textFilter,
      status: status,
      isRefresh: isRefresh,
    };
    dispatch(
      timesheetService.GetTimesheetList(data, onSuccessGetList, onErrorGetList)
    );
  };
  const onSuccessGetList = (res) => {
    setLoading(false);
    setRefreshing(false);
  };
  const onErrorGetList = () => {
    setLoading(false);
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    onGetListTimesheet(page + 1, 10, null, null);
  };
  const onRefresh = () => {
    setPage(1);
    onGetListTimesheet(1, 10, null, null, true);
  };
  const renderItem = ({ item }) => (
    <VStack
      // justifyContent="space-between"
      // alignItems="center"
      bgColor="white"
      borderRadius="8"
      padding="3"
      shadow="2"
      space="2"
    >
      <HStack space="2" justifyContent="space-between">
        <Text fontSize="md" color="gray.400">
          {item?.c_NguoiDung?.c_Code}
        </Text>
        <Text fontSize="md" textAlign="right" bold>
          Nhân viên: {item?.c_NguoiDung?.c_HoVaTen}
        </Text>
      </HStack>
      <HStack space="2" justifyContent="space-between">
        <Text fontSize="md">Ngày: {item.c_Date}</Text>
        <Text fontSize="md" textAlign="right" bold>
          Số lần: {item?.c_SoLan}
        </Text>
      </HStack>
      <HStack space="2" justifyContent="space-between">
        <Text fontSize="md" color="success.500">
          Vào: {moment.unix(item?.c_CheckIn).format("hh:mm:ss")}
        </Text>
        <Text fontSize="md" textAlign="right" bold>
          Số công: {item?.c_SoCong}
        </Text>
      </HStack>
      <HStack space="2">
        <Text fontSize="md" textAlign="right" color="danger.500">
          Ra: {moment.unix(item?.c_CheckOut).format("hh:mm:ss")}
        </Text>
      </HStack>
    </VStack>
  );

  useEffect(() => {
    onGetListTimesheet();
    props.navigation.setParams({
      callback: (pageIndex, pageSize, filter, status, isRefresh) => {
        setTextFilter(filter);
        onGetListTimesheet(pageIndex, pageSize, filter, status, isRefresh);
      },
    });
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 16 }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={timesheetList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box h="4" />}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={
          loading && (
            <Box my="2">
              <ActivityIndicator />
            </Box>
          )
        }
        onEndReached={() => {
          if (!loading && page !== totalPage) {
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
    </SafeAreaView>
  );
};

export default TimesheetScreen;
