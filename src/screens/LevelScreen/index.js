import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import _ from "lodash";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useLevelService } from "../../redux/Level/level.service";
import { setListLevelItem } from "../../redux/Level/level.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const LevelScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const dispatch = useDispatch();
  const levelService = useLevelService();
  const levelList = useSelector((state) => state.level.levelList);
  const totalPage = useSelector((state) => state.level.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListLevel = (
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
    dispatch(levelService.GetLevelList(data, onSuccessGetList, onErrorGetList));
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
      onGetListLevel(page + 1, 10, textFilter, null);
    } else {
      onGetListLevel(page + 1, 10, null, null);
    }
  };

  const onRefresh = () => {
    setPage(1);
    onGetListLevel(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListLevel(1, 10, text, null, true);
    }
  }, 1000);
  useEffect(() => {
    if (levelList.length === 0) {
      onGetListLevel();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.LEVEL_CREATE_SCREEN, {
              callback: { onGetListLevel },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={levelList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenTrinhDo"
        screenEdit={SCREEN_NAME.LEVEL_CREATE_SCREEN}
        callbackFunction={callbackFunction}
        onGetList={onGetListLevel}
      />
    </SafeAreaView>
  );
};

export default LevelScreen;
