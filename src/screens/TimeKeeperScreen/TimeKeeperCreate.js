import React, { useEffect, useState } from "react";

import {
  VStack,
  FormControl,
  Radio,
  Box,
  useToast,
  Divider,
} from "native-base";
import { SafeAreaView, ScrollView } from "react-native";
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
import { useTimeKeeperService } from "../../redux/TimeKeeper/timeKeeper.service";
import { useNotification } from "../../hooks/useNotification";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import { goBack } from "../../ultis/navigationHelpers";

const TimeKeeperCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();

  const timeKeeperService = useTimeKeeperService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const validationSchema = Yup.object().shape({
    maMayChamCong: Yup.string().required("Trường này là bắt buộc."),
    tenMayChamCong: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maMayChamCong: item?.c_Code || "",
    tenMayChamCong: item?.c_TenMayChamCong || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitTimeKeeper(values),
    validationSchema,
  });
  const submitTimeKeeper = (data) => {
    const params = {
      id: item?.id || "",
      C_TenMayChamCong: data.tenMayChamCong || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_MoTa: data.moTa || "",
      C_Code: _.toUpper(data.maMayChamCong),
    };
    if (item) {
      dispatch(timeKeeperService.editTimeKeeper(params, onSuccess, onError));
    } else {
      dispatch(timeKeeperService.addTimeKeeper(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListTimeKeeper(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.timeKeeperCreate);
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
        showErrorNotification(NotiMessageSuccess.timeKeeperEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.timeKeeperEdit);
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
      timeKeeperService.deleteTimeKeeper(
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
      showSuccessNotification(NotiMessageSuccess.timeKeeperDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa máy chấm công" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maMayChamCong,
              isRequired: true,
            }}
            label={"Mã máy chấm công"}
            input={{
              value: formik.values.maMayChamCong,
              placeholder: "Mã máy chấm công",
              onChangeText: (val) => formik.handleChange("maMayChamCong")(val),
              onBlur: formik.handleBlur("maMayChamCong"),
            }}
            errorMsg={formik.errors.maMayChamCong}
            touchInput={formik.touched.maMayChamCong}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenMayChamCong,
              isRequired: true,
            }}
            label={"Tên máy chấm công"}
            input={{
              value: formik.values.tenMayChamCong,
              placeholder: "Tên máy chấm công",
              onChangeText: (val) => formik.handleChange("tenMayChamCong")(val),
              onBlur: formik.handleBlur("tenMayChamCong"),
            }}
            errorMsg={formik.errors.tenMayChamCong}
            touchInput={formik.touched.tenMayChamCong}
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

export default TimeKeeperCreateScreen;
