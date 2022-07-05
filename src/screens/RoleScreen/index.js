import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
  View,
} from "native-base";
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
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import SearchBar from "../../components/SearchBar";
import { useRoleService } from "../../redux/Role/role.service";
import FlatlistConfig from "../../components/FlatListConfig";

const RoleScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const dispatch = useDispatch();
  const roleServices = useRoleService();
  const roleList = useSelector((state) => state.role.roleList);
  const totalPage = useSelector((state) => state.role.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListRole = (
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
    dispatch(roleServices.GetListRole(data, onSuccessGetList, onErrorGetList));
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
      onGetListRole(page + 1, 10, textFilter, null);
    } else {
      onGetListRole(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListRole(1, 10, null, null, true);
  };

  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListRole(1, 10, text, null, true);
    }
  }, 1000);

  useEffect(() => {
    onGetListRole(1, 10, null, null, true);
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.ROLE_CREATE_SCREEN, {
              callback: { onGetListRole },
            });
          }}
        />
      ),
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={roleList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenQuyen"
        screenEdit={SCREEN_NAME.ROLE_CREATE_SCREEN}
        callbackFunction={callbackFunction}
        onGetList={onGetListRole}
      />
    </SafeAreaView>
  );
};

export default RoleScreen;
