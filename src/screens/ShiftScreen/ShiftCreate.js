import React, { useEffect, useState } from "react";

import { VStack, Box, useToast, HStack, Divider } from "native-base";
import { SafeAreaView, ScrollView } from "react-native";
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
import { useShiftService } from "../../redux/Shift/shift.service";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { setListShiftItem } from "../../redux/Shift/shift.action";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";
import { useNotification } from "../../hooks/useNotification";
import DatePickerField from "../../components/DatePickerField";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
const ShiftCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const shiftService = useShiftService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const validationSchema = Yup.object().shape({
    maCaLam: Yup.string().required("Trường này là bắt buộc."),
    tenCaLam: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
    batDau: Yup.date().nullable().required("Giờ bắt đầu là bắt buộc"),
    ketThuc: Yup.date().nullable().required("Giờ kết thúc là bắt buộc"),
  });
  const initialValues = {
    maCaLam: item?.c_Code || "",
    tenCaLam: item?.c_TenCaLam || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
    batDau:
      moment(item.c_BatDau || new Date(), "HH:mm:ss").toDate() || new Date(),
    ketThuc:
      moment(item.c_KetThuc || new Date(), "HH:mm:ss").toDate() || new Date(),
    soCong: item?.c_SoCong?.toString() || 1,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitShift(values),
    validationSchema,
  });
  const submitShift = (data) => {
    const params = {
      id: item?.id || "",
      C_TenCaLam: data.tenCaLam || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_BatDau: moment(data.batDau).format("HH:mm:ss"),
      C_KetThuc: moment(data.ketThuc).format("HH:mm:ss"),
      C_Code: _.toUpper(data.maCaLam),
      C_SoCong: data.soCong,
    };
    if (item) {
      dispatch(shiftService.editShift(params, onSuccess, onError));
    } else {
      dispatch(shiftService.addShift(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    console.log("res", res);
    props.route.params?.callback?.onGetListShift(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.JobTitleCreate);
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
        showErrorNotification(NotiMessageSuccess.JobTitleEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.JobTitleEdit);
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
    dispatch(shiftService.deleteShift(item.id, onSuccessDelete, onErrorDelete));
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
      showSuccessNotification(NotiMessageSuccess.JobTitleDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetList(1, 10, null, null, true);
      goBack();
    }
  };
  useEffect(() => {
    if (!item) return;
    props.navigation.setOptions({ headerTitle: "Chi tiết ca làm" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isReadOnly: true,
              isInvalid: formik.errors.maCaLam,
            }}
            label={"Mã ca làm"}
            input={{
              value: formik.values.maCaLam,
              placeholder: "Mã ca làm",
              onChangeText: (val) => formik.handleChange("maCaLam")(val),
              onBlur: formik.handleBlur("maCaLam"),
            }}
            errorMsg={formik.errors.maCaLam}
            touchInput={formik.touched.maCaLam}
            showDivider
          />
          <InputHStack
            formControl={{
              isReadOnly: true,
              isInvalid: formik.errors.tenCaLam,
            }}
            label={"Tên ca làm"}
            input={{
              value: formik.values.tenCaLam,
              placeholder: "Tên ca làm",
              onChangeText: (val) => formik.handleChange("tenCaLam")(val),
              onBlur: formik.handleBlur("tenCaLam"),
            }}
            errorMsg={formik.errors.tenCaLam}
            touchInput={formik.touched.tenCaLam}
            showDivider
          />
          <DatePickerField
            formControl={{
              isReadOnly: true,
              isInvalid: formik.errors.batDau,
            }}
            mode="time"
            label={"Giờ bắt đầu"}
            date={formik.values.batDau}
            onChangeDate={(e, date) => {
              formik.setFieldValue("batDau", date);
            }}
            _datePicker={{ disabled: true }}
            useDivider
          />
          <DatePickerField
            formControl={{
              isReadOnly: true,
              isInvalid: formik.errors.ketThuc,
            }}
            mode="time"
            label={"Giờ kết thúc"}
            date={formik.values.ketThuc}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ketThuc", date);
            }}
            _datePicker={{ disabled: true }}
            useDivider
          />
          <InputHStack
            formControl={{
              isReadOnly: true,
              isInvalid: formik.errors.soCong,
            }}
            label={"Số công"}
            input={{
              value: formik.values.soCong,
              placeholder: "Số công",
              onChangeText: (val) => formik.handleChange("soCong")(val),
              onBlur: formik.handleBlur("soCong"),
            }}
            errorMsg={formik.errors.soCong}
            touchInput={formik.touched.soCong}
            showDivider
          />
          <InputVStack
            formControl={{
              isReadOnly: true,
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
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShiftCreateScreen;
