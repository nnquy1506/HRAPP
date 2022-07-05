import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  useToast,
  HStack,
  Button,
  FormControl,
  Input,
  Icon,
  Badge,
  Text,
} from "native-base";
import { SafeAreaView } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
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
import { useContractService } from "../../redux/Contract/contract.service";
import { setListContractItem } from "../../redux/Contract/contract.action";
import * as DocumentPicker from "expo-document-picker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Trường này là bắt buộc"),
  moTa: Yup.string(),
  // file: Yup.mixed()
  //   .test(
  //     "type",
  //     "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc",
  //     (value) => {
  //       return (
  //         value &&
  //         (value.type === "image/jpeg" ||
  //           value.type === "image/bmp" ||
  //           value.type === "image/png" ||
  //           value.type === "application/pdf" ||
  //           value.type === "application/msword")
  //       );
  //     }
  //   )
  //   .test("fileSize", "The file is too large", (value) => {
  //     return value && value.size <= 2000000;
  //   }),
});

const ContractEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item, getList } = route.params;
  const toast = useToast();
  const contractService = useContractService();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [file, setFile] = useState({
    name: item.c_FileDinhKem,
    type: "success",
  });

  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitContract = (data) => {
    setLoading(true);
    const params = {
      id: item.id,
      C_TenLoaiHopDong: data.name || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: 1,
      C_FileDinhKem: data.file || {},
      C_Code: _.toUpper(_.snakeCase(_.deburr(data.name))),
    };
    dispatch(contractService.editContract(params, onSuccessEdit, onErrorEdit));
  };

  const onSuccessEdit = () => {
    setLoading(false);
  };
  const onErrorEdit = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.contractEdit}
        />
      ),
      placement: "top",
    });
    dispatch(setListContractItem());
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
      contractService.deleteContract(item.id, onSuccessDelete, onErrorDelete)
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
          title={NotiMessageSuccess.contractDelete}
        />
      ),
      placement: "top",
    });
    dispatch(setListContractItem());
    onCloseDelete();
    getList();
    setLoading(false);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <Header navigation={navigation} title={"Hợp đồng"} isBack />
        <Formik
          initialValues={{
            name: item.c_TenLoaiHopDong || "",
            moTa: item.c_MoTa || "",
            file: item.c_FileDinhKem || "",
          }}
          onSubmit={(values) => submitContract(values)}
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
            const pickDocument = async () => {
              let result = await DocumentPicker.getDocumentAsync({});
              if (result.type === "success") {
                setFile(result);
                setFieldValue("file", result.file);
              }
            };
            return (
              <VStack mt={5} px={5}>
                <TextFieldView
                  title="Tên hợp đồng"
                  placeholder="Tên hợp đồng"
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
                <HStack
                  alignItems="center"
                  mb="2"
                  justifyContent="space-between"
                >
                  <Box>
                    <FormControl isInvalid={"file" in errors}>
                      <Button
                        w="150"
                        colorScheme="secondary"
                        leftIcon={
                          <Icon
                            as={Ionicons}
                            name="cloud-upload-outline"
                            size="sm"
                          />
                        }
                        onPress={pickDocument}
                      >
                        Tải hợp đồng
                      </Button>

                      <Input
                        type="text"
                        value={values.file}
                        display="none"
                        onChangeText={handleChange("file")}
                        onBlur={handleBlur("file")}
                      />
                      <FormControl.ErrorMessage>
                        {errors.file}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    {file?.type === "success" && (
                      <Badge w="150" colorScheme="success" variant="solid">
                        <Text color="white" isTruncated maxW="100">
                          {file.name}
                        </Text>
                      </Badge>
                    )}
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

export default ContractEditScreen;
