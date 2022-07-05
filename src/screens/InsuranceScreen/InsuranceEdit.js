import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Box,
  VStack,
  FormControl,
  Radio,
  useToast,
  HStack,
  Button,
} from "native-base";
import * as Yup from "yup";
import _ from "lodash";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import { Formik } from "formik";
import TextFieldView from "../../components/CustomForm/TextFieldView";
import TextAreaView from "../../components/CustomForm/TextAreaView";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import AlertComponent from "../../components/Alert";
import DeleteAlert from "../../components/DeleteComponent";
import { useInsuranceService } from "../../redux/Insurance/Insurance.service";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Trường này là bắt buộc"),
  moTa: Yup.string(),
});

const InsuranceEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, getList } = route.params;
  const toast = useToast();
  const insuranceService = useInsuranceService();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitJobTitle = (data) => {
    setLoading(true);
    const params = {
      id: item.id,
      C_TenBaoHiem: data.name || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: 1,
      C_Code: _.toUpper(_.snakeCase(_.deburr(data.name))),
    };
    dispatch(
      insuranceService.editInsurance(params, onSuccessEdit, onErrorEdit)
    );
  };

  const onSuccessEdit = () => {
    setLoading(false);
  };
  const onErrorEdit = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.InsuranceEdit}
        />
      ),
      placement: "top",
    });
    getList();
    setLoading(false);
    navigation.goBack();
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

  const onSuccessDelete = () => {
    setLoading(false);
  };
  const onErrorDelete = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.InsuranceDelete}
        />
      ),
      placement: "top",
    });
    onCloseDelete();
    getList();
    setLoading(false);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <Header navigation={navigation} title={"chức danh"} isBack />
        <Formik
          initialValues={{
            name: item.c_TenBaoHiem || "",
            moTa: item.c_MoTa || "",
          }}
          onSubmit={(values) => submitJobTitle(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <VStack mt={5} px={5}>
              <TextFieldView
                title="Tên chức danh"
                placeholder="Tên chức danh"
                isRequired
                isInvalid={"name" in errors}
                onChangeText={handleChange("name")}
                value={values.name}
                onBlur={handleBlur("name")}
                errors={errors.name}
              />
              <Box mt={2} />
              <TextAreaView
                title="Mô tả"
                placeholder="Mô tả"
                onChangeText={handleChange("moTa")}
                value={values.moTa}
                onBlur={handleBlur("moTa")}
              />
              <Box mt={2} />

              <HStack space={3} justifyContent="space-between" w="auto">
                <ButtonDelete w="45%" title="Xóa" onPress={handleDelete} />
                <ButtonSave
                  w="45%"
                  title="Lưu"
                  _disabled={loading}
                  isLoading={loading}
                  isLoadingText={"Đang lưu"}
                  onPress={handleSubmit}
                />
              </HStack>
            </VStack>
          )}
        </Formik>
        <DeleteAlert
          loading={loading}
          openDelete={openDelete}
          onClose={onCloseDelete}
          onSubmitDelete={onSubmitDelete}
        />
      </Box>
    </SafeAreaView>
  );
};

export default InsuranceEditScreen;
