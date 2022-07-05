import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box } from "native-base";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useHolidayService } from "../../redux/Holiday/holiday.service";
import { setListHolidayItem } from "../../redux/Holiday/holiday.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const HolidayScreen = (props) => {
  const dispatch = useDispatch();
  const holidayService = useHolidayService();
  const holidayList = useSelector((state) => state.holiday.holidayList);
  const totalPage = useSelector((state) => state.holiday.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListHoliday = (
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
      holidayService.GetHolidayList(data, onSuccessGetList, onErrorGetList)
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
      onGetListHoliday(page + 1, 10, textFilter, null);
    } else {
      onGetListHoliday(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListHoliday(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListHoliday(1, 10, text, null, true);
    }
  }, 1000);
  useEffect(() => {
    if (holidayList.length === 0) {
      onGetListHoliday();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.HOLIDAY_CREATE_SCREEN, {
              callback: { onGetListHoliday },
            });
          }}
        />
      ),
    });
  }, [page]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={holidayList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenNgayNghi"
        screenEdit={SCREEN_NAME.HOLIDAY_CREATE_SCREEN}
        onGetList={onGetListHoliday}
      />
    </SafeAreaView>
  );
};

export default HolidayScreen;
