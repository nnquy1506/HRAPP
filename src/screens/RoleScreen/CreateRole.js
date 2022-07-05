import { useFormik } from "formik";
import _, { isEqual } from "lodash";
import { Divider, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import * as Yup from "yup";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import InputHStack from "../../components/InputSearch/InputHStack";
import { useRoleService } from "../../redux/Role/role.service";
import { useNotification } from "../../hooks/useNotification";
import { NotiMessageSuccess } from "../../constants/Notification";
import { useDispatch } from "react-redux";
import { goBack } from "../../ultis/navigationHelpers";
import { ButtonDelete } from "../../components/ButtonConfig";
import DeleteAlert from "../../components/DeleteComponent";

const CreateRoleScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const roleServices = useRoleService();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const validationSchema = Yup.object().shape({
    maQuyen: Yup.string().required("Trường này là bắt buộc."),
    tenQuyen: Yup.string().required("Trường này là bắt buộc."),
    trangThai: Yup.boolean().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    maQuyen: item?.c_Code || "",
    tenQuyen: item?.c_TenQuyen || "",
    trangThai: item?.c_TrangThai === 2 ? true : false,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitRole(values),
    validationSchema,
  });

  const submitRole = (data) => {
    // setLoading(true);
    const params = {
      id: item?.id || "",
      C_TenQuyen: data.tenQuyen || "",
      C_TrangThai: data.trangThai ? 2 : 1,
      C_Code: _.toUpper(data.maQuyen),
    };
    if (item) {
      dispatch(roleServices.editRole(params, onSuccess, onError));
    } else {
      dispatch(roleServices.addRole(params, onSuccess, onError));
    }
  };

  const onSuccess = (res) => {
    console.log("res", res);
    props.route.params?.callback?.onGetListRole();
    showSuccessNotification(NotiMessageSuccess.roleCreate);
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
        showErrorNotification(NotiMessageSuccess.roleEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.roleEdit);
        setOpenDelete(false);
        props.route.params?.callback?.onGetList();
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
    dispatch(roleServices.deleteRole(item.id, onSuccessDelete, onErrorDelete));
  };
  const onSuccessDelete = (res) => {
    setLoading(false);
    console.log("res", res);
  };
  const onErrorDelete = (err) => {
    setLoading(false);
    if (err.status !== 204) {
      showErrorNotification(NotiMessageSuccess.roleDelete);
    } else {
      showSuccessNotification(NotiMessageSuccess.roleDelete);
      setOpenDelete(false);
      props.route.params?.callback?.onGetList();
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa quyền" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maQuyen,
              isRequired: true,
            }}
            label={"Mã quyền"}
            input={{
              value: formik.values.maQuyen,
              placeholder: "Mã quyền",
              onChangeText: (val) => formik.handleChange("maQuyen")(val),
              onBlur: formik.handleBlur("maQuyen"),
            }}
            errorMsg={formik.errors.maQuyen}
            touchInput={formik.touched.maQuyen}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenQuyen,
              isRequired: true,
            }}
            label={"Tên quyền"}
            input={{
              value: formik.values.tenQuyen,
              placeholder: "Tên quyền",
              onChangeText: (val) => formik.handleChange("tenQuyen")(val),
              onBlur: formik.handleBlur("tenQuyen"),
            }}
            errorMsg={formik.errors.tenQuyen}
            touchInput={formik.touched.tenQuyen}
            showDivider
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
export default CreateRoleScreen;
