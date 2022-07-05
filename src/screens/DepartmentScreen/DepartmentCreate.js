import React, { useEffect, useState } from "react";

import { VStack, Divider } from "native-base";
import { SafeAreaView, ScrollView } from "react-native";
import * as Yup from "yup";

import { useFormik } from "formik";
import { ButtonDelete } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useDepartmentService } from "../../redux/Department/department.service";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import DeleteAlert from "../../components/DeleteComponent";
import InputHStack from "../../components/InputSearch/InputHStack";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import InputVStack from "../../components/InputSearch/InputVStack";
import { useNotification } from "../../hooks/useNotification";
import { goBack } from "../../ultis/navigationHelpers";

const DepartmentCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const departmentService = useDepartmentService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    maPhongban: Yup.string().required("Trường này là bắt buộc."),
    tenPhongban: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maPhongban: item?.c_Code || "",
    tenPhongban: item?.c_TenPhongBan || "",
    moTa: item?.c_MoTa || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitDepartment(values),
    validationSchema,
  });

  const submitDepartment = (data) => {
    const params = {
      id: item?.id || "",
      C_TenPhongBan: data.tenPhongban || "",
      C_MoTa: data.moTa || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_Code: _.toUpper(data.maPhongban),
    };
    if (item) {
      dispatch(departmentService.editDepartment(params, onSuccess, onError));
    } else {
      dispatch(departmentService.addDepartment(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    props.route.params?.callback?.onGetListDepartment(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.departmentCreate);
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
        showErrorNotification(NotiMessageSuccess.departmentEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.departmentEdit);
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
      departmentService.deleteDepartment(
        item.id,
        onSuccessDelete,
        onErrorDelete
      )
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
      showSuccessNotification(NotiMessageSuccess.departmentDelete);
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa phòng ban" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maPhongban,
              isRequired: true,
            }}
            label={"Mã phòng ban"}
            input={{
              value: formik.values.maPhongban,
              placeholder: "Mã phòng ban",
              onChangeText: (val) => formik.handleChange("maPhongban")(val),
              onBlur: formik.handleBlur("maPhongban"),
            }}
            errorMsg={formik.errors.maPhongban}
            touchInput={formik.touched.maPhongban}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenPhongban,
              isRequired: true,
            }}
            label={"Tên phòng ban"}
            input={{
              value: formik.values.tenPhongban,
              placeholder: "Tên phòng ban",
              onChangeText: (val) => formik.handleChange("tenPhongban")(val),
              onBlur: formik.handleBlur("tenPhongban"),
            }}
            errorMsg={formik.errors.tenPhongban}
            touchInput={formik.touched.tenPhongban}
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

export default DepartmentCreateScreen;
