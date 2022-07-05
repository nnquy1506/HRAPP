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
import { SafeAreaView, ScrollView } from "react-native";
import * as Yup from "yup";
import _ from "lodash";
import { useAllowanceService } from "../../redux/Allowance/allowance.service";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import TextFieldView from "../../components/CustomForm/TextFieldView";
import TextAreaView from "../../components/CustomForm/TextAreaView";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import AlertComponent from "../../components/Alert";
import DeleteAlert from "../../components/DeleteComponent";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Trường này là bắt buộc"),
  moTa: Yup.string(),
  loaiGiaTri: Yup.boolean().required("Trường này là bắt buộc"),
});

const AllowanceEdit = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, getList } = route.params;
  const toast = useToast();
  const allowanceService = useAllowanceService();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitAllowance = (data) => {
    setLoading(true);
    const params = {
      id: item.id,
      C_TenPhuCap: data.name || "",
      C_MoTa: data.moTa || "",
      C_GiaTri: data.loaiGiaTri === true ? 1 : 2,
      C_TrangThai: 1,
      C_Code: _.toUpper(_.snakeCase(_.deburr(data.name))),
    };
    dispatch(
      allowanceService.editAllowance(params, onSuccessEdit, onErrorEdit)
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
          title={NotiMessageSuccess.AllowanceEdit}
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
      allowanceService.deleteAllowance(item.id, onSuccessDelete, onErrorDelete)
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
          title={NotiMessageSuccess.AllowanceDelete}
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
      <ScrollView>
        <VStack>
          <Formik
            initialValues={{
              name: item.c_TenPhuCap || "",
              moTa: item.c_MoTa || "",
              loaiGiaTri: item.c_GiaTri === 1 ? true : false,
            }}
            onSubmit={(values) => submitAllowance(values)}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <VStack mt={5} px={5}>
                <TextFieldView
                  title="Tên loại phụ cấp"
                  placeholder="Tên loại phụ cấp"
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
                <FormControl isRequired isInvalid={"loaiGiaTri" in errors}>
                  <FormControl.Label>Loại giá trị</FormControl.Label>
                  <Radio.Group
                    defaultValue={values.loaiGiaTri}
                    name="loaiGiaTri"
                  >
                    <Radio value={true} my={1}>
                      Cố định
                    </Radio>
                    <Radio value={false} my={1}>
                      Không cố định
                    </Radio>
                  </Radio.Group>
                  <FormControl.ErrorMessage>
                    {errors.loaiGiaTri}
                  </FormControl.ErrorMessage>
                </FormControl>

                <HStack space={3} justifyContent="space-between" w="auto">
                  <ButtonDelete
                    w="45%"
                    title="Xóa"
                    isLoading={loading}
                    _disabled={loading}
                    isLoadingText={"Đang xóa"}
                    onPress={handleDelete}
                  />
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
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllowanceEdit;
