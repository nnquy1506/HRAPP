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
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useContractService } from "../../redux/Contract/contract.service";
import * as DocumentPicker from "expo-document-picker";
import { setListContractItem } from "../../redux/Contract/contract.action";
import { useNotification } from "../../hooks/useNotification";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import InputHStack from "../../components/InputSearch/InputHStack";
import InputVStack from "../../components/InputSearch/InputVStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import DeleteAlert from "../../components/DeleteComponent";
import moment from "moment";
import SCREEN_NAME from "../../constants/ScreenName";
import DatePickerField from "../../components/DatePickerField";

const ContractDetailCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const { nguoiDung } = props?.route?.params;
  console.log("nguoiDung", nguoiDung);
  console.log("item", item);
  const dispatch = useDispatch();
  const contractService = useContractService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const employeeList = useSelector((state) => state.employee.employeeList);
  const contractList = useSelector((state) => state.contract.contractList);
  const validationSchema = Yup.object().shape({
    tenNV: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    nguoiDaiDien: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    hopDong: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    mucLuongCoBan: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    diaDiemLamViec: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    tuNgay: Yup.date().required("Tr?????ng n??y l?? b???t bu???c."),
    denNgay: Yup.date()
      .min(Yup.ref("tuNgay"), "Ph???i l???n h??n t??? ng??y")
      .required("Tr?????ng n??y l?? b???t bu???c."),
    ngayLap: Yup.date().required("Tr?????ng n??y l?? b???t bu???c."),
  });
  const initialValues = {
    tenNV: nguoiDung?.c_HoVaTen,
    nguoiDaiDien: item?.fk_NguoiDaiDien || "",
    hopDong: item?.fk_LoaiHopDong || "",
    mucLuongCoBan: item?.c_MucLuongCoBan || "",
    diaDiemLamViec: item?.c_DiaDiemLamViec || "",
    tuNgay: moment(item?.c_TuNgay || new Date()).toDate(),
    denNgay: moment(item?.c_DenNgay || new Date()).toDate(),
    ngayLap: moment(item?.c_NgayLap || new Date()).toDate(),
    ghiChu: item?.c_GhiChu || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitContract(values),
    validationSchema,
  });

  const submitContract = (data) => {
    const params = {
      id: item?.id || "",
      C_MucLuongCoBan: data.mucLuongCoBan || "",
      C_GhiChu: data.ghiChu || "",
      C_DiaDiemLamViec: data.diaDiemLamViec,
      C_NgayLap: moment(data.ngayLap).toISOString(),
      C_TuNgay: moment(data.tuNgay).toISOString(),
      C_DenNgay: moment(data.denNgay).toISOString(),
      C_TrangThai: data?.trangThai ? 2 : 1,
      Fk_NguoiDaiDien: data?.nguoiDaiDien,
      Fk_NguoiDung: nguoiDung.id,
      Fk_LoaiHopDong: data?.hopDong,
    };
    if (item) {
      dispatch(contractService.editContractDetail(params, onSuccess, onError));
    } else {
      dispatch(contractService.addContractDetail(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListContractDetail(
      1,
      10,
      null,
      null,
      true
    );
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
        props.route.params?.callback?.onGetListContractDetail(
          1,
          10,
          null,
          null,
          true
        );
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
      contractService.deleteContractDetail(
        item.id,
        onSuccessDelete,
        onErrorDelete
      )
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
      props.route.params?.callback?.onGetListContractDetail(
        1,
        10,
        null,
        null,
        true
      );
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
    props.navigation.setOptions({ headerTitle: "Ch???nh s???a h???p ?????ng" });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenNV,
              isReadOnly: true,
            }}
            label={"T??n nh??n vi??n"}
            input={{
              value: formik.values.tenNV,
            }}
            showDivider
          />
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.EMPLOYEE_PICK_SCREEN, {
                initValue: formik.values.nguoiDaiDien,
                pick: (val) => formik.setFieldValue("nguoiDaiDien", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.nguoiDaiDien,
              }}
              label={"Ng?????i ?????i di???n"}
              buttonLabel={
                employeeList?.find(
                  (employ) => employ.id === formik.values.nguoiDaiDien
                )?.c_HoVaTen
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.EMPLOYEE_PICK_SCREEN, {
                    initValue: formik.values.nguoiDaiDien,
                    pick: (val) => formik.setFieldValue("nguoiDaiDien", val),
                  }),
              }}
              errorMsg={formik.errors.nguoiDaiDien}
              showDivider
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.CONTRACT_SCREEN, {
                initValue: formik.values.hopDong,
                callback: (val) => formik.setFieldValue("hopDong", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.hopDong,
              }}
              label={"H???p ?????ng"}
              buttonLabel={
                contractList?.find((ct) => ct.id === formik.values.hopDong)
                  ?.c_TenLoaiHopDong
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.CONTRACT_SCREEN, {
                    initValue: formik.values.hopDong,
                    callback: (val) => formik.setFieldValue("hopDong", val),
                  }),
              }}
              errorMsg={formik.errors.hopDong}
              showDivider
            />
          </Pressable>
          <InputHStack
            formControl={{
              isInvalid: formik.errors.mucLuongCoBan,
              isRequired: true,
            }}
            label={"M???c l????ng c?? b???n"}
            input={{
              value: formik.values.mucLuongCoBan,
              placeholder: "M???c l????ng c?? b???n",
              onChangeText: (val) => formik.handleChange("mucLuongCoBan")(val),
              onBlur: formik.handleBlur("mucLuongCoBan"),
            }}
            errorMsg={formik.errors.mucLuongCoBan}
            touchInput={formik.touched.mucLuongCoBan}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.diaDiemLamViec,
              isRequired: true,
            }}
            label={"?????a ??i???m l??m vi???c"}
            input={{
              value: formik.values.diaDiemLamViec,
              placeholder: "?????a ??i???m l??m vi???c",
              onChangeText: (val) => formik.handleChange("diaDiemLamViec")(val),
              onBlur: formik.handleBlur("diaDiemLamViec"),
            }}
            errorMsg={formik.errors.diaDiemLamViec}
            touchInput={formik.touched.diaDiemLamViec}
            showDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.tuNgay,
              isRequired: true,
            }}
            mode="date"
            label={"T??? ng??y"}
            date={formik.values.tuNgay}
            onChangeDate={(e, date) => {
              formik.setFieldValue("tuNgay", date);
            }}
            useDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.denNgay,
              isRequired: true,
            }}
            mode="date"
            label={"?????n ng??y"}
            date={formik.values.denNgay}
            onChangeDate={(e, date) => {
              formik.setFieldValue("denNgay", date);
            }}
            useDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.ngayLap,
              isRequired: true,
            }}
            mode="date"
            label={"Ng??y l???p"}
            date={formik.values.ngayLap}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ngayLap", date);
            }}
            useDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.ghiChu,
            }}
            label={"Ghi ch??"}
            input={{
              value: formik.values.ghiChu,
              placeholder: "Ghi ch??",
              onChangeText: (val) => formik.handleChange("ghiChu")(val),
              onBlur: formik.handleBlur("ghiChu"),
            }}
            errorMsg={formik.errors.ghiChu}
            touchInput={formik.touched.ghiChu}
          />
          <ButtonGroup.Switch
            label={"Tr???ng th??i"}
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
              title="X??a"
              isLoading={loading}
              _disabled={loading}
              isLoadingText={"??ang x??a"}
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

export default ContractDetailCreateScreen;
