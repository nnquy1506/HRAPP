import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { VStack, Divider, Text } from "native-base";

import { useFormik } from "formik";
import InputHStack from "../../components/InputSearch/InputHStack";
const SalaryDetailScreen = (props) => {
  const { item } = props?.route?.params;
  const initialValues = {
    maNV: item?.c_NguoiDung?.c_Code || "",
    tenNV: item?.c_NguoiDung?.c_HoVaTen || "",
    luongCoBan: Number(item?.c_LuongCoBan).toLocaleString() || "",
    soCong: item?.c_SoCongThucTe || "",
    luongTheoNgayCong: Number(item?.c_LuongTheoNgayCong).toLocaleString() || "",
    luongLamThem: item?.c_LuongLamThem || "",
    tienPhuCap: Number(item?.c_TienPhuCap).toLocaleString() || "",
    thueThuNhapCaNhan:
      Number(item?.c_TienThueThuNhapCaNhan).toLocaleString() || "",
    tienCongDoan: Number(item?.c_TienCongDoan).toLocaleString() || "",
    tienBaoHiem: Number(item?.c_TienBaoHiem).toLocaleString() || "",
    tongLuong: Number(item?.c_TongLuong).toLocaleString() || "",
  };
  const formik = useFormik({
    initialValues,
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <VStack bg="white" p="3" pb="0">
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maNV,
              isReadOnly: true,
            }}
            label={"Mã nhân viên"}
            input={{
              value: formik.values.maNV,
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenNV,
              isReadOnly: true,
            }}
            label={"Tên nhân viên"}
            input={{
              value: formik.values.tenNV,
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.luongCoBan,
              isReadOnly: true,
            }}
            label={"Lương cơ bản"}
            input={{
              value: formik.values.luongCoBan,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.soCong,
              isReadOnly: true,
            }}
            label={"Số công"}
            input={{
              value: formik.values.soCong,
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.luongTheoNgayCong,
              isReadOnly: true,
            }}
            label={"Lương theo ngày công"}
            input={{
              value: formik.values.luongTheoNgayCong,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.luongLamThem,
              isReadOnly: true,
            }}
            label={"Lương làm thêm"}
            input={{
              value: formik.values.luongLamThem,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tienPhuCap,
              isReadOnly: true,
            }}
            label={"Tiền phụ cấp"}
            input={{
              value: formik.values.tienPhuCap,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.thueThuNhapCaNhan,
              isReadOnly: true,
            }}
            label={"Tiền thuế thu nhập cá nhân"}
            input={{
              value: formik.values.thueThuNhapCaNhan,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tienCongDoan,
              isReadOnly: true,
            }}
            label={"Tiền công đoàn"}
            input={{
              value: formik.values.tienCongDoan,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tienBaoHiem,
              isReadOnly: true,
            }}
            label={"Tiền bảo hiểm"}
            input={{
              value: formik.values.tienBaoHiem,
              InputRightElement: <Text>VNĐ</Text>
            }}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tongLuong,
              isReadOnly: true,
            }}
            label={"Tổng lương"}
            input={{
              value: formik.values.tongLuong,
              InputRightElement: <Text>VNĐ</Text>
            }}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalaryDetailScreen;
