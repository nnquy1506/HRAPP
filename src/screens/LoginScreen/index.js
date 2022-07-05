import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../components/AuthContext/context";
import { Login } from "../../redux/Authentication/authentication.store";
import { useDispatch } from "react-redux";
import {
  getCurrentUser,
  setAccesstoken,
} from "../../redux/Authentication/authentication.action";
import { setRoot } from "../../ultis/navigationHelpers";
import SCREEN_NAME from "../../constants/ScreenName";
import jwt_decode from "jwt-decode";
import { useRoleService } from "../../redux/Role/role.service";
import { useJobTitleService } from "../../redux/JobTitle/jobTitle.service";
import { useDepartmentService } from "../../redux/Department/department.service";
import { useLevelService } from "../../redux/Level/level.service";
import { useShiftService } from "../../redux/Shift/shift.service";
import { useKindOfOverTimeService } from "../../redux/KindOfOvertime/kindOfOvertime.service";
import { useContractService } from "../../redux/Contract/contract.service";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập email hợp lệ.")
    .required("Email là bắt buộc.")
    .label("Email"),
  password: Yup.string()
    // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    // .matches(/\d/, "Password must have a number")
    // .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Mật khẩu là bắt buộc.")
    .label("Mật khẩu"),
});
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const roleServices = useRoleService();
  const jobTitleService = useJobTitleService();
  const departmentService = useDepartmentService();
  const levelService = useLevelService();
  const shiftService = useShiftService();
  const kindOfOvertimeService = useKindOfOverTimeService();
  const contractService = useContractService();
  const onSubmit = async (value) => {
    if (!value) return;
    setLoading(true);
    const data = {
      CTaiKhoan: value.email || "",
      CMatKhau: value.password || "",
    };
    const res = await Login(data);
    if (res.accessToken) {
      const decoded = jwt_decode(res.accessToken);
      dispatch(getCurrentUser(decoded));
      dispatch(setAccesstoken(res.accessToken));
      await AsyncStorage.setItem("accessToken", res.accessToken);
      dispatch(
        roleServices.GetListRole({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      dispatch(
        jobTitleService.GetJobTitleList({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      dispatch(
        departmentService.GetDepartmentList({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      dispatch(
        levelService.GetLevelList({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      dispatch(
        shiftService.GetShiftList({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      dispatch(
        kindOfOvertimeService.GetKindOfOverTimeList({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      dispatch(
        contractService.GetContractList({
          pageIndex: 1,
          pageSize: 10,
          filter: "",
          status: "",
        })
      );
      setRoot(SCREEN_NAME.HOME_SCREEN);
    } else {
      setMessage("Bạn đã nhập sai tài khoản hoặc mật khẩu!");
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Box flex={1} p={2} mt="2" w="90%" mx="auto">
            <Heading size="xl" color="primary.700">
              Chào mừng C6Tech
            </Heading>
            <Heading color="muted.400" size="md">
              Đăng nhập để tiếp tục
            </Heading>
            <VStack space={2} mt={5}>
              <FormControl
                isRequired
                isInvalid={touched.email && "email" in errors}
              >
                <FormControl.Label
                  _text={{
                    color: "muted.700",
                    fontSize: "md",
                    fontWeight: 600,
                  }}
                >
                  Email
                </FormControl.Label>
                <Input
                  onBlur={handleBlur("email")}
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  fontSize="16"
                />
                {errors.email && touched.email && (
                  <FormControl.ErrorMessage>
                    {errors.email}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                isRequired
                isInvalid={touched.password && "password" in errors}
              >
                <FormControl.Label
                  _text={{
                    color: "muted.700",
                    fontSize: "md",
                    fontWeight: 600,
                  }}
                >
                  Mật khẩu
                </FormControl.Label>
                <Input
                  type="password"
                  onBlur={handleBlur("password")}
                  placeholder="Mật khẩu"
                  onChangeText={handleChange("password")}
                  value={values.password}
                  fontSize="16"
                />
                {errors.password && touched.password && (
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              {message && <Text color="danger.500">{message}</Text>}
              <VStack space={2}>
                <Button
                  py="3"
                  isLoading={loading}
                  onPress={handleSubmit}
                  colorScheme="cyan"
                  _text={{ color: "white" }}
                >
                  Đăng nhập
                </Button>
              </VStack>
            </VStack>
          </Box>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;
