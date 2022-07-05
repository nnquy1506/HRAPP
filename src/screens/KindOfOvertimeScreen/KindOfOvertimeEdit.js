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
import { useKindOfOverTimeService } from "../../redux/KindOfOvertime/kindOfOvertime.service";
import { setListItem } from "../../redux/KindOfOvertime/kindOfOvertime.action";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { SafeAreaView } from "react-native";

const validationSchema = Yup.object().shape({
  tenMa: Yup.string().required("Trường này là bắt buộc"),
  loaiTangCa: Yup.string().required("Trường này là bắt buộc"),
  heSo: Yup.string().required("Trường này là bắt buộc"),
});

const KindOfOvertimeEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, getList } = route.params;
  const toast = useToast();
  const kindOfOvertimeService = useKindOfOverTimeService();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  console.log(item);
  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitKindOfOvertime = (data) => {
    setLoading(true);
    const params = {
      id: item.id,
      C_Code: data.tenMa || item.c_Code,
      C_LoaiTangCa: data.loaiTangCa || item.c_LoaiTangCa,
      C_HeSo: data.heSo || item.c_HeSo,
      C_TrangThai: 1,
    };
    dispatch(
      kindOfOvertimeService.editKindOfOverTime(
        params,
        onSuccessEdit,
        onErrorEdit
      )
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
          title={NotiMessageSuccess.kindOfOvertimeEdit}
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
      kindOfOvertimeService.deleteKindOfOverTime(
        item.id,
        onSuccessDelete,
        onErrorDelete
      )
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
          title={NotiMessageSuccess.kindOfOvertimeDelete}
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
        <Header navigation={navigation} title={"Loại tăng ca"} isBack />
        <Formik
          initialValues={{
            tenMa: item.c_Code,
            loaiTangCa: item.c_LoaiTangCa,
            heSo: item.c_HeSo,
          }}
          onSubmit={(values) => submitKindOfOvertime(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            return (
              <VStack mt={5} px={5}>
                <TextFieldView
                  title="Tên mã"
                  placeholder="Tên mã"
                  isRequired
                  isInvalid={"tenMa" in errors}
                  onChangeText={handleChange("tenMa")}
                  value={values.tenMa}
                  onBlur={handleBlur("tenMa")}
                  errors={errors.tenMa}
                />
                <Box mt={2} />
                <TextFieldView
                  title="Loại tăng ca"
                  placeholder="Loại tăng ca"
                  isRequired
                  isInvalid={"loaiTangCa" in errors}
                  onChangeText={handleChange("loaiTangCa")}
                  value={values.loaiTangCa}
                  onBlur={handleBlur("loaiTangCa")}
                  errors={errors.loaiTangCa}
                />
                <Box mt={2} />
                <TextFieldView
                  title="Hệ số"
                  placeholder="Hệ số"
                  isRequired
                  isInvalid={"heSo" in errors}
                  onChangeText={handleChange("heSo")}
                  value={values.heSo}
                  onBlur={handleBlur("heSo")}
                  errors={errors.heSo}
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

export default KindOfOvertimeEditScreen;
