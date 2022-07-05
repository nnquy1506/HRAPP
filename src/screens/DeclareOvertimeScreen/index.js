import React, { useEffect, useState } from "react";
import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import SCREEN_NAME from "../../constants/ScreenName";
import { useDeclareOverTimeService } from "../../redux/DeclareOvertime/declareOvertime.service";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";
import SearchBar from "../../components/SearchBar";
import moment from "moment";
import Empty from "../../components/Empty";

const DeclareOvertimeScreen = (props) => {
  const dispatch = useDispatch();
  const declareOvertimeService = useDeclareOverTimeService();
  const declareOvertimeList = useSelector(
    (state) => state.declareOvertime.declareOverTimeList
  );
  const totalPage = useSelector((state) => state.declareOvertime.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListDeclareOvertime = (
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
      filter: filter,
      status: status,
      isRefresh: isRefresh,
    };
    dispatch(
      declareOvertimeService.GetDeclareOverTimeList(
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
    if (textFilter) {
      onGetListDeclareOvertime(page + 1, 10, textFilter, null);
    } else {
      onGetListDeclareOvertime(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListDeclareOvertime(1, 10, null, null, true);
  };

  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListDeclareOvertime(1, 10, text, null, true);
    }
  }, 1000);
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigate(SCREEN_NAME.DECLARE_OVERTIME_CREATE_SCREEN, {
          item,
          callback: { onGetListDeclareOvertime },
        })
      }
      _pressed={{ opacity: 0.3 }}
    >
      <VStack bgColor="white" borderRadius="8" padding="3" shadow="2" space="2">
        <HStack space="2" justifyContent="space-between">
          <Text fontSize="md" textAlign="right" bold>
            Nhân viên: {item?.c_NguoiDung?.c_HoVaTen}
          </Text>
          <Text flex="1" fontSize="md" textAlign="right" bold isTruncated>
            Phòng ban: {item?.c_NguoiDung?.c_TenPhongBan}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="md">
            Ngày tăng ca: {moment.unix(item?.c_NgayTangCa).format("DD/MM/YYYY")}
          </Text>
        </HStack>
        <HStack space="2" justifyContent="space-between">
          <Text fontSize="md">
            Bắt đầu: {moment.unix(item?.c_ThoiGianBatDau).format("HH:mm:ss")}
          </Text>
          <Text fontSize="md">
            Kết thúc: {moment.unix(item?.c_ThoiGianKetThuc).format("HH:mm:ss")}
          </Text>
        </HStack>
        <Box
          w="30%"
          borderRadius="4"
          borderWidth="1"
          borderColor={
            item?.c_TrangThai === 1
              ? "amber.500"
              : item?.c_TrangThai === 2
              ? "success.500"
              : "danger.500"
          }
        >
          {item?.c_TrangThai === 1 ? (
            <Text fontSize="md" textAlign="center" color="amber.500">
              Chưa duyệt
            </Text>
          ) : item?.c_TrangThai === 2 ? (
            <Text fontSize="md" textAlign="center" color="success.500">
              Đã duyệt
            </Text>
          ) : (
            <Text fontSize="md" textAlign="center" color="danger.500">
              Hủy duyệt
            </Text>
          )}
        </Box>
      </VStack>
    </Pressable>
  );

  useEffect(() => {
    if (declareOvertimeList.length === 0) {
      onGetListDeclareOvertime();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.DECLARE_OVERTIME_CREATE_SCREEN, {
              callback: { onGetListDeclareOvertime },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Box padding="3" backgroundColor="shades.0">
        <SearchBar onChangeText={(text) => handleSearch(text)} />
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 12 }}
        data={declareOvertimeList}
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
    </SafeAreaView>
  );
};

export default DeclareOvertimeScreen;
