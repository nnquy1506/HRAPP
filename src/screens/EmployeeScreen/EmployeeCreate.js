import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import {
  VStack,
  useToast,
  ScrollView,
  Text,
  Divider,
  Pressable,
  HStack,
  Center,
  Avatar,
  Box,
} from "native-base";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";
import _, { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../../components/Alert";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { setListEmployeeItem } from "../../redux/Employee/employee.action";
import { useEmployeeService } from "../../redux/Employee/employee.service";
import InputHStack from "../../components/InputSearch/InputHStack";
import SCREEN_NAME from "../../constants/ScreenName";
import { goBack, navigate } from "../../ultis/navigationHelpers";
import RadioCustom from "../../components/CustomForm/RadioCustom";
import {
  gioiTinh,
  tinhTrangHonNhan,
  trangThai,
  trangThaiLamViec,
} from "../../constants/MenuList";
import DatePickerField from "../../components/DatePickerField";
import ButtonSaveSubmit from "../../components/ButtonConfig/ButtonSaveSubmit";
import moment from "moment";
import { useNotification } from "../../hooks/useNotification";
import DeleteAlert from "../../components/DeleteComponent";
import { useAllowanceService } from "../../redux/Allowance/allowance.service";
import * as ImagePicker from "expo-image-picker";
import { imageAvatar } from "../../config";
import { Ionicons } from "@expo/vector-icons";

const EmployeeCreateScreen = (props) => {
  const { item } = props?.route?.params;
  const dispatch = useDispatch();
  const employeeService = useEmployeeService();
  const allowanceService = useAllowanceService();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const roleList = useSelector((state) => state.role.roleList);
  const jobTitleList = useSelector((state) => state.jobTitle.jobTitleList);
  const departmentList = useSelector(
    (state) => state.department.departmentList
  );
  const levelList = useSelector((state) => state.level.levelList);
  const shiftList = useSelector((state) => state.shift.shiftList);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [uri, setUri] = useState();
  const [imagePost, setImagePost] = useState();

  const validationSchema = Yup.object().shape({
    maNV: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    tenNV: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    email: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    soDienThoai: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    emailCaNhan: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    phongBan: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    gioiTinh: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    trangThai: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    tinhTrangHonNhan: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    trangThaiLamViec: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    chucDanh: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    trinhdo: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    calam: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    // password: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    tenQuyen: Yup.string().required("Tr?????ng n??y l?? b???t bu???c."),
    ngaySinh: Yup.date().nullable().required("Ng??y sinh l?? b???t bu???c"),
    soNgayNghiPhep: Yup.number().required("Tr?????ng n??y l?? b???t bu???c."),
    soNgayPhepDaDung: Yup.number().required("Tr?????ng n??y l?? b???t bu???c."),
  });

  const initialValues = {
    maNV: item?.c_Code || "",
    tenNV: item?.c_HoVaTen || "",
    email: item?.c_Email || "",
    soDienThoai: item?.c_SoDienThoai || "",
    password: "",
    emailCaNhan: item?.c_EmailCaNhan || "",
    phongBan: item?.fk_PhongBan || "",
    trinhdo: item?.fk_TrinhDo || "",
    calam: item?.fk_CaLam || "",
    gioiTinh: item?.c_GioiTinh || 0,
    trangThai: item?.c_TrangThai || 1,
    trangThaiLamViec: item?.c_TrangThaiLamViec || 1,
    tinhTrangHonNhan: item?.c_TinhTrangHonNhan || 1,
    chucDanh: item?.fk_ChucDanh || "",
    tenQuyen: item?.fk_DanhMucTenQuyen || "",
    ngaySinh:
      moment(item?.c_NgaySinh || new Date(), "D MMM YYYY").toDate() ||
      new Date(),
    soNgayNghiPhep: item?.c_SoNgayNghiPhep?.toString() || "",
    soNgayPhepDaDung: item?.c_SoNgayNghiPhepDaSuDung?.toString() || "",
    phuCap: item?.c_PhuCap || [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submitEmployee(values),
    validationSchema,
  });
  const submitEmployee = (data) => {
    // setLoading(true);
    const params = {
      id: item?.id || "",
      C_Email: data.email || "",
      C_MatKhau: data.password || "",
      C_HoVaTen: data.tenNV || "",
      C_SoDienThoai: data.soDienThoai,
      C_Code: _.toUpper(data.maNV),
      Fk_ChucDanh: data.chucDanh || "",
      Fk_PhongBan: data.phongBan || "",
      C_GioiTinh: data.gioiTinh,
      C_EmailCaNhan: data.emailCaNhan,
      C_NgaySinh: moment(data.ngaySinh).format("DD/MM/YYYY"),
      C_TrangThai: data.trangThai || 1,
      Fk_DanhMucTenQuyen: data.tenQuyen || "",
      Fk_CaLam: data.calam || "",
      Fk_TrinhDo: data.trinhdo || "",
      C_SoNgayNghiPhep: Number(data.soNgayNghiPhep) || 0,
      C_SoNgayNghiPhepDaSuDung: Number(data.soNgayPhepDaDung) || 0,
      C_TinhTrangHonNhan: data.tinhTrangHonNhan || 1,
      C_TrangThaiLamViec: data.trangThaiLamViec || 1,
      C_Avatar: imagePost || "",
    };
    if (item) {
      dispatch(employeeService.editEmployee(params, onSuccess, onError));
      dispatch(
        allowanceService.addAllowanceEmployee({
          id: params.id,
          phuCap: formik.values.phuCap || [],
        })
      );
    } else {
      dispatch(employeeService.addEmployee(params, onSuccess, onError));
    }
  };
  const onSuccess = (res) => {
    dispatch(
      allowanceService.addAllowanceEmployee({
        id: res.id,
        phuCap: formik.values.phuCap || [],
      })
    );
    props.route.params?.callback(1, 10, null, null, true);
    showSuccessNotification(NotiMessageSuccess.employeeCreate);
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
        showErrorNotification(NotiMessageSuccess.employeeEdit);
      } else {
        showSuccessNotification(NotiMessageSuccess.employeeEdit);
        setOpenDelete(false);
        props.route.params?.callback(1, 10, null, null, true);
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
      employeeService.deleteEmployee(item.id, onSuccessDelete, onErrorDelete)
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
      showSuccessNotification(NotiMessageSuccess.employeeDelete);
      setOpenDelete(false);
      props.route.params?.callback(1, 10, null, null, true);
      goBack();
    }
  };
  const onGetListAllowSuccess = (res) => {
    const arr = res.items.map((item) => item.fk_PhuCap);
    formik.setFieldValue("phuCap", arr);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      exif: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUri(result.uri);
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      const _imagePost = { uri: localUri, name: filename, type };
      setImagePost(_imagePost);
    }
  };

  const _renderAvatar = useCallback(
    (options) => {
      let avatarProps = options || {};
      if (item?.c_Avatar) {
        avatarProps.source = {
          uri: `${imageAvatar + item.c_Avatar}`,
        };
      }
      if (uri) {
        avatarProps.source = {
          uri,
        };
      }
      return (
        <Avatar key={uri} size="xl" {...avatarProps}>
          A
        </Avatar>
      );
    },
    [uri]
  );
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        (!isEqual(initialValues, formik.values) || uri) && (
          <ButtonSaveSubmit onPress={formik.handleSubmit} />
        ),
    });
  }, [isEqual(initialValues, formik.values), uri]);
  useEffect(() => {
    if (!item) return;
    props.navigation.setOptions({ headerTitle: "Ch???nh s???a nh??n vi??n" });
    dispatch(
      allowanceService.GetAllowanceEmployeeList(
        {
          pageIndex: 1,
          pageSize: 100,
          filter: null,
          status: null,
          Fk_NguoiDung: item.id,
        },
        onGetListAllowSuccess
      )
    );
  }, [item]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider w="full" />
      <ScrollView>
        <Center mt="3" bg="white" alignItems="center" p="3">
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => pickImage()}>
            {_renderAvatar()}
          </Pressable>
        </Center>
        {item && (
          <>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigate(SCREEN_NAME.CONTRACT_DETAIL_SCREEN, { items: item })
              }
            >
              <HStack px="3" mb="3" alignItems="center" bgColor="shades.0">
                <Box flex={1} borderColor={"#e5e7eb"}>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    my={2}
                    py="2"
                  >
                    <Text fontSize={"md"} bold>
                      Chi ti???t h???p ?????ng
                    </Text>
                    <Box mr={2}>
                      <Ionicons name="chevron-forward-outline" size={20} />
                    </Box>
                  </HStack>
                </Box>
              </HStack>
            </TouchableOpacity>
          </>
        )}

        <VStack bg="white" p="3" pb="0" mt="3">
          <Text color="grey.500" mb="1">
            Th??ng tin c?? b???n
          </Text>
          <InputHStack
            formControl={{
              isInvalid: formik.errors.maNV,
              isRequired: true,
            }}
            label={"M?? nh??n vi??n"}
            input={{
              value: formik.values.maNV,
              placeholder: "M?? nh??n vi??n",
              onChangeText: (val) => formik.handleChange("maNV")(val),
              onBlur: formik.handleBlur("maNV"),
            }}
            errorMsg={formik.errors.maNV}
            touchInput={formik.touched.maNV}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.tenNV,
              isRequired: true,
            }}
            label={"T??n nh??n vi??n"}
            input={{
              value: formik.values.tenNV,
              onChangeText: (val) => formik.handleChange("tenNV")(val),
              onBlur: formik.handleBlur("tenNV"),
              placeholder: "T??n nh??n vi??n",
            }}
            errorMsg={formik.errors.tenNV}
            touchInput={formik.touched.tenNV}
            showDivider
          />
          <DatePickerField
            formControl={{
              isInvalid: formik.errors.ngaySinh,
            }}
            mode="date"
            label={"Ng??y sinh"}
            date={formik.values.ngaySinh}
            onChangeDate={(e, date) => {
              formik.setFieldValue("ngaySinh", date);
            }}
            // _datePicker={{ disabled: true }}
            useDivider
          />
          <RadioCustom
            formControl={{
              isInvalid: formik.errors.gioiTinh,
              isRequired: true,
            }}
            label={"Gi???i t??nh"}
            options={gioiTinh}
            _radio={{
              onChange: (value) => formik.setFieldValue("gioiTinh", value),
              defaultValue: formik.values.gioiTinh,
            }}
            errorMsg={formik.errors.gioiTinh}
            touchInput={formik.touched.gioiTinh}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.soDienThoai,
              isRequired: true,
            }}
            label={"S??? ??i???n tho???i"}
            input={{
              value: formik.values.soDienThoai,
              onChangeText: (val) => formik.handleChange("soDienThoai")(val),
              onBlur: formik.handleBlur("soDienThoai"),
              keyboardType: "number-pad",
              placeholder: "S??? ??i???n tho???i",
            }}
            errorMsg={formik.errors.soDienThoai}
            touchInput={formik.touched.soDienThoai}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.email,
              isRequired: true,
            }}
            label={"Email"}
            input={{
              value: formik.values.email,
              onChangeText: (val) => formik.handleChange("email")(val),
              onBlur: formik.handleBlur("email"),
              keyboardType: "email-address",
              placeholder: "?????a ch??? email",
            }}
            errorMsg={formik.errors.email}
            touchInput={formik.touched.email}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.emailCaNhan,
              isRequired: true,
            }}
            label={"Email c?? nh??n"}
            input={{
              value: formik.values.emailCaNhan,
              onChangeText: (val) => formik.handleChange("emailCaNhan")(val),
              onBlur: formik.handleBlur("emailCaNhan"),
              keyboardType: "email-address",
              placeholder: "Email c?? nh??n",
            }}
            errorMsg={formik.errors.emailCaNhan}
            touchInput={formik.touched.emailCaNhan}
            showDivider
          />
          {!item && (
            <InputHStack
              formControl={{
                isInvalid: formik.errors.password,
                isRequired: true,
              }}
              label={"M???t kh???u"}
              input={{
                value: formik.values.password,
                onChangeText: (val) => formik.setFieldValue("password", val),
                onBlur: formik.handleBlur("password"),
                type: "password",
                placeholder: "M???t kh???u",
              }}
              errorMsg={formik.errors.password}
              touchInput={formik.touched.password}
              showDivider
            />
          )}
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.ROLE_SCREEN, {
                initValue: formik.values.tenQuyen,
                callback: (val) => formik.setFieldValue("tenQuyen", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.tenQuyen,
              }}
              label={"T??n quy???n"}
              buttonLabel={
                roleList?.find((role) => role.id === formik.values.tenQuyen)
                  ?.c_TenQuyen
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.ROLE_SCREEN, {
                    initValue: formik.values.tenQuyen,
                    callback: (val) => formik.setFieldValue("tenQuyen", val),
                  }),
              }}
              errorMsg={formik.errors.tenQuyen}
              showDivider
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.JOB_TITLE_SCREEN, {
                initValue: formik.values.chucDanh,
                callback: (val) => formik.setFieldValue("chucDanh", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.chucDanh,
              }}
              label={"Ch???c danh"}
              buttonLabel={
                jobTitleList?.find(
                  (title) => title.id === formik.values.chucDanh
                )?.c_TenChucDanh
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.JOB_TITLE_SCREEN, {
                    initValue: formik.values.chucDanh,
                    callback: (val) => formik.setFieldValue("chucDanh", val),
                  }),
              }}
              errorMsg={formik.errors.chucDanh}
              showDivider
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.DEPARTMENT_SCREEN, {
                initValue: formik.values.phongBan,
                callback: (val) => formik.setFieldValue("phongBan", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.phongBan,
              }}
              label={"Ph??ng ban"}
              buttonLabel={
                departmentList?.find(
                  (title) => title.id === formik.values.phongBan
                )?.c_TenPhongBan
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.DEPARTMENT_SCREEN, {
                    initValue: formik.values.phongBan,
                    callback: (val) => formik.setFieldValue("phongBan", val),
                  }),
              }}
              errorMsg={formik.errors.phongBan}
              showDivider
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.LEVEL_SCREEN, {
                initValue: formik.values.trinhdo,
                callback: (val) => formik.setFieldValue("trinhdo", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.trinhdo,
              }}
              label={"Tr??nh ?????"}
              buttonLabel={
                levelList?.find((title) => title.id === formik.values.trinhdo)
                  ?.c_TenTrinhDo
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.LEVEL_SCREEN, {
                    initValue: formik.values.trinhdo,
                    callback: (val) => formik.setFieldValue("trinhdo", val),
                  }),
              }}
              errorMsg={formik.errors.trinhdo}
              showDivider
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.SHIFT_SCREEN, {
                initValue: formik.values.calam,
                callback: (val) => formik.setFieldValue("calam", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.calam,
              }}
              label={"Ca l??m"}
              buttonLabel={
                shiftList?.find((title) => title.id === formik.values.calam)
                  ?.c_TenCaLam
              }
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.SHIFT_SCREEN, {
                    initValue: formik.values.calam,
                    callback: (val) => formik.setFieldValue("calam", val),
                  }),
              }}
              errorMsg={formik.errors.calam}
              showDivider
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(SCREEN_NAME.ALLOWANCE_SCREEN, {
                initValue: formik.values.phuCap,
                callback: (val) => formik.setFieldValue("phuCap", val),
              })
            }
          >
            <InputHStack
              formControl={{
                isInvalid: formik.errors.phuCap,
              }}
              label={"Ph??? c???p"}
              buttonLabel={formik.values.phuCap.length || 0}
              button={{
                bgColor: "white",
                onPress: () =>
                  navigate(SCREEN_NAME.ALLOWANCE_SCREEN, {
                    initValue: formik.values.phuCap,
                    callback: (val) => formik.setFieldValue("phuCap", val),
                  }),
              }}
              errorMsg={formik.errors.phuCap}
              showDivider
            />
          </Pressable>
          <InputHStack
            formControl={{
              isInvalid: formik.errors.soNgayNghiPhep,
              isRequired: true,
            }}
            label={"S??? ng??y ngh??? ph??p"}
            input={{
              value: formik.values.soNgayNghiPhep,
              onChangeText: (val) =>
                formik.setFieldValue("soNgayNghiPhep", val),
              onBlur: formik.handleBlur("soNgayNghiPhep"),
              placeholder: "S??? ng??y ngh??? ph??p",
            }}
            errorMsg={formik.errors.soNgayNghiPhep}
            touchInput={formik.touched.soNgayNghiPhep}
            showDivider
          />
          <InputHStack
            formControl={{
              isInvalid: formik.errors.soNgayPhepDaDung,
              isRequired: true,
            }}
            label={"S??? ng??y ngh??? ph??p ???? d??ng"}
            input={{
              value: formik.values.soNgayPhepDaDung,
              onChangeText: (val) =>
                formik.setFieldValue("soNgayPhepDaDung", val),
              onBlur: formik.handleBlur("soNgayPhepDaDung"),
              placeholder: "S??? ng??y ngh??? ph??p ???? d??ng",
            }}
            errorMsg={formik.errors.soNgayPhepDaDung}
            touchInput={formik.touched.soNgayPhepDaDung}
            showDivider
          />
          <RadioCustom
            formControl={{
              isInvalid: formik.errors.tinhTrangHonNhan,
              isRequired: true,
            }}
            label={"T??nh tr???ng h??n nh??n"}
            options={tinhTrangHonNhan}
            _radio={{
              onChange: (value) =>
                formik.setFieldValue("tinhTrangHonNhan", value),
              defaultValue: formik.values.tinhTrangHonNhan,
            }}
            errorMsg={formik.errors.tinhTrangHonNhan}
            touchInput={formik.touched.tinhTrangHonNhan}
            showDivider
          />
          <RadioCustom
            formControl={{
              isInvalid: formik.errors.trangThai,
              isRequired: true,
            }}
            label={"Tr???ng th??i"}
            options={trangThai}
            _radio={{
              onChange: (value) => formik.setFieldValue("trangThai", value),
              defaultValue: formik.values.trangThai,
            }}
            errorMsg={formik.errors.trangThai}
            touchInput={formik.touched.trangThai}
            showDivider
          />
          <RadioCustom
            formControl={{
              isInvalid: formik.errors.trangThaiLamViec,
              isRequired: true,
            }}
            label={"Tr???ng th??i l??m vi???c"}
            options={trangThaiLamViec}
            _radio={{
              onChange: (value) =>
                formik.setFieldValue("trangThaiLamViec", value),
              defaultValue: formik.values.trangThaiLamViec,
            }}
            errorMsg={formik.errors.trangThaiLamViec}
            touchInput={formik.touched.trangThaiLamViec}
            showDivider
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

export default EmployeeCreateScreen;
