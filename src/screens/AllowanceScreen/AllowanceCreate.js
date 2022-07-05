import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { VStack, FormControl, Radio, Box, useToast, Divider } from "native-base";
import * as Yup from "yup";

import TextFieldView from "../../components/CustomForm/TextFieldView";
import TextAreaView from "../../components/CustomForm/TextAreaView";
import { Formik, useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import { useAllowanceService } from "../../redux/Allowance/allowance.service";
import SCREEN_NAME from "../../constants/ScreenName";
import { navigationUlti } from "../../ultis";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { goBack } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import { useNotification } from "../../hooks/useNotification";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";

const AllowanceCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const allowanceService = useAllowanceService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const validationSchema = Yup.object().shape({
    maPhuCap: Yup.string().required("Trường này là bắt buộc."),
    tenPhuCap: Yup.string().required("Trường này là bắt buộc."),
    giaTri: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maPhuCap: item?.c_Code || "",
    tenPhuCap: item?.c_TenPhuCap || "",
    giaTri: item?.c_GiaTri || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitAllowance(values),
    validationSchema,
  });
  const submitAllowance = (data) => {
    const params = {
      id: item?.id || "",
      C_TenPhuCap: data.tenPhuCap || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_GiaTri: data.giaTri || 1,
      C_MoTa: data.moTa || "",
      C_Code: _.toUpper(data.maPhuCap),
    };
    if (item) {
      dispatch(allowanceService.editAllowance(params, onSuccess, onError));
    } else {
      dispatch(allowanceService.addAllowance(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    console.log("res", res);
    props.route.params?.callback?.onGetListAllowance(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.AllowanceCreate);
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
        showErrorNotification(NotiMessageSuccess.AllowanceEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.AllowanceEdit);
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
      allowanceService.deleteAllowance(item.id, onSuccessDelete, onErrorDelete)
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
      showSuccessNotification(NotiMessageSuccess.AllowanceDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa phụ cấp" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maPhuCap,
              isRequired: true,
            }}
            label={"Mã phụ cấp"}
            input={{
              value: formik.values.maPhuCap,
              placeholder: "Mã phụ cấp",
              onChangeText: (val) => formik.handleChange("maPhuCap")(val),
              onBlur: formik.handleBlur("maPhuCap"),
            }}
            errorMsg={formik.errors.maPhuCap}
            touchInput={formik.touched.maPhuCap}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenPhuCap,
              isRequired: true,
            }}
            label={"Tên phụ cấp"}
            input={{
              value: formik.values.tenPhuCap,
              placeholder: "Tên phụ cấp",
              onChangeText: (val) => formik.handleChange("tenPhuCap")(val),
              onBlur: formik.handleBlur("tenPhuCap"),
            }}
            errorMsg={formik.errors.tenPhuCap}
            touchInput={formik.touched.tenPhuCap}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.giaTri,
              isRequired: true,
            }}
            label={"Giá trị"}
            input={{
              value: formik.values.giaTri,
              placeholder: "Giá trị",
              onChangeText: (val) => formik.handleChange("giaTri")(val),
              onBlur: formik.handleBlur("giaTri"),
            }}
            errorMsg={formik.errors.giaTri}
            touchInput={formik.touched.giaTri}
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

export default AllowanceCreateScreen;
