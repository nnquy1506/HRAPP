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
import SCREEN_NAME from "../../constants/ScreenName";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";
import moment from "moment";
import { useSalaryCalService } from "../../redux/SalaryCalculation/salaryCal.service";
import SearchBar from "../../components/SearchBar";
import Empty from "../../components/Empty";

const SalaryCalScreen = (props) => {
  const dispatch = useDispatch();
  const salaryCalService = useSalaryCalService();
  const salaryCalList = useSelector((state) => state.salaryCal.salaryCalList);
  const totalPage = useSelector((state) => state.salaryCal.totalPage);
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
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
      isRefresh: isRefresh,
    };
    dispatch(
      salaryCalService.GetSalaryCalList(data, onSuccessGetList, onErrorGetList)
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
        navigate(SCREEN_NAME.SALARY_CAL_CREATE_SCREEN, {
          item,
          callback: { onGetListSalaryCal },
        })
      }
      _pressed={{ opacity: 0.3 }}
    >
      <VStack bgColor="white" borderRadius="8" padding="3" shadow="2" space="2">
        <HStack>
          <Text fontSize="md" bold>
            Đợt tính lương: {item?.c_TenDotTinhLuong}
          </Text>
        </HStack>
        <HStack space="2" justifyContent="space-between">
          <Text fontSize="md" textAlign="right" bold>
            Tháng: {item?.c_ThangNam}
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
    if (salaryCalList.length === 0) {
      onGetListSalaryCal();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.SALARY_CAL_CREATE_SCREEN, {
              callback: { onGetListSalaryCal },
            });
          }}
        />
      ),
    });
  }, [page]);

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
        data={salaryCalList}
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

export default SalaryCalScreen;
