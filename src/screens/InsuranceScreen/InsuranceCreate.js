import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import {
  VStack,
  FormControl,
  Radio,
  Box,
  useToast,
  Divider,
} from "native-base";
import * as Yup from "yup";

import TextFieldView from "../../components/CustomForm/TextFieldView";
import TextAreaView from "../../components/CustomForm/TextAreaView";
import { Formik, useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useInsuranceService } from "../../redux/Insurance/Insurance.service";
import { useNotification } from "../../hooks/useNotification";
import { goBack } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";

const InsuranceCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const insuranceService = useInsuranceService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    maBaoHiem: Yup.string().required("Trường này là bắt buộc."),
    tenBaoHiem: Yup.string().required("Trường này là bắt buộc."),
    tienBaoHiem: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maBaoHiem: item?.c_Code || "",
    tenBaoHiem: item?.c_TenBaoHiem || "",
    tienBaoHiem: item?.c_TienBaoHiem || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitInsurance(values),
    validationSchema,
  });
  const submitInsurance = (data) => {
    setLoading(true);
    const params = {
      id: item?.id || "",
      C_TenBaoHiem: data.tenBaoHiem || "",
      C_TienBaoHiem: data.tienBaoHiem || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_Code: _.toUpper(data.maBaoHiem),
    };
    if (item) {
      dispatch(insuranceService.editInsurance(params, onSuccess, onError));
    } else {
      dispatch(insuranceService.addInsurance(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListInsurance(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.InsuranceCreate);
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
        showErrorNotification(NotiMessageSuccess.InsuranceEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.InsuranceEdit);
        setOpenDelete(false);
        props.route.params?.callback?.onGetList(1, 10, null, null, true);
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
      insuranceService.deleteInsurance(item.id, onSuccessDelete, onErrorDelete)
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
      showSuccessNotification(NotiMessageSuccess.InsuranceDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetList(1, 10, null, null, true);
      goBack();
    }
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        !isEqual(initialValues, formik.values) && (
          <ButtonSaveSubmit onPress={formik.handleSubmit} />
        ),
    });
  }, [isEqual(initialValues, formik.values)]);
  useEffect(() => {
    if (!item) return;
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa bảo hiểm" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maBaoHiem,
              isRequired: true,
            }}
            label={"Mã bảo hiểm"}
            input={{
              value: formik.values.maBaoHiem,
              placeholder: "Mã bảo hiểm",
              onChangeText: (val) => formik.handleChange("maBaoHiem")(val),
              onBlur: formik.handleBlur("maBaoHiem"),
            }}
            errorMsg={formik.errors.maBaoHiem}
            touchInput={formik.touched.maBaoHiem}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenBaoHiem,
              isRequired: true,
            }}
            label={"Tên bảo hiểm"}
            input={{
              value: formik.values.tenBaoHiem,
              placeholder: "Tên bảo hiểm",
              onChangeText: (val) => formik.handleChange("tenBaoHiem")(val),
              onBlur: formik.handleBlur("tenBaoHiem"),
            }}
            errorMsg={formik.errors.tenBaoHiem}
            touchInput={formik.touched.tenBaoHiem}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tienBaoHiem,
              isRequired: true,
            }}
            label={"Tiền bảo hiểm"}
            input={{
              value: formik.values.tienBaoHiem,
              placeholder: "Tiền bảo hiểm",
              onChangeText: (val) => formik.handleChange("tienBaoHiem")(val),
              onBlur: formik.handleBlur("tienBaoHiem"),
            }}
            errorMsg={formik.errors.tienBaoHiem}
            touchInput={formik.touched.tienBaoHiem}
            showDivider
          />
          <InputVStack
            formControl={{
              isInvalid: formik.errors.moTa,
            }}
            label={"Mô tả"}
            textArea={{
              value: formik.values.moTa,
              onChangeText: (val) => formik.setFieldValue("moTa", val),
            }}
            errorMsg={formik.errors.moTa}
          />
          <ButtonGroup.Switch
            label={"Trạng thái"}
            _view={{
              p: "0",
              py: "3",
            }}
            _text={{
              color: "grey.900",
              fontWeight: "bold",
            }}
            _switch={{
              isChecked: formik.values.trangThai,
              onToggle: (val) => formik.setFieldValue("trangThai", val),
            }}
          />
          {item && (
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

export default InsuranceCreateScreen;
