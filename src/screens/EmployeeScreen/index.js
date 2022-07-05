import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Fab,
  HStack,
  Icon,
  Text,
  VStack,
} from "native-base";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import SCREEN_NAME from "../../constants/ScreenName";
import { useEmployeeService } from "../../redux/Employee/employee.service";
import { setListEmployeeItem } from "../../redux/Employee/employee.action";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { imageAvatar } from "../../config";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import SearchBar from "../../components/SearchBar";
import Empty from "../../components/Empty";

const EmployeeScreen = (props) => {
  const pick = props.route.params?.pick;
  const dispatch = useDispatch();
  const employeeService = useEmployeeService();
  const employeeList = useSelector((state) => state.employee.employeeList);
  const totalPage = useSelector((state) => state.employee.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListEmployee = (
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
      employeeService.GetEmployeeList(data, onSuccessGetList, onErrorGetList)
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
    onGetListEmployee(page + 1, 10, null, null);
  };

  const onRefresh = () => {
    setPage(1);
    onGetListEmployee(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      // setTextFilter("");
      onRefresh();
    } else {
      // setTextFilter(text);
      onGetListEmployee(1, 10, text, null, true);
    }
  }, 1000);

  const renderEmployee = ({ item }) => {
    if (item.c_TrangThai !== 2) return;
    return (
      <TouchableOpacity
        onPress={() => {
          if (pick) {
            pick(item.id);
            goBack();
          } else {
            navigate(SCREEN_NAME.EMPLOYEE_CREATE_SCREEN, {
              item,
              callback: onGetListEmployee,
            });
          }
        }}
      >
        <HStack
          py={2}
          pl={3}
          justifyContent="space-between"
          alignItems="center"
          borderColor={"#e5e7eb"}
          bgColor="white"
        >
          <Avatar
            key={`${imageAvatar + item.c_Avatar}`}
            size="lg"
            bg="cyan.500"
            source={{
              uri: item.c_Avatar
                ? `${imageAvatar + item.c_Avatar}`
                : "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
            }}
          >
            {item?.c_HoVaTen[0].toUpperCase()}
          </Avatar>

          <Box ml={3} flex={1}>
            <HStack alignItems="center" justifyContent="space-between" my={2}>
              <VStack>
                <Text fontSize={"lg"} bold>
                  {item.c_HoVaTen}
                </Text>
                <Text fontSize={"xs"}>
                  <Text bold>Chức danh: </Text>
                  {item.c_TenChucDanh}
                </Text>
              </VStack>

              <Box mr={2}>
                <Ionicons name="chevron-forward-outline" size={20} />
              </Box>
            </HStack>
          </Box>
        </HStack>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (employeeList.length === 0) {
      onGetListEmployee();
    }
    if (props.route.name === SCREEN_NAME.EMPLOYEE_PICK_SCREEN) return;
    props.navigation.setParams({
      callback: (pageIndex, pageSize, filter, status, isRefresh) => {
        setTextFilter(filter);
        onGetListEmployee(pageIndex, pageSize, filter, status, isRefresh);
      },
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
      }}
    >
      {pick && (
        <>
          <Divider />
          <Box padding="3" backgroundColor="shades.0">
            <SearchBar onChangeText={(text) => handleSearch(text)} />
          </Box>
        </>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // style={{ borderRadius: 8 }}
        data={employeeList}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployee}
        ItemSeparatorComponent={() => <Divider />}
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
      {props.route.name === SCREEN_NAME.EMPLOYEE_SCREEN && (
        <Fab
          right={2}
          bottom={2}
          renderInPortal={false}
          icon={<Icon color="white" as={<AntDesign name="plus" />} />}
          onPress={() =>
            navigate(SCREEN_NAME.EMPLOYEE_CREATE_SCREEN, {
              callback: onGetListEmployee,
            })
          }
        />
      )}
    </SafeAreaView>
  );
};

export default EmployeeScreen;
