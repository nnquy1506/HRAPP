import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box } from "native-base";
import _, { isBuffer } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useJobTitleService } from "../../redux/JobTitle/jobTitle.service";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const JobTitleScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const dispatch = useDispatch();
  const jobTitleService = useJobTitleService();
  const jobTitleList = useSelector((state) => state.jobTitle.jobTitleList);
  const totalPage = useSelector((state) => state.jobTitle.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListJobTitle = (
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
      jobTitleService.GetJobTitleList(data, onSuccessGetList, onErrorGetList)
    );
  };
  const onSuccessGetList = (res) => {
    setLoading(false);
    setRefreshing(false);
  };
  const onErrorGetList = () => {
    setRefreshing(false);
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    if (textFilter) {
      onGetListJobTitle(page + 1, 10, textFilter, null);
    } else {
      onGetListJobTitle(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListJobTitle(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListJobTitle(1, 10, text, null, true);
    }
  }, 1000);

  useEffect(() => {
    if (jobTitleList.length === 0) {
      onGetListJobTitle();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.JOB_TITLE_CREATE_SCREEN, {
              callback: { onGetListJobTitle },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={jobTitleList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenChucDanh"
        screenEdit={SCREEN_NAME.JOB_TITLE_CREATE_SCREEN}
        callbackFunction={callbackFunction}
        onGetList={onGetListJobTitle}
      />
    </SafeAreaView>
  );
};

export default JobTitleScreen;
