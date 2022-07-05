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
import { useLevelService } from "../../redux/Level/level.service";
import { setListLevelItem } from "../../redux/Level/level.action";
import { useNotification } from "../../hooks/useNotification";
import { goBack } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";

const LevelCreateScreen = (props) => {
  const dispatch = useDispatch();
  const { item } = props?.route?.params;
  const levelService = useLevelService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    maTrinhDo: Yup.string().required("Trường này là bắt buộc."),
    tenTrinhDo: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maTrinhDo: item?.c_Code || "",
    tenTrinhDo: item?.c_TenTrinhDo || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitLevel(values),
    validationSchema,
  });
  const submitLevel = (data) => {
    setLoading(true);
    const params = {
      id: item?.id || "",
      C_TenTrinhDo: data.tenTrinhDo || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_MoTa: data.moTa || "",
      C_Code: _.toUpper(data.maTrinhDo),
    };
    if (item) {
      dispatch(levelService.editLevel(params, onSuccess, onError));
    } else {
      dispatch(levelService.addLevel(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    console.log("res", res);
    props.route.params?.callback?.onGetListLevel(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.levelCreate);
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
        showErrorNotification(NotiMessageSuccess.levelEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.levelEdit);
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
    dispatch(levelService.deleteLevel(item.id, onSuccessDelete, onErrorDelete));
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
      showSuccessNotification(NotiMessageSuccess.levelDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa trình độ" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maTrinhDo,
              isRequired: true,
            }}
            label={"Mã trình độ"}
            input={{
              value: formik.values.maTrinhDo,
              placeholder: "Mã trình độ",
              onChangeText: (val) => formik.handleChange("maTrinhDo")(val),
              onBlur: formik.handleBlur("maTrinhDo"),
            }}
            errorMsg={formik.errors.maTrinhDo}
            touchInput={formik.touched.maTrinhDo}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenTrinhDo,
              isRequired: true,
            }}
            label={"Tên trình độ"}
            input={{
              value: formik.values.tenTrinhDo,
              placeholder: "Tên trình độ",
              onChangeText: (val) => formik.handleChange("tenTrinhDo")(val),
              onBlur: formik.handleBlur("tenTrinhDo"),
            }}
            errorMsg={formik.errors.tenTrinhDo}
            touchInput={formik.touched.tenTrinhDo}
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

export default LevelCreateScreen;
