import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box } from "native-base";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useInsuranceService } from "../../redux/Insurance/Insurance.service";
import { setListInsuranceEmpty } from "../../redux/Insurance/Insurance.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const InsuranceScreen = (props) => {
  const dispatch = useDispatch();
  const insuranceService = useInsuranceService();
  const insuranceList = useSelector((state) => state.insurance.insuranceList);
  const totalPage = useSelector((state) => state.insurance.totalPage);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListInsurance = (
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
      insuranceService.GetInsuranceList(data, onSuccessGetList, onErrorGetList)
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
      onGetListInsurance(page + 1, 10, textFilter, null);
    } else {
      onGetListInsurance(page + 1, 10, null, null);
    }
  };
  const onRefresh = () => {
    setPage(1);
    onGetListInsurance(1, 10, null, null, true);
  };
  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListInsurance(1, 10, text, null, true);
    }
  }, 1000);

  useEffect(() => {
    if (insuranceList.length === 0) {
      onGetListInsurance();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.INSURANCE_CREATE_SCREEN, {
              callback: { onGetListInsurance },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={insuranceList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenBaoHiem"
        screenEdit={SCREEN_NAME.INSURANCE_CREATE_SCREEN}
        onGetList={onGetListInsurance}
      />
    </SafeAreaView>
  );
};

export default InsuranceScreen;
