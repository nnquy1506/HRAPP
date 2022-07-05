import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { VStack, Divider, Text } from "native-base";
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
import { goBack } from "../../ultis/navigationHelpers";

const IncomeCreatecreen = (props) => {
  const callBack = props?.route?.params?.callback;
  const itemsIncome = props?.route?.params?.itemsIncome;
  const item = props?.route?.params?.item;
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  const validationSchema = Yup.object().shape({
    c_ThuNhapTren: Yup.number().required("Trường này là bắt buộc."),
    c_ThuNhapDen: Yup.number()
      .required("Trường này là bắt buộc.")
      .when("c_ThuNhapTren", (c_ThuNhapTren) => {
        if (c_ThuNhapTren) {
          return Yup.number()
            .moreThan(c_ThuNhapTren, "Cần nhập lớn hơn mức thu nhập trên")
            .typeError("Trường này là bắt buộc.");
        }
      }),
    c_ThueSuatNew: Yup.number().required("Trường này là bắt buộc."),
  });
  const initialValues = {
    c_ThuNhapTren: Number(item?.c_ThuNhapTren).toLocaleString() || "",
    c_ThuNhapDen: Number(item?.c_ThuNhapDen).toLocaleString() || "",
    c_ThueSuatNew: item?.c_ThueSuatNew || "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitThue(values),
    validationSchema,
  });

  const submitThue = (data) => {
    const params = {
      ...data,
      key: item && item?.key >= 0 ? item?.key : itemsIncome.length,
    };
    if (!item) {
      callBack.addItemToList(params);
    } else {
      callBack.editItemList(params);
    }
    goBack();
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };
  const onSubmitDelete = () => {
    callBack?.deleteItem(item.key);
    goBack();
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
    props.navigation.setOptions({ headerTitle: "Chỉnh sửa mức thu nhập" });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.c_ThuNhapTren,
              isRequired: true,
            }}
            label={"Thu nhập trên (VNĐ)"}
            input={{
              value: formik.values.c_ThuNhapTren,
              placeholder: "Thu nhập trên(VNĐ)",
              onChangeText: (val) => formik.handleChange("c_ThuNhapTren")(val),
              onBlur: formik.handleBlur("c_ThuNhapTren"),
              keyboardType: "number-pad",
              InputRightElement: <Text>VNĐ</Text>
            }}
            errorMsg={formik.errors.c_ThuNhapTren}
            touchInput={formik.touched.c_ThuNhapTren}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.c_ThuNhapDen,
              isRequired: true,
            }}
            label={"Thu nhập đến (VNĐ)"}
            input={{
              value: formik.values.c_ThuNhapDen,
              placeholder: "Thu nhập đến (VNĐ)",
              onChangeText: (val) => formik.handleChange("c_ThuNhapDen")(val),
              onBlur: formik.handleBlur("c_ThuNhapDen"),
              keyboardType: "number-pad",
              InputRightElement: <Text>VNĐ</Text>
            }}
            errorMsg={formik.errors.c_ThuNhapDen}
            touchInput={formik.touched.c_ThuNhapDen}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.c_ThueSuatNew,
              isRequired: true,
            }}
            label={"Thuế suất(%)"}
            input={{
              value: formik.values.c_ThueSuatNew,
              placeholder: "Thuế suất (%)",
              onChangeText: (val) => formik.handleChange("c_ThueSuatNew")(val),
              onBlur: formik.handleBlur("c_ThueSuatNew"),
              keyboardType: "number-pad",
              InputRightElement: <Text>%</Text>
            }}
            errorMsg={formik.errors.c_ThueSuatNew}
            touchInput={formik.touched.c_ThueSuatNew}
            showDivider
          />

          {item && (
            <ButtonDelete
              mt="3"
              p="3"
              title="Xóa"
              isLoadingText={"Đang xóa"}
              onPress={handleDelete}
            />
          )}
          <DeleteAlert
            openDelete={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmitDelete={onSubmitDelete}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IncomeCreatecreen;
