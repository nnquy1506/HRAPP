import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box } from "native-base";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useShiftService } from "../../redux/Shift/shift.service";
import { setListShiftItem } from "../../redux/Shift/shift.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const ShiftScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const dispatch = useDispatch();
  const shiftService = useShiftService();
  const shiftList = useSelector((state) => state.shift.shiftList);
  const totalPage = useSelector((state) => state.shift.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListShift = (
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
    dispatch(shiftService.GetShiftList(data, onSuccessGetList, onErrorGetList));
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
      onGetListShift(page + 1, 10, textFilter, null);
    } else {
      onGetListShift(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListShift(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListShift(1, 10, text, null, true);
    }
  }, 1000);

  useEffect(() => {
    if (shiftList.length === 0) {
      onGetListShift();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={shiftList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenCaLam"
        screenEdit={SCREEN_NAME.SHIFT_CREATE_SCREEN}
        callbackFunction={callbackFunction}
        onGetList={onGetListShift}
      />
    </SafeAreaView>
  );
};

export default ShiftScreen;
