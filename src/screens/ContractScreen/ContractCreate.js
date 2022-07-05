import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import {
  VStack,
  Box,
  useToast,
  Button,
  Icon,
  HStack,
  Badge,
  Text,
  Input,
  FormControl,
  Divider,
  Pressable,
} from "native-base";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

import TextFieldView from "../../components/CustomForm/TextFieldView";
import TextAreaView from "../../components/CustomForm/TextAreaView";
import { Formik, useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useContractService } from "../../redux/Contract/contract.service";
import * as DocumentPicker from "expo-document-picker";
import { setListContractItem } from "../../redux/Contract/contract.action";
import { useNotification } from "../../hooks/useNotification";
import { goBack } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";

const ContractCreateScreen = (props) => {
  const { item } = props?.route?.params;
  console.log(item);
  const dispatch = useDispatch();
  const contractService = useContractService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const validationSchema = Yup.object().shape({
    maHopDong: Yup.string().required("Trường này là bắt buộc."),
    tenHopDong: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
    // file: Yup.mixed()
    //   .required("Yêu cầu cung cấp file đính kèm.")
    //   .test(
    //     "type",
    //     "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc",
    //     (value) => {
    //       return (
    //         value &&
    //         (value[0].type === "image/jpeg" ||
    //           value[0].type === "image/bmp" ||
    //           value[0].type === "image/png" ||
    //           value[0].type === "application/pdf" ||
    //           value[0].type === "application/msword")
    //       );
    //     }
    //   )
    //   .test("fileSize", "The file is too large", (value) => {
    //     return value && value[0].size <= 2000000;
    //   }),
    dongBaoHiem: Yup.boolean().required("Trường này là bắt buộc."),
    coPhuCap: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maHopDong: item?.c_Code || "",
    tenHopDong: item?.c_TenLoaiHopDong || "",
    moTa: item?.c_MoTa || "",
    // file: item?.c_FileDinhKem || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
    dongBaoHiem: item?.c_DongBaoHiem === 2 ? true : false,
    coPhuCap: item?.c_CoPhuCap === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitContract(values),
    validationSchema,
  });

  const submitContract = (data) => {
    const params = {
      id: item?.id || "",
      C_TenLoaiHopDong: data.tenHopDong || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_DongBaoHiem: data.dongBaoHiem ? 2 : 1,
      C_CoPhuCap: data.coPhuCap ? 2 : 1,
      // C_FileDinhKem: file.file,
      C_Code: _.toUpper(data.maHopDong),
    };
    if (item) {
      dispatch(contractService.editContract(params, onSuccess, onError));
    } else {
      dispatch(contractService.addContract(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListContract(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.contractCreate);
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
        showErrorNotification(NotiMessageSuccess.contractEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.contractEdit);
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
      contractService.deleteContract(item.id, onSuccessDelete, onErrorDelete)
    );
  };
  const onSuccessDelete = (res) => {
    setLoading(false);
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
      showSuccessNotification(NotiMessageSuccess.contractDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa hợp đồng" });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maHopDong,
              isRequired: true,
            }}
            label={"Mã hợp đồng"}
            input={{
              value: formik.values.maHopDong,
              placeholder: "Mã hợp đồng",
              onChangeText: (val) => formik.handleChange("maHopDong")(val),
              onBlur: formik.handleBlur("maHopDong"),
            }}
            errorMsg={formik.errors.maHopDong}
            touchInput={formik.touched.maHopDong}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenHopDong,
              isRequired: true,
            }}
            label={"Tên hợp đồng"}
            input={{
              value: formik.values.tenHopDong,
              placeholder: "Tên hợp đồng",
              onChangeText: (val) => formik.handleChange("tenHopDong")(val),
              onBlur: formik.handleBlur("tenHopDong"),
            }}
            errorMsg={formik.errors.tenHopDong}
            touchInput={formik.touched.tenHopDong}
            showDivider
          />

          {/* <InputHStack
            formControl={{
              isInvalid: formik.errors.file,
            }}
            label={"File đính kèm"}
            buttonLabel={formik.values.file}
            file={{
              bgColor: "white",
              onPress: () => pickDocument(),
            }}
            errorMsg={formik.errors.file}
            showDivider
          /> */}
          <ButtonGroup.Switch
            label={"Đóng bảo hiểm"}
            _view={{
              p: "0",
              py: "3",
            }}
            _text={{
              color: "grey.900",
              fontWeight: "bold",
            }}
            _switch={{
              isChecked: formik.values.dongBaoHiem,
              onToggle: (val) => formik.setFieldValue("dongBaoHiem", val),
            }}
          />
          <Divider w="full" />
          <ButtonGroup.Switch
            label={"Có phụ cấp"}
            _view={{
              p: "0",
              py: "3",
            }}
            _text={{
              color: "grey.900",
              fontWeight: "bold",
            }}
            _switch={{
              isChecked: formik.values.coPhuCap,
              onToggle: (val) => formik.setFieldValue("coPhuCap", val),
            }}
          />
          <Divider w="full" />
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

export default ContractCreateScreen;
