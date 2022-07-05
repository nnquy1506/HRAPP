import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import { useSalaryCalService } from "../../redux/SalaryCalculation/salaryCal.service";
import SearchBar from "../../components/SearchBar";
import { navigate } from "../../ultis/navigationHelpers";
import SCREEN_NAME from "../../constants/ScreenName";
import Empty from "../../components/Empty";

const DetailSalaryScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const salaryCalService = useSalaryCalService();
  const detailSalaryCalList = useSelector(
    (state) => state.salaryCal.detailSalaryCalList
  );
  const totalPage = useSelector((state) => state.salaryCal.totalPageDetail);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListSalaryCal = (
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
      Fk_DotTinhLuong: item.id,
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
      isRefresh: isRefresh,
    };
    dispatch(
      salaryCalService.getDetailSalary(data, onSuccessGetList, onErrorGetList)
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
      onGetListSalaryCal(page + 1, 10, textFilter, null);
    } else {
      onGetListSalaryCal(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListSalaryCal(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListSalaryCal(1, 10, text, null, true);
    }
  }, 1000);
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigate(SCREEN_NAME.DETAIL_SALARY_EMPLOYEE_SCREEN, { item })
      }
    >
      <VStack bgColor="white" borderRadius={8} p="3" space="3" shadow="2">
        <HStack justifyContent="space-between">
          <Text fontSize="md" color="gray.400">
            Mã NV: {item?.c_NguoiDung?.c_Code}
          </Text>
          <Text fontSize="md" textAlign="right" bold>
            Nhân viên: {item?.c_NguoiDung?.c_HoVaTen}{" "}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize="md" color="green.500">
            Lương thực nhận: {Number(item?.c_TongLuong).toLocaleString()} VNĐ
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
  useEffect(() => {
    if (detailSalaryCalList?.length === 0) {
      onGetListSalaryCal();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      {/* <Box padding="3" backgroundColor="shades.0">
        <SearchBar onChangeText={(text) => handleSearch(text)} />
      </Box> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 12 }}
        data={detailSalaryCalList}
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

export default DetailSalaryScreen;
