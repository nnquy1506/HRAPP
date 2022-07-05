import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { VStack, Divider, HStack, Button, Pressable } from "native-base";
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
import { goBack, navigate } from "../../ultis/navigationHelpers";
import DatePickerField from "../../components/DatePickerField";
import moment from "moment";
import SCREEN_NAME from "../../constants/ScreenName";
import { useDeclareOverTimeService } from "../../redux/DeclareOvertime/declareOvertime.service";

const DeclareOvertimeCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const declareOvertimeService = useDeclareOverTimeService();
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const kindOfOvertimeList = useSelector(
    (state) => state.kindOfOvertime.kindOfOverTimeList
  );
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    ngayTangCa: Yup.date().nullable().required("Giờ bắt đầu là bắt buộc"),
    loaiTangCa: Yup.string().required("Trường này là bắt buộc."),
    batDau: Yup.date().nullable().required("Giờ bắt đầu là bắt buộc"),
    ketThuc: Yup.date().nullable().required("Giờ kết thúc là bắt buộc"),
  });
  const initialValues = {
    ngayTangCa: moment
      .unix(Number(item?.c_NgayTangCa) || moment().unix())
      .toDate(),
    ghiChu: item?.c_GhiChu || "",
    loaiTangCa: item?.fk_LoaiTangCa || "",
    batDau: moment
      .unix(Number(item?.c_ThoiGianBatDau) || moment().unix())
      .toDate(),
    ketThuc: moment
      .unix(Number(item?.c_ThoiGianKetThuc) || moment().unix())
      .toDate(),
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitDeclareOvertime(values),
    validationSchema,
  });

  const submitDeclareOvertime = (data) => {
    // setLoading(true);
    const params = {
      id: item?.id || "",
      C_GhiChu: data.ghiChu || "",
      C_NgayTangCa: moment(data?.ngayTangCa || new Date())
        .unix()
        .toString(),
      C_ThoiGianBatDau: moment(data?.batDau || new Date())
        .unix()
        .toString(),
      C_ThoiGianKetThuc: moment(data?.ketThuc || new Date())
        .unix()
        .toString(),
      C_SoGio: Number(
        moment
          .utc(
            moment(data?.ketThuc, "DD/MM/YYYY HH:mm:ss").diff(
              moment(data?.batDau, "DD/MM/YYYY HH:mm:ss")
            )
          )
          .format("H")
      ),
      Fk_NguoiDung: currentUser.id,
      Fk_LoaiTangCa: data?.loaiTangCa || "",
    };
    if (item) {
      dispatch(
        declareOvertimeService.editDeclareOverTime(params, onSuccess, onError)
      );
    } else {
      dispatch(
        declareOvertimeService.addDeclareOverTime(params, onSuccess, onError)
      );
    }
  };

  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListDeclareOvertime(
      1,
      10,
      null,
      null,
      true
    );
    showSuccessNotification(NotiMessageSuccess.declareOvertimeCreate);
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
        showErrorNotification(NotiMessageSuccess.declareOvertimeEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.declareOvertimeEdit);
        setOpenDelete(false);
        props.route.params?.callback?.onGetListDeclareOvertime(
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
      declareOvertimeService.deleteDeclareOverTime(
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
      showSuccessNotification(NotiMessageSuccess.declareOvertimeDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetListDeclareOvertime(
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
      declareOvertimeService.statusDeclareOverTime(
        data,
        undefined,
        onErrorStatus
      )
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
      showSuccessNotification(NotiMessageSuccess.declareOvertimeStatus);
      props.route.params?.callback?.onGetListDeclareOvertime(
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
    props.navigation.setOptions({ headerTitle: "Chi tiết khai báo tăng ca" });
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
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.KIND_OF_OVERTIME_SCREEN, {
                initValue: formik.values.loaiTangCa,
                callback: (val) => formik.setFieldValue("loaiTangCa", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.loaiTangCa,
              }}
              label={"Loại tăng ca"}
              buttonLabel={
                kindOfOvertimeList?.find(
                  (title) => title.id === formik.values.loaiTangCa
                )?.c_LoaiTangCa
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.KIND_OF_OVERTIME_SCREEN, {
                    initValue: formik.values.loaiTangCa,
                    callback: (val) => formik.setFieldValue("loaiTangCa", val),
                  }),
              }}
              errorMsg={formik.errors.loaiTangCa}
              showDivider
            />
          </Pressable>
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.ngayTangCa,
              isRequired: true,
            }}
            mode="date"
            label={"Ngày tăng ca"}
            date={formik.values.ngayTangCa}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ngayTangCa", date);
            }}
            _datePicker={{ disabled: item && item?.c_TrangThai !== 1 }}
            useDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.batDau,
            }}
            mode="time"
            label={"Giờ bắt đầu"}
            date={formik.values.batDau}
            onChangeDate={(e, date) => {
              formik.setFieldValue("batDau", date);
            }}
            useDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.ketThuc,
            }}
            mode="time"
            label={"Giờ kết thúc"}
            date={formik.values.ketThuc}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ketThuc", date);
            }}
            useDivider
          />
          <InputHStack
            label={"Số giờ"}
            input={{
              value:
                moment
                  .utc(
                    moment(formik?.values?.ketThuc, "DD/MM/YYYY HH:mm:ss").diff(
                      moment(formik?.values?.batDau, "DD/MM/YYYY HH:mm:ss")
                    )
                  )
                  .format("H") || "",
              isReadOnly: true,
            }}
            showDivider
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

export default DeclareOvertimeCreateScreen;
