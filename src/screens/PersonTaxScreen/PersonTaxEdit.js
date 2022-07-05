import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  Radio,
  useToast,
  HStack,
  Button,
} from "native-base";
import moment from "moment";
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
import { usePersonTaxService } from "../../redux/PersonTax/personTax.service";
import { setListItem } from "../../redux/PersonTax/personTax.action";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { SafeAreaView } from "react-native";

const validationSchema = Yup.object().shape({
  thueSuat: Yup.string().nullable().required("Trường này là bắt buộc"),
  ghiChu: Yup.string(),
  hieuLucTuNgay: Yup.date().nullable().required("Trường này là bắt buộc"),
});

const PersonTaxEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, getList } = route.params;
  const toast = useToast();
  const personTaxService = usePersonTaxService();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitPersonTax = (data) => {
    setLoading(true);
    const params = {
      id: item.id,
      C_GhiChu: data.name || item.c_GhiChu,
      C_ThueSuat: data.thueSuat || item.c_ThueSuat,
      C_HieuLucTuNgay: moment(data.hieuLucTuNgay).format("DD/MM/YYYY"),
    };
    dispatch(
      personTaxService.editPersonTax(params, onSuccessEdit, onErrorEdit)
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
          title={NotiMessageSuccess.personTaxEdit}
        />
      ),
      placement: "top",
    });
    dispatch(setListItem());
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
      personTaxService.deletePersonTax(item.id, onSuccessDelete, onErrorDelete)
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
          title={NotiMessageSuccess.personTaxDelete}
        />
      ),
      placement: "top",
    });
    dispatch(setListItem());
    onCloseDelete();
    getList();
    setLoading(false);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <Header
          navigation={navigation}
          title={"Thuế thu nhập cá nhân"}
          isBack
        />
        <Formik
          initialValues={{
            thueSuat: item.c_ThueSuat || "",
            ghiChu: item.c_GhiChu || "",
            hieuLucTuNgay: moment(item.c_HieuLucTuNgay || new Date()).toDate(),
          }}
          onSubmit={(values) => submitPersonTax(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => {
            const onChangDate = (event, date) => {
              setFieldValue("hieuLucTuNgay", date);
            };
            return (
              <VStack mt={5} px={5}>
                <HStack justifyContent="space-between" mb="2">
                  <DateTimeView
                    title="Hiệu lực từ ngày"
                    value={values.hieuLucTuNgay}
                    mode={"date"}
                    isRequired
                    isInvalid={"hieuLucTuNgay" in errors}
                    display="default"
                    onChange={onChangDate}
                  />
                </HStack>
                <Box mt={2} />
                <TextFieldView
                  title="Thuế suất"
                  placeholder="Thuế suất"
                  isRequired
                  isInvalid={"thueSuat" in errors}
                  onChangeText={handleChange("thueSuat")}
                  value={values.thueSuat}
                  onBlur={handleBlur("thueSuat")}
                  errors={errors.thueSuat}
                />
                <Box mt={2} />
                <TextFieldView
                  title="Ghi chú"
                  placeholder="Ghi chú"
                  onChangeText={handleChange("ghiChu")}
                  value={values.ghiChu}
                  onBlur={handleBlur("ghiChu")}
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
            );
          }}
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

export default PersonTaxEditScreen;
