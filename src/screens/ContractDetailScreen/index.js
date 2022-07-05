import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useContractService } from "../../redux/Contract/contract.service";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";
import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import SearchBar from "../../components/SearchBar";
import Empty from "../../components/Empty";

const ContractDetailScreen = (props) => {
  const items = props?.route?.params?.items;
  const dispatch = useDispatch();
  const contractService = useContractService();
  const contractDetailList = useSelector(
    (state) => state.contract.contractDetailList
  );
  const totalPageDetail = useSelector(
    (state) => state.contract.totalPageDetail
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();

  const onGetListContractDetail = (
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
      Fk_NguoiDung: items?.id,
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
      isRefresh: isRefresh,
    };
    dispatch(
      contractService.GetContractDetailList(
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
      onGetListContractDetail(page + 1, 10, textFilter, null);
    } else {
      onGetListContractDetail(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListContractDetail(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListContractDetail(1, 10, text, null, true);
    }
  }, 1000);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigate(SCREEN_NAME.CONTRACT_DETAIL_CREATE_SCREEN, {
          callback: { onGetListContractDetail },
          item,
          nguoiDung: items,
        })
      }
    >
      <VStack bgColor="white" borderRadius={8} p="3" space="3" shadow="2">
        <HStack justifyContent="space-between">
          <Text fontSize="md" textAlign="right" bold>
            Nhân viên: {item?.c_NhanVien?.c_HoVaTen}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize="md">Hợp đồng: {item?.c_TenLoaiHopDong}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize="md" color="green.500">
            Lương cơ bản: {item?.c_MucLuongCoBan}VND
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
  useEffect(() => {
    onGetListContractDetail(1, 10, null, null, true);
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.CONTRACT_DETAIL_CREATE_SCREEN, {
              callback: { onGetListContractDetail },
              nguoiDung: items,
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
        data={contractDetailList}
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
          if (!loading && totalPageDetail > 0 && page !== totalPageDetail) {
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

export default ContractDetailScreen;
