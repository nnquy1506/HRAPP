import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box } from "native-base";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useTimeKeeperService } from "../../redux/TimeKeeper/timeKeeper.service";
import { setListTimeKeeperItem } from "../../redux/TimeKeeper/timeKeeper.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const TimeKeeperScreen = (props) => {
  const dispatch = useDispatch();
  const timeKeeperService = useTimeKeeperService();
  const timeKeeperList = useSelector(
    (state) => state.timeKeeper.timeKeeperList
  );
  const totalPage = useSelector((state) => state.timeKeeper.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListTimeKeeper = (
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
      timeKeeperService.GetTimeKeeperList(
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
      onGetListTimeKeeper(page + 1, 10, textFilter, null);
    } else {
      onGetListTimeKeeper(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListTimeKeeper(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListTimeKeeper(1, 10, text, null, true);
    }
  }, 1000);
  useEffect(() => {
    if (timeKeeperList.length === 0) {
      onGetListTimeKeeper();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.TIMEKEEPER_CREATE_SCREEN, {
              callback: { onGetListTimeKeeper },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={timeKeeperList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenMayChamCong"
        screenEdit={SCREEN_NAME.TIMEKEEPER_CREATE_SCREEN}
        onGetList={onGetListTimeKeeper}
      />
    </SafeAreaView>
  );
};

export default TimeKeeperScreen;
