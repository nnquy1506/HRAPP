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
import { SafeAreaView } from "react-native";
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
import { useShiftService } from "../../redux/Shift/shift.service";
import { setListShiftItem } from "../../redux/Shift/shift.action";
import DateTimeView from "../../components/CustomForm/DateTimeView";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Trường này là bắt buộc"),
  moTa: Yup.string(),
  start: Yup.date().nullable().required("Giờ bắt đầu là bắt buộc"),
  end: Yup.date().nullable().required("Giờ kết thúc là bắt buộc"),
});

const ShiftEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, getList } = route.params;
  const toast = useToast();
  const shiftService = useShiftService();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitShift = (data) => {
    setLoading(true);
    const params = {
      id: item.id,
      C_TenCaLam: data.name || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: 1,
      C_BatDau: moment(data.start).format("HH:mm:ss"),
      C_KetThuc: moment(data.end).format("HH:mm:ss"),
      C_Code: _.toUpper(_.snakeCase(_.deburr(data.name))),
    };
    dispatch(shiftService.editShift(params, onSuccessEdit, onErrorEdit));
  };

  const onSuccessEdit = () => {
    setLoading(false);
  };
  const onErrorEdit = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.shiftEdit}
        />
      ),
      placement: "top",
    });
    dispatch(setListShiftItem());
    getList();
    setLoading(false);
    navigation.goBack();
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };
  const onSubmitDelete = () => {
    setLoading(true);
    dispatch(shiftService.deleteShift(item.id, onSuccessDelete, onErrorDelete));
  };

  const onSuccessDelete = () => {
    setLoading(false);
  };
  const onErrorDelete = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.shiftDelete}
        />
      ),
      placement: "top",
    });
    dispatch(setListShiftItem());
    onCloseDelete();
    getList();
    setLoading(false);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <Header navigation={navigation} title={"Ca làm"} isBack />
        <Formik
          initialValues={{
            name: item.c_TenCaLam || "",
            moTa: item.c_MoTa || "",
            start: moment(item.c_BatDau || new Date(), "HH:mm:ss").toDate(),
            end: moment(item.c_KetThuc || new Date(), "HH:mm:ss").toDate(),
          }}
          onSubmit={(values) => submitShift(values)}
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
            const onChangStartTime = (event, date) => {
              setFieldValue("start", date);
            };
            const onChangEndTime = (event, date) => {
              setFieldValue("end", date);
            };
            return (
              <VStack mt={5} px={5}>
                <TextFieldView
                  title="Tên ca làm"
                  placeholder="Tên ca làm"
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
                <HStack justifyContent="space-between" mb="2">
                  <Box>
                    <DateTimeView
                      title="Bắt đầu"
                      value={values.start}
                      mode={"time"}
                      isRequired
                      isInvalid={"start" in errors}
                      display="default"
                      onChange={onChangStartTime}
                    />
                  </Box>
                  <Box>
                    <DateTimeView
                      title="Kết thúc"
                      value={values.end}
                      mode={"time"}
                      isRequired
                      isInvalid={"end" in errors}
                      display="default"
                      onChange={onChangEndTime}
                    />
                  </Box>
                </HStack>
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

export default ShiftEditScreen;
