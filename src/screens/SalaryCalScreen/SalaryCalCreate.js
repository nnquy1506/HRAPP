import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

import { VStack, Divider, HStack, Button, Box, Text } from "native-base";
import * as Yup from "yup";

import { useFormik } from "formik";
import { ButtonDelete } from "../../components/ButtonConfig";
import _, { debounce, isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import InputHStack from "../../components/InputSearch/InputHStack";
import DeleteAlert from "../../components/DeleteComponent";
import { useNotification } from "../../hooks/useNotification";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import moment from "moment";
import { useSalaryCalService } from "../../redux/SalaryCalculation/salaryCal.service";
import SCREEN_NAME from "../../constants/ScreenName";
import { Ionicons } from "@expo/vector-icons";

const SalaryCalCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const salaryCalService = useSalaryCalService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    thangNam: Yup.string().required("Trường này là bắt buộc."),
    tenDotTinhLuong: Yup.string().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    thangNam: item?.c_ThangNam || "",
    ghiChu: item?.c_GhiChu || "",
    tenDotTinhLuong: item?.c_TenDotTinhLuong || "",
    batDau: "",
    ketThuc: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitSalaryCal(values),
    validationSchema,
  });

  const submitSalaryCal = (data) => {
    const startMonth = moment(data.thangNam, "MM/YYYY")
      .startOf("month")
      .unix()
      .toString();
    const endMonth = moment(data.thangNam, "MM/YYYY")
      .endOf("month")
      .unix()
      .toString();
    const params = {
      id: item?.id || "",
      C_TenDotTinhLuong: data.tenDotTinhLuong || "",
      C_GhiChu: data.ghiChu || "",
      C_TuNgay: startMonth,
      C_DenNgay: endMonth,
      C_ThangNam: data?.thangNam || "",
    };
    if (item) {
      dispatch(salaryCalService.editSalaryCal(params, onSuccess, onError));
    } else {
      dispatch(salaryCalService.addSalaryCal(params, onSuccess, onError));
    }
  };

  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListSalaryCal(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.salaryCalCreate);
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
        showErrorNotification(NotiMessageSuccess.salaryCalEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.salaryCalEdit);
        setOpenDelete(false);
        props.route.params?.callback?.onGetListSalaryCal(
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
      salaryCalService.deleteSalaryCal(item.id, onSuccessDelete, onErrorDelete)
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
      showSuccessNotification(NotiMessageSuccess.salaryCalDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetListSalaryCal(1, 10, null, null, true);
      goBack();
    }
  };

  const confirmStatus = (status) => {
    const data = {
      trangThai: status,
      id: item.id,
    };
    dispatch(salaryCalService.statusSalaryCal(data, undefined, onErrorStatus));
  };
  const onErrorStatus = (err) => {
    setLoading(false);
    if (err.status !== 204) {
      const errArr = Object.values(err);
      let mess = "";
      errArr.forEach((element) => {
        mess += element;
      });
      showErrorNotification(mess);
    } else {
      showSuccessNotification(NotiMessageSuccess.salaryCalStatus);
      props.route.params?.callback?.onGetListSalaryCal(1, 10, null, null, true);
      goBack();
    }
  };
  useEffect(() => {
    if ((item && item?.c_TrangThai === 1) || !item) {
      props.navigation.setOptions({
        headerRight: () =>
          !isEqual(initialValues, formik.values) && (
            <ButtonSaveSubmit onPress={formik.handleSubmit} />
          ),
      });
    }
  }, [isEqual(initialValues, formik.values)]);
  useEffect(() => {
    if (!item) return;
    props.navigation.setOptions({ headerTitle: "Chi tiết đợt tính lương" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        {item && (
          <TouchableOpacity
            onPress={() => navigate(SCREEN_NAME.DETAIL_SALARY_SCREEN, { item })}
          >
            <HStack px="3" mb="3" alignItems="center" bgColor="shades.0">
              <Box flex={1} borderColor={"#e5e7eb"}>
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  my={2}
                  py="2"
                >
                  <Text fontSize={"md"} bold>
                    Thông tin chi tiết đợt tính lương
                  </Text>
                  <Box mr={2}>
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Box>
                </HStack>
              </Box>
            </HStack>
          </TouchableOpacity>
        )}

        <Divider />
        <VStack bg="white" p="3" pb="0">
          <Text color="grey.500" mb="1">
            Thông tin cơ bản
          </Text>
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenDotTinhLuong,
              isRequired: true,
            }}
            label={"Tên đợt tính lương"}
            input={{
              value: formik.values.tenDotTinhLuong,
              placeholder: "Tên đợt tính lương",
              onChangeText: (val) =>
                formik.handleChange("tenDotTinhLuong")(val),
              onBlur: formik.handleBlur("tenDotTinhLuong"),
            }}
            errorMsg={formik.errors.tenDotTinhLuong}
            touchInput={formik.touched.tenDotTinhLuong}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.thangNam,
              isRequired: true,
            }}
            label={"Tháng năm"}
            input={{
              value: formik.values.thangNam,
              placeholder: "MM/YYYY",
              onChangeText: (val) => {
                formik.handleChange("thangNam")(val);
              },
              onBlur: formik.handleBlur("thangNam"),
              keyboardType: "numbers-and-punctuation",
              maxLength: 7,
            }}
            errorMsg={formik.errors.thangNam}
            touchInput={formik.touched.thangNam}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.ghiChu,
              isReadOnly: item && item?.c_TrangThai !== 1,
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
          />
          {item && item?.c_TrangThai === 1 && (
            <Button.Group colorScheme="blue" size="md">
              <Button
                w="49%"
                p="3"
                colorScheme="tertiary"
                onPress={() => confirmStatus(2)}
              >
                Duyệt
              </Button>
              <Button
                w="49%"
                p="3"
                colorScheme="amber"
                onPress={() => confirmStatus(3)}
              >
                Hủy
              </Button>
            </Button.Group>
          )}
          {item && item?.c_TrangThai === 1 && (
            <ButtonDelete
              mt="3"
              p="3"
              title="Xóa"
              isLoading={loading}
              _disabled={loading}
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

export default SalaryCalCreateScreen;
