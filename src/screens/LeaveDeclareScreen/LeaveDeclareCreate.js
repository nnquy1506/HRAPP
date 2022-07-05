import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { VStack, Divider, HStack, Button } from "native-base";
import * as Yup from "yup";

import { useFormik } from "formik";
import { ButtonDelete } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import InputHStack from "../../components/InputSearch/InputHStack";
import DeleteAlert from "../../components/DeleteComponent";
import { useNotification } from "../../hooks/useNotification";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import { goBack } from "../../ultis/navigationHelpers";
import DatePickerField from "../../components/DatePickerField";
import moment from "moment";
import { useLeaveDeclareService } from "../../redux/LeaveDeclare/leaveDeclare.service";

const LeaveDeclareCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const leaveDeclareService = useLeaveDeclareService();
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    ngayNghi: Yup.date().nullable().required("Giờ bắt đầu là bắt buộc"),
  });
  const initialValues = {
    ngayNghi: moment
      .unix(Number(item?.c_NgayNghiPhep) || moment().unix())
      .toDate(),
    ghiChu: item?.c_GhiChu || "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitleaveDeclare(values),
    validationSchema,
  });

  const submitleaveDeclare = (data) => {
    // setLoading(true);
    const params = {
      id: item?.id || "",
      C_GhiChu: data.ghiChu || "",
      C_NgayNghiPhep: moment(data?.ngayNghi || new Date())
        .unix()
        .toString(),
      Fk_NguoiDung: currentUser.id,
    };
    if (item) {
      dispatch(
        leaveDeclareService.editLeaveDeclare(params, onSuccess, onError)
      );
    } else {
      dispatch(leaveDeclareService.addLeaveDeclare(params, onSuccess, onError));
    }
  };

  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListLeaveDeclare(
      1,
      10,
      null,
      null,
      true
    );
    showSuccessNotification(NotiMessageSuccess.leaveDeclareCreate);
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
        showErrorNotification(NotiMessageSuccess.leaveDeclareEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.leaveDeclareEdit);
        setOpenDelete(false);
        props.route.params?.callback?.onGetListLeaveDeclare(
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
      leaveDeclareService.deleteLeaveDeclare(
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
      showSuccessNotification(NotiMessageSuccess.leaveDeclareDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetListLeaveDeclare(
        1,
        10,
        null,
        null,
        true
      );
      goBack();
    }
  };

  const confirmStatus = (status) => {
    const data = {
      trangThai: status,
      id: item.id,
    };
    dispatch(
      leaveDeclareService.statusLeaveDeclare(data, undefined, onErrorStatus)
    );
  };
  const onErrorStatus = (err) => {
    setLoading(false);
    if (err.status !== 204) {
      const errArr = Object.values(err);
      let mess = "";
      errArr.forEach((element) => {
        mess += element;
      });
      showErrorNotification(mess);
    } else {
      showSuccessNotification(NotiMessageSuccess.leaveDeclareStatus);
      props.route.params?.callback?.onGetListLeaveDeclare(
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
    if ((item && item?.c_TrangThai === 1) || !item) {
      props.navigation.setOptions({
        headerRight: () =>
          !isEqual(initialValues, formik.values) && (
            <ButtonSaveSubmit onPress={formik.handleSubmit} />
          ),
      });
    }
  }, [isEqual(initialValues, formik.values)]);
  useEffect(() => {
    if (!item) return;
    props.navigation.setOptions({ headerTitle: "Chi tiết khai báo nghỉ phép" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            label={"Tên nhân viên"}
            input={{
              value: currentUser?.hoVaTen,
              isReadOnly: true,
            }}
            showDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.ngayNghi,
              isRequired: true,
            }}
            mode="date"
            label={"Ngày nghỉ"}
            date={formik.values.ngayNghi}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ngayNghi", date);
            }}
            _datePicker={{ disabled: item && item?.c_TrangThai !== 1 }}
            useDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.ghiChu,
              isReadOnly: item && item?.c_TrangThai !== 1,
            }}
            label={"Ghi chú"}
            input={{
              value: formik.values.ghiChu,
              placeholder: "Ghi chú",
              onChangeText: (val) => formik.handleChange("ghiChu")(val),
              onBlur: formik.handleBlur("ghiChu"),
            }}
            errorMsg={formik.errors.ghiChu}
            touchInput={formik.touched.ghiChu}
          />
          {item && item?.c_TrangThai === 1 && (
            <Button.Group colorScheme="blue" size="md">
              <Button
                w="49%"
                p="3"
                colorScheme="tertiary"
                onPress={() => confirmStatus(2)}
              >
                Duyệt
              </Button>
              <Button
                w="49%"
                p="3"
                colorScheme="amber"
                onPress={() => confirmStatus(3)}
              >
                Hủy
              </Button>
            </Button.Group>
          )}

          {item && item?.c_TrangThai === 1 && (
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

export default LeaveDeclareCreateScreen;
