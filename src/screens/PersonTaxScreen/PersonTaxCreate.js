import React, { useEffect, useState } from "react";

import {
  VStack,
  Box,
  useToast,
  HStack,
  Divider,
  Icon,
  Text,
  Pressable,
} from "native-base";
import * as Yup from "yup";
import moment from "moment";

import TextFieldView from "../../components/CustomForm/TextFieldView";
import TextAreaView from "../../components/CustomForm/TextAreaView";
import { Formik, useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { usePersonTaxService } from "../../redux/PersonTax/personTax.service";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { setListItem } from "../../redux/PersonTax/personTax.action";
import { SafeAreaView, ScrollView } from "react-native";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import InputHStack from "../../components/InputSearch/InputHStack";
import DeleteAlert from "../../components/DeleteComponent";
import { useNotification } from "../../hooks/useNotification";
import DatePickerField from "../../components/DatePickerField";
import AddListSection from "../../components/Addlist/AddListSection";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import SCREEN_NAME from "../../constants/ScreenName";

const PersonTaxCreateScreen = (props) => {
  const item = props?.route?.params?.item;
  const dispatch = useDispatch();
  const personTaxService = usePersonTaxService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    ghiChu: Yup.string(),
    hieuLucTuNgay: Yup.date().required("Trường này là bắt buộc"),
  });
  const initialValues = {
    ghiChu: item?.c_GhiChu || "",
    hieuLucTuNgay: moment
      .unix(Number(item?.c_HieuLucTuNgay) || moment().unix())
      .toDate(),
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitPersonTax(values),
    validationSchema,
  });
  const submitPersonTax = (data) => {
    setLoading(true);
    const formatItems = items.map((item, index) => {
      return { ...item, key: index };
    });
    const params = {
      id: item?.id,
      C_GhiChu: data?.ghiChu || "",
      C_ThueSuat: JSON.stringify(formatItems),
      C_HieuLucTuNgay: moment(data?.hieuLucTuNgay || new Date())
        .unix()
        .toString(),
    };
    if (item) {
      dispatch(personTaxService.editPersonTax(params, onSuccess, onError));
    } else {
      dispatch(personTaxService.addPersonTax(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListPersonTax(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.personTaxCreate);
    setLoading(false);
    goBack();
  };
  const onError = (err) => {
    if (!item) {
      const errArr = Object.values(err);
      let mess = "";
      errArr.forEach((element) => {
        mess += element;
      });
      showErrorNotification(mess);
    } else {
      if (err.status !== 204) {
        showErrorNotification(NotiMessageSuccess.personTaxEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.personTaxEdit);
        setOpenDelete(false);
        props.route.params?.callback?.onGetListPersonTax(
          1,
          10,
          null,
          null,
          true
        );
        goBack();
      }
    }

    setLoading(false);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };
  const onSubmitDelete = () => {
    setLoading(true);
    dispatch(
      personTaxService.deletePersonTax(item.id, onSuccessDelete, onErrorDelete)
    );
  };
  const onSuccessDelete = (res) => {
    setLoading(false);
  };
  const onErrorDelete = (err) => {
    setLoading(false);
    if (err.status !== 204) {
      const errArr = Object.values(err);
      let mess = "";
      errArr.forEach((element) => {
        mess += element;
      });
      showErrorNotification(mess);
    } else {
      showSuccessNotification(NotiMessageSuccess.personTaxDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetListPersonTax(1, 10, null, null, true);
      goBack();
    }
  };

  const addItemToList = (data) => {
    setItems((prev) => prev.concat(data));
  };
  const editItemList = (data) => {
    const _dataList = JSON.parse(JSON.stringify(items));
    const newData = _dataList.map((item) =>
      item.key === data.key ? data : item
    );
    setItems(newData);
  };
  const deleteItem = (key) => {
    const _dataList = JSON.parse(JSON.stringify(items));
    const newData = _dataList?.filter((item) => item?.key !== key);
    setItems(newData);
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        (!isEqual(initialValues, formik.values) ||
          (item && !isEqual(JSON.parse(item?.c_ThueSuat), items))) && (
          <ButtonSaveSubmit onPress={formik.handleSubmit} />
        ),
    });
  }, [isEqual(initialValues, formik.values)]);
  useEffect(() => {
    if (!item) return;
    props.navigation.setOptions({
      headerTitle: "Chi tiết thuế thu nhập cá nhân",
    });
    setItems(JSON.parse(item.c_ThueSuat));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.hieuLucTuNgay,
            }}
            mode="date"
            label={"Hiệu lực từ ngày"}
            date={formik.values.hieuLucTuNgay}
            onChangeDate={(e, date) => {
              formik.setFieldValue("hieuLucTuNgay", date);
            }}
            useDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.ghiChu,
              isRequired: true,
            }}
            label={"Ghi chú"}
            input={{
              value: formik.values.ghiChu,
              placeholder: "Ghi chú",
              onChangeText: (val) => formik.handleChange("ghiChu")(val),
              onBlur: formik.handleBlur("ghiChu"),
            }}
            errorMsg={formik.errors.ghiChu}
            touchInput={formik.touched.ghiChu}
            showDivider
          />

          <AddListSection
            listTitle={"Mức thu nhập"}
            icon={
              <Icon
                as={Ionicons}
                color="primary.700"
                size="md"
                name="ios-add-circle"
              />
            }
            addBtnLabel={"Thêm mức thu nhập"}
            onPress={() =>
              navigate(SCREEN_NAME.INCOME_CREATE_SCREEN, {
                callback: { addItemToList },
                itemsIncome: items,
              })
            }
          >
            {items.map((item) => (
              <>
                <Pressable
                  _pressed={{ opacity: 0.3 }}
                  mb="3"
                  onPress={() =>
                    navigate(SCREEN_NAME.INCOME_CREATE_SCREEN, {
                      callback: { editItemList, deleteItem },
                      item,
                      itemsIncome: items,
                    })
                  }
                >
                  <VStack space="3" mt="3">
                    <HStack justifyContent="space-between">
                      <Text bold>Thu nhập trên (VNĐ)</Text>
                      <Text>
                        {Number(item?.c_ThuNhapTren).toLocaleString()}
                      </Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text bold>Thu nhập đến (VNĐ)</Text>
                      <Text>{Number(item?.c_ThuNhapDen).toLocaleString()}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text bold>Thuế suất (%)</Text>
                      <Text>{item?.c_ThueSuatNew}</Text>
                    </HStack>
                  </VStack>
                </Pressable>
                <Divider w="full" />
              </>
            ))}
          </AddListSection>
          {item && (
            <ButtonDelete
              mt="3"
              p="3"
              title="Xóa"
              // isLoading={loading}
              // _disabled={loading}
              isLoadingText={"Đang xóa"}
              onPress={handleDelete}
            />
          )}
          <DeleteAlert
            loading={loading}
            openDelete={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmitDelete={onSubmitDelete}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonTaxCreateScreen;
