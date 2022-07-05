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
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { usePersonTaxService } from "../../redux/PersonTax/personTax.service";
import { setListItem } from "../../redux/PersonTax/personTax.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";
import moment from "moment";
import Empty from "../../components/Empty";

const PersonTaxScreen = (props) => {
  const dispatch = useDispatch();
  const personTaxService = usePersonTaxService();
  const personTaxList = useSelector((state) => state.personTax.personTaxList);
  const totalPage = useSelector((state) => state.personTax.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListPersonTax = (
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
      personTaxService.GetPersonTaxList(data, onSuccessGetList, onErrorGetList)
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
      onGetListPersonTax(page + 1, 10, textFilter, null);
    } else {
      onGetListPersonTax(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListPersonTax(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListPersonTax(1, 10, text, null, true);
    }
  }, 1000);
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigate(SCREEN_NAME.PERSON_TAX_CREATE_SCREEN, {
          item,
          callback: { onGetListPersonTax },
        })
      }
      _pressed={{ opacity: 0.3 }}
    >
      <VStack bgColor="white" borderRadius="8" padding="3" shadow="2" space="2">
        <HStack>
          <Text fontSize="md" bold>
            Ngày tạo: {moment(item?.c_NgayTao).format("DD/MM/YYYY")}{" "}
          </Text>
        </HStack>
        <HStack space="2" justifyContent="space-between">
          <Text fontSize="md" textAlign="right" bold>
            Hiệu lực từ ngày:{" "}
            {moment.unix(item?.c_HieuLucTuNgay).format("DD/MM/YYYY")}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="md">Ghi chú: {item?.c_GhiChu}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
  console.log(personTaxList);
  useEffect(() => {
    if (personTaxList.length === 0) {
      onGetListPersonTax();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.PERSON_TAX_CREATE_SCREEN, {
              callback: { onGetListPersonTax },
            });
          }}
        />
      ),
    });
  }, [page]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 12 }}
        data={personTaxList}
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

export default PersonTaxScreen;
