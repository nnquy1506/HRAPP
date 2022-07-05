import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

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
  Accordion,
  ScrollView,
  Avatar,
} from "native-base";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { ButtonDelete, ButtonSave } from "../../components/ButtonConfig";

import TextFieldView from "../../components/CustomForm/TextFieldView";
import { Formik } from "formik";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../../components/Alert";
import Header from "../../components/Header";
import { NotiMessageSuccess, NotiType } from "../../constants/Notification";
import { useContractService } from "../../redux/Contract/contract.service";
import DateTimeView from "../../components/CustomForm/DateTimeView";
import { Dimensions } from "react-native";
import SelectView from "../../components/CustomForm/SelectView";
import {
  gioiTinh,
  tinhTrangHonNhan,
  trangThai,
} from "../../constants/MenuList";
import { useDepartmentService } from "../../redux/Department/department.service";
import { useJobTitleService } from "../../redux/JobTitle/jobTitle.service";
import { useShiftService } from "../../redux/Shift/shift.service";
import { useLevelService } from "../../redux/Level/level.service";
import { setListEmployeeItem } from "../../redux/Employee/employee.action";
import { useEmployeeService } from "../../redux/Employee/employee.service";
import DeleteAlert from "../../components/DeleteComponent";
import moment from "moment";

