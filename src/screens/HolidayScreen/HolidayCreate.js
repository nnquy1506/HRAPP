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
import { useHolidayService } from "../../redux/Holiday/holiday.service";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { setListHolidayItem } from "../../redux/Holiday/holiday.action";
import { useNotification } from "../../hooks/useNotification";
import { goBack } from "../../ultis/navigationHelpers";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import DatePickerField from "../../components/DatePickerField";

const HolidayCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const holidayService = useHolidayService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const validationSchema = Yup.object().shape({
    maNgayNghi: Yup.string().required("Trường này là bắt buộc."),
    tenNgayNghi: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
    batDau: Yup.date().nullable().required("Giờ bắt đầu là bắt buộc"),
    ketThuc: Yup.date().nullable().required("Giờ kết thúc là bắt buộc"),
  });
  const initialValues = {
    maNgayNghi: item?.c_Code || "",
    tenNgayNghi: item?.c_TenNgayNghi || "",
    moTa: item?.c_MoTa || "",
    batDau:
      moment(item?.c_TuNgay || new Date(), "DD/MM/YYYY").toDate() || new Date(),
    ketThuc:
      moment(item?.c_DenNgay || new Date(), "DD/MM/YYYY").toDate() ||
      new Date(),
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitHoliday(values),
    validationSchema,
  });
  const submitHoliday = (data) => {
    setLoading(true);
    const params = {
      id: item?.id || "",
      C_TenNgayNghi: data.tenNgayNghi || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_TuNgay: moment(data.batDau).format("DD/MM/YYYY"),
      C_DenNgay: moment(data.ketThuc).format("DD/MM/YYYY"),
      C_Code: _.toUpper(data.maNgayNghi),
    };
    if (item) {
      dispatch(holidayService.editHoliday(params, onSuccess, onError));
    } else {
      dispatch(holidayService.addHoliday(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListHoliday(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.holidayCreate);
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
        showErrorNotification(NotiMessageSuccess.holidayEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.holidayEdit);
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
      holidayService.deleteHoliday(item.id, onSuccessDelete, onErrorDelete)
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
      showSuccessNotification(NotiMessageSuccess.holidayDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa ngày nghỉ" });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maNgayNghi,
              isRequired: true,
            }}
            label={"Mã ngày nghỉ"}
            input={{
              value: formik.values.maNgayNghi,
              placeholder: "Mã ngày nghỉ",
              onChangeText: (val) => formik.handleChange("maNgayNghi")(val),
              onBlur: formik.handleBlur("maNgayNghi"),
            }}
            errorMsg={formik.errors.maNgayNghi}
            touchInput={formik.touched.maNgayNghi}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenNgayNghi,
              isRequired: true,
            }}
            label={"Tên ngày nghỉ"}
            input={{
              value: formik.values.tenNgayNghi,
              placeholder: "Tên ngày nghỉ",
              onChangeText: (val) => formik.handleChange("tenNgayNghi")(val),
              onBlur: formik.handleBlur("tenNgayNghi"),
            }}
            errorMsg={formik.errors.tenNgayNghi}
            touchInput={formik.touched.tenNgayNghi}
            showDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.batDau,
              isRequired: true,
            }}
            mode="date"
            label={"Nghỉ từ ngày"}
            date={formik.values.batDau}
            onChangeDate={(e, date) => {
              formik.setFieldValue("batDau", date);
            }}
            useDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.ketThuc,
              isRequired: true,
            }}
            mode="date"
            label={"Nghỉ đến ngày"}
            date={formik.values.ketThuc}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ketThuc", date);
            }}
            useDivider
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

export default HolidayCreateScreen;
