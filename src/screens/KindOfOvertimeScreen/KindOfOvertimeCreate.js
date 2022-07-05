import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { VStack, Box, useToast, HStack, Divider } from "native-base";
import * as Yup from "yup";
import moment from "moment";

import TextFieldView from "../../components/CustomForm/TextFieldView";
import { Formik, useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useKindOfOverTimeService } from "../../redux/KindOfOvertime/kindOfOvertime.service";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { setListItem } from "../../redux/KindOfOvertime/kindOfOvertime.action";
import { useNotification } from "../../hooks/useNotification";
import { goBack } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import InputHStack from "../../components/InputSearch/InputHStack";
import DeleteAlert from "../../components/DeleteComponent";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";

const KindOfOverTimeCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const kindOfOverTimeService = useKindOfOverTimeService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    maLoaiTangCa: Yup.string().required("Trường này là bắt buộc."),
    tenLoaiTangCa: Yup.string().required("Trường này là bắt buộc."),
    heSo: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maLoaiTangCa: item?.c_Code || "",
    tenLoaiTangCa: item?.c_LoaiTangCa || "",
    heSo: item?.c_HeSo || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitKindOfOverTime(values),
    validationSchema,
  });
  const submitKindOfOverTime = (data) => {
    setLoading(true);
    const params = {
      id: item?.id || "",
      C_Code: _.toUpper(data.maLoaiTangCa),
      C_LoaiTangCa: data.tenLoaiTangCa || "",
      C_HeSo: data.heSo || "",
      C_TrangThai: data.trangThai ? 2 : 1,
    };
    if (item) {
      dispatch(
        kindOfOverTimeService.editKindOfOverTime(params, onSuccess, onError)
      );
    } else {
      dispatch(
        kindOfOverTimeService.addKindOfOverTime(params, onSuccess, onError)
      );
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListKindOfOvertime(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.kindOfOvertimeCreate);
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
        showErrorNotification(NotiMessageSuccess.kindOfOvertimeEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.kindOfOvertimeEdit);
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
      kindOfOverTimeService.deleteKindOfOverTime(
        item.id,
        onSuccessDelete,
        onErrorDelete
      )
    );
  };
  const onSuccessDelete = (res) => {
    setLoading(false);
    console.log("res", res);
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
      showSuccessNotification(NotiMessageSuccess.kindOfOvertimeDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa loại tăng ca" });
  }, []);
  return (
    <SafeAreaView style={{ flex: "1" }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maLoaiTangCa,
              isRequired: true,
            }}
            label={"Mã loại tăng ca"}
            input={{
              value: formik.values.maLoaiTangCa,
              placeholder: "Mã loại tăng ca",
              onChangeText: (val) => formik.handleChange("maLoaiTangCa")(val),
              onBlur: formik.handleBlur("maLoaiTangCa"),
            }}
            errorMsg={formik.errors.maLoaiTangCa}
            touchInput={formik.touched.maLoaiTangCa}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenLoaiTangCa,
              isRequired: true,
            }}
            label={"Tên loại tăng ca"}
            input={{
              value: formik.values.tenLoaiTangCa,
              placeholder: "Tên loại tăng ca",
              onChangeText: (val) => formik.handleChange("tenLoaiTangCa")(val),
              onBlur: formik.handleBlur("tenLoaiTangCa"),
            }}
            errorMsg={formik.errors.tenLoaiTangCa}
            touchInput={formik.touched.tenLoaiTangCa}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.heSo,
              isRequired: true,
            }}
            label={"Hệ số"}
            input={{
              value: formik.values.heSo,
              placeholder: "Hệ số",
              onChangeText: (val) => formik.handleChange("heSo")(val),
              onBlur: formik.handleBlur("heSo"),
              keyboardType: "number-pad",
            }}
            errorMsg={formik.errors.heSo}
            touchInput={formik.touched.heSo}
            showDivider
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

export default KindOfOverTimeCreateScreen;
