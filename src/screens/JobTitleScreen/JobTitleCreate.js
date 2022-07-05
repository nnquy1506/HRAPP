import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { VStack, Divider } from "native-base";
import * as Yup from "yup";

import { useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useJobTitleService } from "../../redux/JobTitle/jobTitle.service";
import InputHStack from "../../components/InputSearch/InputHStack";
import DeleteAlert from "../../components/DeleteComponent";
import { useNotification } from "../../hooks/useNotification";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import InputVStack from "../../components/InputSearch/InputVStack";
import { goBack } from "../../ultis/navigationHelpers";

const JobTitleCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const jobTitleService = useJobTitleService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    maChucDanh: Yup.string().required("Trường này là bắt buộc."),
    tenChucDanh: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maChucDanh: item?.c_Code || "",
    tenChucDanh: item?.c_TenChucDanh || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitJobTitle(values),
    validationSchema,
  });

  const submitJobTitle = (data) => {
    // setLoading(true);
    const params = {
      id: item?.id || "",
      C_TenChucDanh: data.tenChucDanh || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_MoTa: data.moTa || "",
      C_Code: _.toUpper(data.maChucDanh),
    };
    if (item) {
      dispatch(jobTitleService.editJobTitle(params, onSuccess, onError));
    } else {
      dispatch(jobTitleService.addJobTitle(params, onSuccess, onError));
    }
  };

  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListJobTitle(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.JobTitleCreate);
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
        showErrorNotification(NotiMessageSuccess.JobTitleEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.JobTitleEdit);
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
      jobTitleService.deleteJobTitle(item.id, onSuccessDelete, onErrorDelete)
    );
  };
  const onSuccessDelete = (res) => {
    setLoading(false);
    console.log("res", res);
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
      showSuccessNotification(NotiMessageSuccess.JobTitleDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa chức danh" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maChucDanh,
              isRequired: true,
            }}
            label={"Mã chức danh"}
            input={{
              value: formik.values.maChucDanh,
              placeholder: "Mã chức danh",
              onChangeText: (val) => formik.handleChange("maChucDanh")(val),
              onBlur: formik.handleBlur("maChucDanh"),
            }}
            errorMsg={formik.errors.maChucDanh}
            touchInput={formik.touched.maChucDanh}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenChucDanh,
              isRequired: true,
            }}
            label={"Tên chức danh"}
            input={{
              value: formik.values.tenChucDanh,
              placeholder: "Tên chức danh",
              onChangeText: (val) => formik.handleChange("tenChucDanh")(val),
              onBlur: formik.handleBlur("tenChucDanh"),
            }}
            errorMsg={formik.errors.tenChucDanh}
            touchInput={formik.touched.tenChucDanh}
            showDivider
          />
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

export default JobTitleCreateScreen;
