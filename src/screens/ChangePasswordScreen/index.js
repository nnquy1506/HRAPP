import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { VStack, Divider } from "native-base";
import * as Yup from "yup";

import { useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useJobTitleService } from "../../redux/JobTitle/jobTitle.service";
import InputHStack from "../../components/InputSearch/InputHStack";
import DeleteAlert from "../../components/DeleteComponent";
import { useNotification } from "../../hooks/useNotification";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import ButtonGroup from "../../components/ButtonConfig/ButtonGroup";
import InputVStack from "../../components/InputSearch/InputVStack";
import { goBack } from "../../ultis/navigationHelpers";
import { ChangePass } from "../../redux/Authentication/authentication.store";

const ChangePasswordScreen = (props) => {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Trường này là bắt buộc."),
    newPass: Yup.string().required("Trường này là bắt buộc."),
    repeatPass: Yup.string().oneOf(
      [Yup.ref("newPass"), null],
      "Mật khẩu phải trùng khớp."
    ),
  });
  const initialValues = {
    oldPassword: "",
    newPass: "",
    repeatPass: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitPass(values),
    validationSchema,
  });

  const submitPass = (data) => {
    setLoading(true);
    const params = {
      id: currentUser?.id || "",
      passwordOld: data.oldPassword || "",
      passwordNew: data.newPass,
    };
    ChangePass(params, onSuccess, onError);
  };

  const onSuccess = (res) => {
    console.log("res", res);
    setLoading(false);
    goBack();
  };
  const onError = (err) => {
    if (err.status !== 204) {
      const errArr = Object.values(err);
      let mess = "";
      errArr.forEach((element) => {
        mess += element;
      });
      formik.setFieldError("oldPassword", mess);
    } else {
      goBack();
    }
    setLoading(false);
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        !isEqual(initialValues, formik.values) && (
          <ButtonSaveSubmit onPress={formik.handleSubmit} />
        ),
    });
  }, [isEqual(initialValues, formik.values)]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.oldPassword,
              isRequired: true,
            }}
            label={"Mật khẩu cũ"}
            input={{
              value: formik.values.oldPassword,
              placeholder: "Mật khẩu cũ",
              onChangeText: (val) => formik.handleChange("oldPassword")(val),
              onBlur: formik.handleBlur("oldPassword"),
              secureTextEntry: true,
            }}
            errorMsg={formik.errors.oldPassword}
            touchInput={formik.touched.oldPassword}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.newPass,
              isRequired: true,
            }}
            label={"Mật khẩu mới"}
            input={{
              value: formik.values.newPass,
              placeholder: "Mật khẩu mới",
              onChangeText: (val) => formik.handleChange("newPass")(val),
              onBlur: formik.handleBlur("newPass"),
              secureTextEntry: true,
            }}
            errorMsg={formik.errors.newPass}
            touchInput={formik.touched.newPass}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.repeatPass,
              isRequired: true,
            }}
            label={"Xác nhận mật khẩu"}
            input={{
              value: formik.values.repeatPass,
              placeholder: "Xác nhận mật khẩu",
              onChangeText: (val) => formik.handleChange("repeatPass")(val),
              onBlur: formik.handleBlur("repeatPass"),
              secureTextEntry: true,
            }}
            errorMsg={formik.errors.repeatPass}
            touchInput={formik.touched.repeatPass}
            showDivider
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
