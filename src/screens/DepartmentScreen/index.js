import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import { SafeAreaView } from "react-native";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ConfigPagination } from "../../constants/ConfigPagination";
import Header from "../../components/Header";
import SCREEN_NAME from "../../constants/ScreenName";
import FlatlistConfig from "../../components/FlatListConfig";
import { useDepartmentService } from "../../redux/Department/department.service";
import { setListDepartmentEmpty } from "../../redux/Department/department.action";
import ButtonAdd from "../../components/ButtonConfig/ButtonAdd";
import { navigate } from "../../ultis/navigationHelpers";

const DepartmentScreen = (props) => {
  const callbackFunction = props?.route?.params?.callback;
  const dispatch = useDispatch();
  const departmentService = useDepartmentService();
  const departmentList = useSelector(
    (state) => state.department.departmentList
  );
  const totalPage = useSelector((state) => state.department.totalPage);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(ConfigPagination.DefaultPageIndex);
  const [pageSizeDefault, setPageSize] = useState(
    ConfigPagination.DefaultPageSize
  );
  const [textFilter, setTextFilter] = useState();
  const onGetListDepartment = (
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
      departmentService.GetDepartmentList(
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
      onGetListDepartment(page + 1, 10, textFilter, null);
    } else {
      onGetListDepartment(page + 1, 10, null, null);
    }
  };

  const handleSearch = _.debounce((text) => {
    if (!text) {
      setTextFilter("");
      onRefresh();
    } else {
      setTextFilter(text);
      onGetListDepartment(1, 10, text, null, true);
    }
  }, 1000);

  const onRefresh = () => {
    setPage(1);
    onGetListDepartment(1, 10, null, null, true);
  };
  useEffect(() => {
    if (departmentList.length === 0) {
      onGetListDepartment();
    }
    props.navigation.setOptions({
      headerRight: () => (
        <ButtonAdd
          onPress={() => {
            navigate(SCREEN_NAME.DEPARTMENT_CREATE_SCREEN, {
              callback: { onGetListDepartment },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatlistConfig
        dataList={departmentList || []}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loading={loading}
        handleLoadMore={handleLoadMore}
        totalPage={totalPage || 0}
        page={page}
        handleSearch={handleSearch}
        contentDisplay="c_TenPhongBan"
        screenEdit={SCREEN_NAME.DEPARTMENT_CREATE_SCREEN}
        callbackFunction={callbackFunction}
        onGetList={onGetListDepartment}
      />
    </SafeAreaView>
  );
};

export default DepartmentScreen;