const validationSchema = Yup.object().shape({
  maNV: Yup.string().required("Trường này là bắt buộc."),
  tenNV: Yup.string().required("Trường này là bắt buộc."),
  // noiSinh: Yup.string().required("Trường này là bắt buộc."),
  emailCongTy: Yup.string().required("Trường này là bắt buộc."),
  soDienThoai: Yup.string().required("Trường này là bắt buộc."),
  emailCaNhan: Yup.string().required("Trường này là bắt buộc."),
  phongBan: Yup.string().required("Trường này là bắt buộc."),
  gioiTinh: Yup.string().required("Trường này là bắt buộc."),
  chucDanh: Yup.string().required("Trường này là bắt buộc."),
  // hopDong: Yup.string().required("Trường này là bắt buộc."),
  // status: Yup.string().required("Trường này là bắt buộc."),
  // soNgayNghiPhep: Yup.string().required("Trường này là bắt buộc."),
  // phepDaSuDung: Yup.string().required("Trường này là bắt buộc."),
  // soPhepConLai: Yup.string().required("Trường này là bắt buộc."),
  // caLam: Yup.string().required("Trường này là bắt buộc."),
  // baoHiemXaHoi: Yup.string().required("Trường này là bắt buộc."),
  // maSoThue: Yup.string().required("Trường này là bắt buộc."),
  // CMTND: Yup.string().required("Trường này là bắt buộc."),
  // noiCap: Yup.string().required("Trường này là bắt buộc."),
  // danToc: Yup.string().required("Trường này là bắt buộc."),
  // quocTich: Yup.string().required("Trường này là bắt buộc."),
  // tinhTrangHonNhan: Yup.string().required("Trường này là bắt buộc."),
  // nguyenQuan: Yup.string().required("Trường này là bắt buộc."),
  // thuongTru: Yup.string().required("Trường này là bắt buộc."),
  // noiOHienTai: Yup.string().required("Trường này là bắt buộc."),
  // soThich: Yup.string().required("Trường này là bắt buộc."),
  // soTruong: Yup.string().required("Trường này là bắt buộc."),
  // trinhDo: Yup.string().required("Trường này là bắt buộc."),
  // truongHoc: Yup.string().required("Trường này là bắt buộc."),
  // loaiHinh: Yup.string().required("Trường này là bắt buộc."),
  // chuyenNganh: Yup.string().required("Trường này là bắt buộc."),
  // nameBo: Yup.string().required("Trường này là bắt buộc."),
  // SDTBo: Yup.string().required("Trường này là bắt buộc."),
  // nameVC: Yup.string().required("Trường này là bắt buộc."),
  // SDTVC: Yup.string().required("Trường này là bắt buộc."),
  // nameMe: Yup.string().required("Trường này là bắt buộc."),
  // SDTMe: Yup.string().required("Trường này là bắt buộc."),
  // soTK: Yup.string().required("Trường này là bắt buộc."),
  // chuTK: Yup.string().required("Trường này là bắt buộc."),
  // nganHang: Yup.string().required("Trường này là bắt buộc."),
  // chiNhanh: Yup.string().required("Trường này là bắt buộc."),
});
const EmployeeEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const { item, getList } = route.params;
  const toast = useToast();
  const jobTitleService = useJobTitleService();
  const departmentService = useDepartmentService();
  const contractService = useContractService();
  const shiftService = useShiftService();
  const levelService = useLevelService();
  const employeeService = useEmployeeService();

  const departmentOption = useSelector(
    (state) => state.department.departmentOption
  );
  const jobTitleOption = useSelector((state) => state.jobTitle.jobTitleOption);
  const contractOption = useSelector((state) => state.contract.contractOption);
  const shiftOption = useSelector((state) => state.shift.shiftOption);
  const levelOption = useSelector((state) => state.level.levelOption);
  const [loading, setLoading] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const onCloseDelete = () => {
    setOpenDelete(false);
  };
  const submitEmployee = (data) => {
    console.log(data);
    setLoading(true);
    const params = {
      C_Email: data.emailCongTy || "",
      C_MatKhau: "abcd",
      C_HoVaTen: data.tenNV || "",
      C_SoDienThoai: data.soDienThoai,
      C_Code: data.maNV,
      Fk_ChucDanh: data.chucDanh,
      Fk_PhongBan: data.phongBan,
      C_GioiTinh: data.gioiTinh,
      C_EmailCaNhan: data.emailCaNhan,
      C_NgaySinh: moment(data.ngaySinh).format("DD/MM/YYYY"),
    };
    dispatch(employeeService.editEmployee(params, onSuccessEdit, onErrorEdit));
  };
  const onSuccessEdit = () => {
    setLoading(false);
  };
  const onErrorEdit = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.employeeEdit}
        />
      ),
      placement: "top",
    });
    dispatch(setListEmployeeItem());
    getList();
    setLoading(false);
    navigation.goBack();
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

  const onSuccessDelete = () => {
    setLoading(false);
  };
  const onErrorDelete = () => {
    toast.show({
      render: () => (
        <AlertComponent
          status={NotiType.SUCCESS}
          title={NotiMessageSuccess.employeeDelete}
        />
      ),
      placement: "top",
    });
    dispatch(setListEmployeeItem());
    onCloseDelete();
    getList();
    setLoading(false);
    navigation.goBack();
  };
  const onGetListDepartment = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = ""
  ) => {
    setLoading(true);
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
    };
    dispatch(
      departmentService.GetOptionDepartmentList(data, () => setLoading(false))
    );
  };
  const onGetListJobTitle = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = ""
  ) => {
    setLoading(true);
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
    };
    dispatch(jobTitleService.GetOptionJobTitle(data, () => setLoading(false)));
  };

  const onGetListContract = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = ""
  ) => {
    setLoading(true);
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
    };
    dispatch(
      contractService.GetOptionContractList(data, () => setLoading(false))
    );
  };
  const onGetListShift = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = ""
  ) => {
    setLoading(true);
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
    };
    dispatch(shiftService.GetOptionShiftList(data, () => setLoading(false)));
  };
  const onGetListLevel = (
    pageIndex = page,
    pageSize = pageSizeDefault,
    filter = "",
    status = ""
  ) => {
    setLoading(true);
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: filter,
      status: status,
    };
    dispatch(levelService.GetOptionLevelList(data, () => setLoading(false)));
  };
  useEffect(() => {
    onGetListDepartment(1, 30);
    onGetListJobTitle(1, 30);
    onGetListContract(1, 30);
    onGetListShift(1, 30);
    onGetListLevel(1, 30);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <Header navigation={navigation} title={"Nhân viên"} isBack />
        <Box height={windowHeight - 150}>
          <ScrollView>
            <Formik
              initialValues={{
                maNV: item.c_Code || "",
                tenNV: item.c_HoVaTen || "",
                ngaySinh: moment(item.c_NgaySinh || new Date()).toDate(),
                // ngayHocViec: new Date(),
                // ngayLamChinhThuc: new Date(),
                // ngayNghiViec: new Date(),
                // dongBHXH: new Date(),
                // dungBHXH: new Date(),
                // ngayCap: new Date(),
                // ngaySinhBo: new Date(),
                // ngaySinhVC: new Date(),
                // ngaySinhMe: new Date(),
                // file: "",
                emailCaNhan: item?.c_EmailCaNhan || "",
                emailCongTy: item.c_Email || "",
                soDienThoai: item.c_SoDienThoai || "",
                gioiTinh: item.c_GioiTinh,
                phongBan: item.fk_PhongBan,
                chucDanh: item.fk_ChucDanh,
                // hopDong: "",
                // status: "",
                // soNgayNghiPhep: "",
                // phepDaSuDung: "",
                // soPhepConLai: "",
                // ghiChu: "",
                // liDoNghiViec: "",
                // caLam: "",
                // maSoThue: "",
                // baoHiemXaHoi: "",
                // noiCap: "",
                // CMTND: "",
                // danToc: "",
                // quocTich: "",
                // tinhTrangHonNhan: "",
                // nguyenQuan: "",
                // thuongTru: "",
                // noiOHienTai: "",
                // soThich: "",
                // soTruong: "",
                // trinhDo: "",
                // truongHoc: "",
                // loaiHinh: "",
                // chuyenNganh: "",
                // nameBo: "",
                // SDTBo: "",
                // nameVC: "",
                // SDTVC: "",
                // nameMe: "",
                // SDTMe: "",
                // soTK: "",
                // chuTK: "",
                // nganHang: "",
                // chiNhanh: "",
              }}
              onSubmit={(values) => submitEmployee(values)}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
                touched,
              }) => {
                const onChangDateBirth = (event, date) => {
                  setFieldValue("ngaySinh", date);
                };
                const onChangHocViec = (event, date) => {
                  setFieldValue("ngayHocViec", date);
                };
                const onChangChinhThuc = (event, date) => {
                  setFieldValue("ngayLamChinhThuc", date);
                };
                const onChangNghiViec = (event, date) => {
                  setFieldValue("ngayNghiViec", date);
                };
                const onChangDongBHXH = (event, date) => {
                  setFieldValue("dongBHXH", date);
                };
                const onChangDungBHXH = (event, date) => {
                  setFieldValue("dungBHXH", date);
                };
                const onChangNgayCap = (event, date) => {
                  setFieldValue("ngayCap", date);
                };
                const onChangNgaySinhBo = (event, date) => {
                  setFieldValue("ngaySinhBo", date);
                };
                const onChangNgaySinhVC = (event, date) => {
                  setFieldValue("ngaySinhVC", date);
                };
                const onChangNgaySinhMe = (event, date) => {
                  setFieldValue("ngaySinhMe", date);
                };
                const onChangSex = (value) => {
                  setFieldValue("gioiTinh", value);
                };
                const onChangDepartment = (value) => {
                  setFieldValue("phongBan", value);
                };
                const onChangLevel = (value) => {
                  setFieldValue("trinhDo", value);
                };
                const onChangJobTitle = (value) => {
                  setFieldValue("chucDanh", value);
                };
                const onChangContract = (value) => {
                  setFieldValue("hopDong", value);
                };
                const onChangShift = (value) => {
                  setFieldValue("caLam", value);
                };
                const onChangStatus = (value) => {
                  setFieldValue("status", value);
                };
                const onChangHonNhan = (value) => {
                  setFieldValue("tinhTrangHonNhan", value);
                };
                return (
                  <VStack mt={5} px={5}>
                    <TextFieldView
                      title="Mã nhân viên"
                      placeholder="Mã nhân viên"
                      isRequired
                      isInvalid={touched.maNV && "maNV" in errors}
                      onChangeText={handleChange("maNV")}
                      value={values.maNV}
                      onBlur={handleBlur("maNV")}
                      errors={errors.maNV}
                      touched={touched.maNV && errors.maNV}
                    />
                    <Box mt={2} />
                    <TextFieldView
                      title="Tên nhân viên"
                      placeholder="Tên nhân viên"
                      isRequired
                      isInvalid={touched.tenNV && "tenNV" in errors}
                      onChangeText={handleChange("tenNV")}
                      value={values.tenNV}
                      onBlur={handleBlur("tenNV")}
                      touched={touched.tenNV && errors.tenNV}
                      errors={errors.tenNV}
                    />
                    <Box mt={2} />
                    <SelectView
                      title="Giới tính"
                      placeholder="Giới tính"
                      isRequired
                      isInvalid={touched.gioiTinh && "gioiTinh" in errors}
                      onValueChange={onChangSex}
                      selectedValue={values.gioiTinh}
                      defaultValue={values.gioiTinh}
                      touched={touched.gioiTinh && errors.gioiTinh}
                      errors={errors.gioiTinh}
                      option={gioiTinh}
                    />
                    <Box w="100" mt={2}>
                      <DateTimeView
                        title="Ngày sinh"
                        value={values.ngaySinh}
                        mode={"date"}
                        isRequired
                        isInvalid={"ngaySinh" in errors}
                        display="default"
                        onChange={onChangDateBirth}
                      />
                    </Box>
                    <Box mt={2} />
                    {/* <TextFieldView
                    title="Nơi sinh"
                    placeholder="Nơi sinh"
                    isRequired
                    isInvalid={touched.noiSinh && "noiSinh" in errors}
                    onChangeText={handleChange("noiSinh")}
                    value={values.noiSinh}
                    onBlur={handleBlur("noiSinh")}
                    touched={touched.noiSinh && errors.noiSinh}
                    errors={errors.noiSinh}
                  /> */}
                    <TextFieldView
                      title="Email cá nhân"
                      placeholder="Email cá nhân"
                      isRequired
                      isInvalid={touched.emailCaNhan && "emailCaNhan" in errors}
                      onChangeText={handleChange("emailCaNhan")}
                      value={values.emailCaNhan}
                      onBlur={handleBlur("emailCaNhan")}
                      touched={touched.emailCaNhan && errors.emailCaNhan}
                      errors={errors.emailCaNhan}
                    />
                    <Box mt={2} />
                    <TextFieldView
                      title="Email công ty"
                      placeholder="Email công ty"
                      isRequired
                      isInvalid={touched.emailCongTy && "emailCongTy" in errors}
                      onChangeText={handleChange("emailCongTy")}
                      value={values.emailCongTy}
                      onBlur={handleBlur("emailCongTy")}
                      touched={touched.emailCongTy && errors.emailCongTy}
                      errors={errors.emailCongTy}
                    />
                    <Box mt={2} />
                    <TextFieldView
                      title="Số điện thoại"
                      placeholder="Số điện thoại"
                      isRequired
                      isInvalid={touched.soDienThoai && "soDienThoai" in errors}
                      onChangeText={handleChange("soDienThoai")}
                      value={values.soDienThoai}
                      onBlur={handleBlur("soDienThoai")}
                      touched={touched.soDienThoai && errors.soDienThoai}
                      errors={errors.soDienThoai}
                    />
                    <SelectView
                      title="Phòng ban"
                      placeholder="Phòng ban"
                      isRequired
                      isInvalid={touched.phongBan && "phongBan" in errors}
                      onValueChange={onChangDepartment}
                      selectedValue={values.phongBan}
                      defaultValue={values.phongBan}
                      touched={touched.phongBan && errors.phongBan}
                      errors={errors.phongBan}
                      option={departmentOption}
                    />
                    <SelectView
                      title="Chức danh"
                      placeholder="Chức danh"
                      isRequired
                      isInvalid={touched.chucDanh && "chucDanh" in errors}
                      onValueChange={onChangJobTitle}
                      selectedValue={values.chucDanh}
                      defaultValue={values.chucDanh}
                      touched={touched.chucDanh && errors.chucDanh}
                      errors={errors.chucDanh}
                      option={jobTitleOption}
                    />
                    {/* <Accordion allowMultiple>
                    <Accordion.Item>
                      <Accordion.Summary>
                        Thông tin cơ bản
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        
                      </Accordion.Details>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Summary>
                        Thông tin công việc
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        <SelectView
                          title="Loại hợp đồng lao động"
                          placeholder="Loại hợp đồng lao động"
                          isRequired
                          isInvalid={touched.hopDong && "hopDong" in errors}
                          onValueChange={onChangShift}
                          selectedValue={values.hopDong}
                          touched={touched.hopDong && errors.hopDong}
                          errors={errors.hopDong}
                          option={shiftOption}
                        />
                        <SelectView
                          title="Trạng thái"
                          placeholder="Trạng thái"
                          isRequired
                          isInvalid={touched.status && "status" in errors}
                          onValueChange={onChangStatus}
                          selectedValue={values.status}
                          touched={touched.status && errors.status}
                          errors={errors.status}
                          option={trangThai}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Số ngày nghỉ phép"
                          placeholder="Số ngày nghỉ phép"
                          isRequired
                          isInvalid={
                            touched.soNgayNghiPhep && "soNgayNghiPhep" in errors
                          }
                          onChangeText={handleChange("soNgayNghiPhep")}
                          value={values.soNgayNghiPhep}
                          onBlur={handleBlur("soNgayNghiPhep")}
                          touched={
                            touched.soNgayNghiPhep && errors.soNgayNghiPhep
                          }
                          errors={errors.soNgayNghiPhep}
                          keyboardType="numeric"
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Phép đã sử dụng"
                          placeholder="Phép đã sử dụng"
                          isRequired
                          isInvalid={
                            touched.phepDaSuDung && "phepDaSuDung" in errors
                          }
                          onChangeText={handleChange("phepDaSuDung")}
                          value={values.phepDaSuDung}
                          onBlur={handleBlur("phepDaSuDung")}
                          touched={touched.phepDaSuDung && errors.phepDaSuDung}
                          errors={errors.phepDaSuDung}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Số phép còn lại"
                          placeholder="Số phép còn lại"
                          isRequired
                          isInvalid={
                            touched.soPhepConLai && "soPhepConLai" in errors
                          }
                          onChangeText={handleChange("soPhepConLai")}
                          value={values.soPhepConLai}
                          onBlur={handleBlur("soPhepConLai")}
                          touched={touched.soPhepConLai && errors.soPhepConLai}
                          errors={errors.soPhepConLai}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Ghi chú"
                          placeholder="Ghi chú"
                          onChangeText={handleChange("ghiChu")}
                          value={values.ghiChu}
                          onBlur={handleBlur("ghiChu")}
                        />
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày học việc"
                            value={values.ngayHocViec}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngayHocViec" in errors}
                            display="default"
                            onChange={onChangHocViec}
                          />
                        </Box>
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày làm chính thức"
                            value={values.ngayLamChinhThuc}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngayLamChinhThuc" in errors}
                            display="default"
                            onChange={onChangChinhThuc}
                          />
                        </Box>
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày nghỉ việc"
                            value={values.ngayNghiViec}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngayNghiViec" in errors}
                            display="default"
                            onChange={onChangNghiViec}
                          />
                        </Box>
                        <Box mt={2} />
                        <TextFieldView
                          title="Lí do nghỉ việc"
                          placeholder="Lí do nghỉ việc"
                          onChangeText={handleChange("liDoNghiViec")}
                          value={values.liDoNghiViec}
                          onBlur={handleBlur("liDoNghiViec")}
                        />
                        <SelectView
                          title="Ca làm"
                          placeholder="Ca làm"
                          isRequired
                          isInvalid={touched.caLam && "caLam" in errors}
                          onValueChange={onChangShift}
                          selectedValue={values.caLam}
                          touched={touched.caLam && errors.caLam}
                          errors={errors.caLam}
                          option={shiftOption}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Mã số thuế"
                          placeholder="Mã số thuế"
                          isRequired
                          isInvalid={touched.maSoThue && "maSoThue" in errors}
                          onChangeText={handleChange("maSoThue")}
                          value={values.maSoThue}
                          onBlur={handleBlur("maSoThue")}
                          touched={touched.maSoThue && errors.maSoThue}
                          errors={errors.maSoThue}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Bảo hiểm xã hội"
                          placeholder="Bảo hiểm xã hội"
                          isRequired
                          isInvalid={
                            touched.baoHiemXaHoi && "baoHiemXaHoi" in errors
                          }
                          onChangeText={handleChange("baoHiemXaHoi")}
                          value={values.baoHiemXaHoi}
                          onBlur={handleBlur("baoHiemXaHoi")}
                          touched={touched.baoHiemXaHoi && errors.baoHiemXaHoi}
                          errors={errors.baoHiemXaHoi}
                        />
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Bắt đầu đóng BHXH"
                            value={values.dongBHXH}
                            mode={"date"}
                            isRequired
                            isInvalid={"dongBHXH" in errors}
                            display="default"
                            onChange={onChangDongBHXH}
                          />
                        </Box>
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Dừng đóng BHXH"
                            value={values.dungBHXH}
                            mode={"date"}
                            isRequired
                            isInvalid={"dungBHXH" in errors}
                            display="default"
                            onChange={onChangDungBHXH}
                          />
                        </Box>
                      </Accordion.Details>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Summary>
                        Thông tin cá nhân
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        <Box mt={2} />
                        <TextFieldView
                          title="CMTND"
                          placeholder="CMTND"
                          isRequired
                          isInvalid={touched.CMTND && "CMTND" in errors}
                          onChangeText={handleChange("CMTND")}
                          value={values.CMTND}
                          onBlur={handleBlur("CMTND")}
                          touched={touched.CMTND && errors.CMTND}
                          errors={errors.CMTND}
                        />
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày sinh bố"
                            value={values.ngayCap}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngayCap" in errors}
                            display="default"
                            onChange={onChangNgayCap}
                          />
                        </Box>
                        <Box mt={2} />
                        <TextFieldView
                          title="Nơi cấp"
                          placeholder="Nơi cấp"
                          isRequired
                          isInvalid={touched.noiCap && "noiCap" in errors}
                          onChangeText={handleChange("noiCap")}
                          value={values.noiCap}
                          onBlur={handleBlur("noiCap")}
                          touched={touched.noiCap && errors.noiCap}
                          errors={errors.noiCap}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Dân tộc"
                          placeholder="Dân tộc"
                          isRequired
                          isInvalid={touched.danToc && "danToc" in errors}
                          onChangeText={handleChange("danToc")}
                          value={values.danToc}
                          onBlur={handleBlur("danToc")}
                          touched={touched.danToc && errors.danToc}
                          errors={errors.danToc}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Quốc tịch"
                          placeholder="Quốc tịch"
                          isRequired
                          isInvalid={touched.quocTich && "quocTich" in errors}
                          onChangeText={handleChange("quocTich")}
                          value={values.quocTich}
                          onBlur={handleBlur("quocTich")}
                          touched={touched.quocTich && errors.quocTich}
                          errors={errors.quocTich}
                        />
                        <SelectView
                          title="Tình trạng hôn nhân"
                          placeholder="Tình trạng hôn nhân"
                          isRequired
                          isInvalid={
                            touched.tinhTrangHonNhan &&
                            "tinhTrangHonNhan" in errors
                          }
                          onValueChange={onChangHonNhan}
                          selectedValue={values.tinhTrangHonNhan}
                          touched={
                            touched.tinhTrangHonNhan && errors.tinhTrangHonNhan
                          }
                          errors={errors.tinhTrangHonNhan}
                          option={tinhTrangHonNhan}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Nguyên quán"
                          placeholder="Nguyên quán"
                          isRequired
                          isInvalid={
                            touched.nguyenQuan && "nguyenQuan" in errors
                          }
                          onChangeText={handleChange("nguyenQuan")}
                          value={values.nguyenQuan}
                          onBlur={handleBlur("nguyenQuan")}
                          touched={touched.nguyenQuan && errors.nguyenQuan}
                          errors={errors.nguyenQuan}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Thường trú"
                          placeholder="Thường trú"
                          isRequired
                          isInvalid={touched.thuongTru && "thuongTru" in errors}
                          onChangeText={handleChange("thuongTru")}
                          value={values.thuongTru}
                          onBlur={handleBlur("thuongTru")}
                          touched={touched.thuongTru && errors.thuongTru}
                          errors={errors.thuongTru}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Nơi ở hiện tại"
                          placeholder="Nơi ở hiện tại"
                          isRequired
                          isInvalid={
                            touched.noiOHienTai && "noiOHienTai" in errors
                          }
                          onChangeText={handleChange("noiOHienTai")}
                          value={values.noiOHienTai}
                          onBlur={handleBlur("noiOHienTai")}
                          touched={touched.noiOHienTai && errors.noiOHienTai}
                          errors={errors.noiOHienTai}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Sở thích"
                          placeholder="Sở thích"
                          isRequired
                          isInvalid={touched.soThich && "soThich" in errors}
                          onChangeText={handleChange("soThich")}
                          value={values.soThich}
                          onBlur={handleBlur("soThich")}
                          touched={touched.soThich && errors.soThich}
                          errors={errors.soThich}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Sở trường"
                          placeholder="Sở trường"
                          isRequired
                          isInvalid={touched.soTruong && "soTruong" in errors}
                          onChangeText={handleChange("soTruong")}
                          value={values.soTruong}
                          onBlur={handleBlur("soTruong")}
                          touched={touched.soTruong && errors.soTruong}
                          errors={errors.soTruong}
                        />
                      </Accordion.Details>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Summary>
                        Học vấn
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        <SelectView
                          title="Trình độ"
                          placeholder="Trình độ"
                          isRequired
                          isInvalid={touched.trinhDo && "trinhDo" in errors}
                          onValueChange={onChangLevel}
                          selectedValue={values.trinhDo}
                          touched={touched.trinhDo && errors.trinhDo}
                          errors={errors.trinhDo}
                          option={levelOption}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Trường học"
                          placeholder="Trường học"
                          isRequired
                          isInvalid={touched.truongHoc && "truongHoc" in errors}
                          onChangeText={handleChange("truongHoc")}
                          value={values.truongHoc}
                          onBlur={handleBlur("truongHoc")}
                          touched={touched.truongHoc && errors.truongHoc}
                          errors={errors.truongHoc}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Chuyên ngành"
                          placeholder="Chuyên ngành"
                          isRequired
                          isInvalid={
                            touched.chuyenNganh && "chuyenNganh" in errors
                          }
                          onChangeText={handleChange("chuyenNganh")}
                          value={values.chuyenNganh}
                          onBlur={handleBlur("chuyenNganh")}
                          touched={touched.chuyenNganh && errors.chuyenNganh}
                          errors={errors.chuyenNganh}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Loại hình đào tạo"
                          placeholder="Loại hình đào tạo"
                          isRequired
                          isInvalid={touched.loaiHinh && "loaiHinh" in errors}
                          onChangeText={handleChange("loaiHinh")}
                          value={values.loaiHinh}
                          onBlur={handleBlur("loaiHinh")}
                          touched={touched.loaiHinh && errors.loaiHinh}
                          errors={errors.loaiHinh}
                        />
                      </Accordion.Details>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Summary>
                        Thông tin gia đình
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        <TextFieldView
                          title="Họ tên bố"
                          placeholder="Họ tên bố"
                          isRequired
                          isInvalid={touched.nameBo && "nameBo" in errors}
                          onChangeText={handleChange("nameBo")}
                          value={values.nameBo}
                          onBlur={handleBlur("nameBo")}
                          touched={touched.nameBo && errors.nameBo}
                          errors={errors.nameBo}
                        />
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày sinh bố"
                            value={values.ngaySinhBo}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngaySinhBo" in errors}
                            display="default"
                            onChange={onChangNgaySinhBo}
                          />
                        </Box>
                        <Box mt={2} />
                        <TextFieldView
                          title="Số điện thoại bố"
                          placeholder="Số điện thoại bố"
                          isRequired
                          isInvalid={touched.SDTBo && "SDTBo" in errors}
                          onChangeText={handleChange("SDTBo")}
                          value={values.SDTBo}
                          onBlur={handleBlur("SDTBo")}
                          touched={touched.SDTBo && errors.SDTBo}
                          errors={errors.SDTBo}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Họ tên mẹ"
                          placeholder="Họ tên mẹ"
                          isRequired
                          isInvalid={touched.nameMe && "nameMe" in errors}
                          onChangeText={handleChange("nameMe")}
                          value={values.nameMe}
                          onBlur={handleBlur("nameMe")}
                          touched={touched.nameMe && errors.nameMe}
                          errors={errors.nameMe}
                        />
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày sinh mẹ"
                            value={values.ngaySinhMe}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngaySinhMe" in errors}
                            display="default"
                            onChange={onChangNgaySinhMe}
                          />
                        </Box>
                        <Box mt={2} />
                        <TextFieldView
                          title="Số điện thoại mẹ"
                          placeholder="Số điện thoại mẹ"
                          isRequired
                          isInvalid={touched.SDTMe && "SDTMe" in errors}
                          onChangeText={handleChange("SDTMe")}
                          value={values.SDTMe}
                          onBlur={handleBlur("SDTMe")}
                          touched={touched.SDTMe && errors.SDTMe}
                          errors={errors.SDTMe}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Họ tên vợ/chồng"
                          placeholder="Họ tên vợ/chồng"
                          isRequired
                          isInvalid={touched.nameVC && "nameVC" in errors}
                          onChangeText={handleChange("nameVC")}
                          value={values.nameVC}
                          onBlur={handleBlur("nameVC")}
                          touched={touched.nameVC && errors.nameVC}
                          errors={errors.nameVC}
                        />
                        <Box w="100" mt={2}>
                          <DateTimeView
                            title="Ngày sinh vợ/chồng"
                            value={values.ngaySinhVC}
                            mode={"date"}
                            isRequired
                            isInvalid={"ngaySinhVC" in errors}
                            display="default"
                            onChange={onChangNgaySinhVC}
                          />
                        </Box>
                        <Box mt={2} />
                        <TextFieldView
                          title="Số điện thoại vợ/chồng"
                          placeholder="Số điện thoại vợ/chồng"
                          isRequired
                          isInvalid={touched.SDTVC && "SDTVC" in errors}
                          onChangeText={handleChange("SDTVC")}
                          value={values.SDTVC}
                          onBlur={handleBlur("SDTVC")}
                          touched={touched.SDTVC && errors.SDTVC}
                          errors={errors.SDTVC}
                        />
                      </Accordion.Details>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Summary>
                        Tài khoản ngân hàng
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        <TextFieldView
                          title="Số TK"
                          placeholder="Số TK"
                          isRequired
                          isInvalid={touched.soTK && "soTK" in errors}
                          onChangeText={handleChange("soTK")}
                          value={values.soTK}
                          onBlur={handleBlur("soTK")}
                          touched={touched.soTK && errors.soTK}
                          errors={errors.soTK}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Chủ TK"
                          placeholder="Chủ TK"
                          isRequired
                          isInvalid={touched.chuTK && "chuTK" in errors}
                          onChangeText={handleChange("chuTK")}
                          value={values.chuTK}
                          onBlur={handleBlur("chuTK")}
                          touched={touched.chuTK && errors.chuTK}
                          errors={errors.chuTK}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Ngân hàng"
                          placeholder="Ngân hàng"
                          isRequired
                          isInvalid={touched.nganHang && "nganHang" in errors}
                          onChangeText={handleChange("nganHang")}
                          value={values.nganHang}
                          onBlur={handleBlur("nganHang")}
                          touched={touched.nganHang && errors.nganHang}
                          errors={errors.nganHang}
                        />
                        <Box mt={2} />
                        <TextFieldView
                          title="Chi nhánh"
                          placeholder="Chi nhánh"
                          isRequired
                          isInvalid={touched.chiNhanh && "chiNhanh" in errors}
                          onChangeText={handleChange("chiNhanh")}
                          value={values.chiNhanh}
                          onBlur={handleBlur("chiNhanh")}
                          touched={touched.chiNhanh && errors.chiNhanh}
                          errors={errors.chiNhanh}
                        />
                      </Accordion.Details>
                    </Accordion.Item> */}
                    {/* <Accordion.Item>
                      <Accordion.Summary>
                        File đính kèm
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </Accordion.Details>
                    </Accordion.Item> 
                  </Accordion>*/}

                    <HStack
                      space={3}
                      mt={3}
                      justifyContent="space-between"
                      w="auto"
                    >
                      <ButtonDelete
                        w="45%"
                        title="Xóa"
                        onPress={handleDelete}
                      />
                      <ButtonSave
                        w="45%"
                        title="Lưu"
                        _disabled={loading}
                        isLoading={loading}
                        isLoadingText={"Đang lưu"}
                        onPress={handleSubmit}
                      />
                    </HStack>
                  </VStack>
                );
              }}
            </Formik>
          </ScrollView>
        </Box>
        <DeleteAlert
          loading={loading}
          openDelete={openDelete}
          onClose={onCloseDelete}
          onSubmitDelete={onSubmitDelete}
        />
      </Box>
    </SafeAreaView>
  );
};

export default EmployeeEditScreen;
