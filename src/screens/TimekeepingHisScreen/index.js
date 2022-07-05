import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { View, Text, HStack, Box, VStack, Avatar } from "native-base";
import { useTimekeepingService } from "../../redux/TimeKeeping/timekeeping.service";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ConfigPagination } from "../../constants/ConfigPagination";
import { imageTimekeeping } from "../../config";
import LoadingData from "../../components/LoadingData";
import Empty from "../../components/Empty";

const TimekeepingHisScreen = (props) => {
  const dispatch = useDispatch();
  const timekeepingService = useTimekeepingService();

  const timekeepingList = useSelector(
    (state) => state.timekeeping.timekeepingList
  );
  const totalPage = useSelector((state) => state.timekeeping.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListTimekeeping = (
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
      timekeepingService.GetTimekeepingList(
        data,
        onSuccessGetList,
        onErrorGetList
      )
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
    onGetListTimekeeping(page + 1, 10, null, null);
  };

  const onRefresh = () => {
    setPage(1);
    onGetListTimekeeping(1, 10, null, null, true);
  };
  const renderItem = ({ item }) => (
    <HStack
      space="3"
      alignItems="center"
      bgColor="white"
      borderRadius="8"
      padding="3"
      shadow="2"
    >
      <Avatar
        bg="cyan.500"
        size="20"
        key={`${imageTimekeeping}${item.c_AnhChamCong}`}
        source={{
          uri: `${imageTimekeeping}${item.c_AnhChamCong}`,
        }}
      >
        {item?.c_NguoiDung?.c_HoVaTen[0].toUpperCase()}
      </Avatar>
      <VStack space="2" alignItems="flex-start">
        <Text fontSize="md" bold>
          Nhân viên: {item?.c_NguoiDung?.c_HoVaTen}
        </Text>
        <Text fontSize="md">Phòng ban: {item?.c_NguoiDung?.c_TenPhongBan}</Text>
        <Text fontSize="md" color="success.500">
          Ghi nhận:{" "}
          {moment.unix(item?.c_TimeStamp).format("hh:mm:ss | DD/MM/YYYY")}
        </Text>
      </VStack>
    </HStack>
  );

  useEffect(() => {
    onGetListTimekeeping();
    props.navigation.setParams({
      callback: (pageIndex, pageSize, filter, status, isRefresh) => {
        setTextFilter(filter);
        onGetListTimekeeping(pageIndex, pageSize, filter, status, isRefresh);
      },
    });
    setInterval(() => {
      onRefresh();
    }, 60000);
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 16 }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={timekeepingList}
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

export default TimekeepingHisScreen;
