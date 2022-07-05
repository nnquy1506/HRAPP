import React, { useEffect, useState } from "react";
import _ from "lodash";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useKindOfOverTimeService } from "../../redux/KindOfOvertime/kindOfOvertime.service";
import { setListItem } from "../../redux/KindOfOvertime/kindOfOvertime.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const KindOfOvertimeScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const dispatch = useDispatch();
  const kindOfOvertimeService = useKindOfOverTimeService();
  const kindOfOvertimeList = useSelector(
    (state) => state.kindOfOvertime.kindOfOverTimeList
  );
  const totalPage = useSelector((state) => state.kindOfOvertime.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListKindOfOvertime = (
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
      kindOfOvertimeService.GetKindOfOverTimeList(
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
      onGetListKindOfOvertime(page + 1, 10, textFilter, null);
    } else {
      onGetListKindOfOvertime(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListKindOfOvertime(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListKindOfOvertime(1, 10, text, null, true);
    }
  }, 1000);

  useEffect(() => {
    if (kindOfOvertimeList.length === 0) {
      onGetListKindOfOvertime();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.KIND_OF_OVERTIME_CREATE_SCREEN, {
              callback: { onGetListKindOfOvertime },
            });
          }}
        />
      ),
    });
  }, [page]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={kindOfOvertimeList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_LoaiTangCa"
        callbackFunction={callbackFunction}
        screenEdit={SCREEN_NAME.KIND_OF_OVERTIME_CREATE_SCREEN}
        onGetList={onGetListKindOfOvertime}
      />
    </SafeAreaView>
  );
};

export default KindOfOvertimeScreen;
