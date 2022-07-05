import React, { useEffect, useState } from "react";
import { Box, Text, View } from "native-base";
import { FlatList, SafeAreaView } from "react-native";
import _ from "lodash";
import { useAllowanceService } from "../../redux/Allowance/allowance.service";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate, goBack } from "../../ultis/navigationHelpers";

const AllowanceScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const initValue = props?.route?.params?.initValue;
  const dispatch = useDispatch();
  const allowanceService = useAllowanceService();
  const allowanceList = useSelector((state) => state.allowance.allowanceList);
  const totalPage = useSelector((state) => state.allowance.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const [listItem, setListItem] = useState(initValue);
  const onGetListAllowance = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = "",
    isRefresh
  ) => {
    setLoading(true);
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
      isRefresh: isRefresh,
    };
    dispatch(
      allowanceService.GetAllowanceList(data, onSuccessGetList, onErrorGetList)
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
      onGetListAllowance(page + 1, 10, textFilter, null);
    } else {
      onGetListAllowance(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListAllowance(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListAllowance(1, 10, text, null, true);
    }
  }, 1000);
  const selectItem = (item) => {
    const check = listItem.indexOf(item.id);
    const isChecked = JSON.parse(JSON.stringify(listItem));
    if (check === -1) {
      isChecked.push(item.id);
    } else {
      isChecked.splice(check, 1);
    }
    setListItem(isChecked);
  };
  const saveSelected = () => {
    callbackFunction(listItem);
    goBack();
  };
  useEffect(() => {
    if (allowanceList.length === 0) {
      onGetListAllowance();
    }
    if (!callbackFunction) {
      props.navigation.setOptions({
        headerRight: () => (
          <ButtonAdd
            onPress={() => {
              navigate(SCREEN_NAME.ALLOWANCE_CREATE_SCREEN, {
                callback: { onGetListAllowance },
              });
            }}
          />
        ),
      });
    } else {
      props.navigation.setOptions({
        headerRight: () => <ButtonSaveSubmit onPress={() => saveSelected()} />,
      });
    }
  }, [listItem]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        allowanceList
        listItem={listItem}
        selectItem={selectItem}
        dataList={allowanceList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenPhuCap"
        screenEdit={SCREEN_NAME.ALLOWANCE_CREATE_SCREEN}
        callbackFunction={callbackFunction}
        onGetList={onGetListAllowance}
      />
    </SafeAreaView>
  );
};

export default AllowanceScreen;
