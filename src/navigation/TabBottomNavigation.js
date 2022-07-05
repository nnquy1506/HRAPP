import React, { memo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SCREEN_NAME from "../constants/ScreenName";
import { COLORS } from "../constants/Theme";
import { Icon, IconButton, StatusBar, useTheme } from "native-base";
import { navigate, navigationRef } from "../ultis/navigationHelpers";
import { get, isEmpty } from "lodash";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ManageScreen from "../screens/ManageScreen";
import NotificationScreen from "../screens/NotificationScreen/";
import PersonScreen from "../screens/PersonScreen";
import ManageCategory from "../screens/ManageCategory";
import AllowanceScreen from "../screens/AllowanceScreen";
import AllowanceCreateScreen from "../screens/AllowanceScreen/AllowanceCreate";
import AllowanceEdit from "../screens/AllowanceScreen/AllowanceEdit";
import JobTitleScreen from "../screens/JobTitleScreen";
import JobTitleCreateScreen from "../screens/JobTitleScreen/JobTitleCreate";
import JobTitleEditScreen from "../screens/JobTitleScreen/JobTitleEdit";
import InsuranceScreen from "../screens/InsuranceScreen";
import InsuranceCreateScreen from "../screens/InsuranceScreen/InsuranceCreate";
import InsuranceEditScreen from "../screens/InsuranceScreen/InsuranceEdit";
import TimeKeeperScreen from "../screens/TimeKeeperScreen";
import TimeKeeperCreateScreen from "../screens/TimeKeeperScreen/TimeKeeperCreate";
import TimeKeeperEditScreen from "../screens/TimeKeeperScreen/TimeKeeperEdit";
import LevelScreen from "../screens/LevelScreen";
import LevelCreateScreen from "../screens/LevelScreen/LevelCreate";
import LevelEditScreen from "../screens/LevelScreen/LevelEdit";
import DepartmentScreen from "../screens/DepartmentScreen";
import DepartmentCreateScreen from "../screens/DepartmentScreen/DepartmentCreate";
import DepartmentEditScreen from "../screens/DepartmentScreen/DepartmentEdit";
import ShiftScreen from "../screens/ShiftScreen";
import ShiftCreateScreen from "../screens/ShiftScreen/ShiftCreate";
import ShiftEditScreen from "../screens/ShiftScreen/ShiftEdit";
import HolidayScreen from "../screens/HolidayScreen";
import HolidayCreateScreen from "../screens/HolidayScreen/HolidayCreate";
import HolidayEditScreen from "../screens/HolidayScreen/HolidayEdit";
import ContractScreen from "../screens/ContractScreen";
import ContractCreateScreen from "../screens/ContractScreen/ContractCreate";
import ContractEditScreen from "../screens/ContractScreen/ContractEdit";
import EmployeeScreen from "../screens/EmployeeScreen";
import EmployeeCreateScreen from "../screens/EmployeeScreen/EmployeeCreate";
import EmployeeEditScreen from "../screens/EmployeeScreen/EmployeeEdit";
import DevScreen from "../screens/DevScreen";
import SalaryCategoryScreen from "../screens/SalaryCategoryScreen";
import PersonTaxScreen from "../screens/PersonTaxScreen";
import KindOfOvertimeScreen from "../screens/KindOfOvertimeScreen";
import KindOfOverTimeCreateScreen from "../screens/KindOfOvertimeScreen/KindOfOvertimeCreate";
import KindOfOvertimeEditScreen from "../screens/KindOfOvertimeScreen/KindOfOvertimeEdit";
import PersonTaxCreateScreen from "../screens/PersonTaxScreen/PersonTaxCreate";
import PersonTaxEditScreen from "../screens/PersonTaxScreen/PersonTaxEdit";
import LoginScreen from "../screens/LoginScreen";
import { Platform } from "react-native";
import TimesheetScreen from "../screens/TimesheetScreen";
import TimekeepingHisScreen from "../screens/TimekeepingHisScreen";
import { useSelector } from "react-redux";
import TimeKeepingTabBar from "../components/TabBar";
import EmployeeInActiveScreen from "../screens/EmployeeInActiveScreen";
import RoleScreen from "../screens/RoleScreen";
import CreateRoleScreen from "../screens/RoleScreen/CreateRole";
import ContractCategoryScreen from "../screens/ContractCategory";
import LeaveDeclareScreen from "../screens/LeaveDeclareScreen";
import LeaveDeclareCreateScreen from "../screens/LeaveDeclareScreen/LeaveDeclareCreate";
import DeclareOvertimeScreen from "../screens/DeclareOvertimeScreen";
import DeclareOvertimeCreateScreen from "../screens/DeclareOvertimeScreen/DeclareOvertimeCreate";
import IncomeCreatecreen from "../screens/PersonTaxScreen/IncomeCreate";
import SalaryCalScreen from "../screens/SalaryCalScreen";
import SalaryCalCreateScreen from "../screens/SalaryCalScreen/SalaryCalCreate";
import DetailSalaryScreen from "../screens/SalaryCalScreen/DetailSalary";
import SalaryDetailScreen from "../screens/SalaryCalScreen/SalaryDetail";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ContractDetailScreen from "../screens/ContractDetailScreen";
import ContractDetailCreateScreen from "../screens/ContractDetailScreen/ContractDetailCreate";
// const Tab = createMaterialBottomTabNavigator();
// const RootStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  const { colors } = useTheme();
  // const { isLoading } = useGetAllData();

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 86,
          paddingTop: 5,
          paddingBottom: Platform.OS === "ios" ? 25 : 15,
        },
        headerTitle: "",
        headerTitleAlign: "left",
        headerBackTitle: "",
        headerShadowVisible: false,
        headerTintColor: get(colors, "primary.700"),
        headerTitleStyle: {
          color: get(colors, "grey.900"),
          fontWeight: "bold",
          fontSize: 28,
        },
        tabBarActiveTintColor: get(colors, "primary.700"),
        tabBarInactiveTintColor: get(colors, "grey.400"),
        headerRight: () => (
          <IconButton
            icon={<Icon />}
            _icon={{
              as: Ionicons,
              name: "person-circle-outline",
              color: get(colors, "primary.700"),
              size: "28",
            }}
            _pressed={{
              opacity: 0.5,
              backgroundColor: "white",
            }}
            onPress={() => navigate(SCREEN_NAME.PERSON_SCREEN)}
          />
        ),
        lazy: true,
      }}
    >
      <Tab.Screen
        name={SCREEN_NAME.TIMEKEEPING}
        component={TimeKeepingTabs}
        options={{
          tabBarLabel: "Chấm công",
          headerTitle: "Chấm công",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                as={Ionicons}
                name={focused ? "time" : "time-outline"}
                color="primary.700"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.MANAGE_SCREEN}
        component={ManageScreen}
        options={{
          tabBarLabel: "Quản lý",
          headerTitle: "Quản lý",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                as={Ionicons}
                name={focused ? "layers" : "layers-outline"}
                color="primary.700"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.EMPLOYEE}
        component={EmployeeTab}
        options={{
          tabBarLabel: "Nhân viên",
          headerTitle: "Nhân viên",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                as={Ionicons}
                name={focused ? "people" : "people-outline"}
                color="primary.700"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const TimeKeepingTabs = memo(() => {
  const { colors } = useTheme();
  return (
    <TopTab.Navigator
      tabBarPosition="top"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: get(colors, "primary.700"),
        tabBarInactiveTintColor: get(colors, "grey.400"),
        tabBarLabelStyle: { fontWeight: "bold", textTransform: "none" },
        tabBarIndicatorStyle: {
          borderRadius: 2,
          height: 3,
          backgroundColor: get(colors, "primary.700"),
        },
        lazy: true,
      }}
      style={{ backgroundColor: "#F6F8FA" }}
      tabBar={(props) => (
        <TimeKeepingTabBar
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
        />
      )}
    >
      <TopTab.Screen
        name={SCREEN_NAME.TIMEKEEPING_HISTORY_SCREEN}
        component={TimekeepingHisScreen}
        options={{
          tabBarLabel: "Lịch sử chấm công",
        }}
      />
      <TopTab.Screen
        name={SCREEN_NAME.TIMESHEETS_SCREEN}
        component={TimesheetScreen}
        options={{
          tabBarLabel: "Bảng chấm công",
        }}
      />
    </TopTab.Navigator>
  );
});

const EmployeeTab = memo(() => {
  const { colors } = useTheme();
  return (
    <TopTab.Navigator
      tabBarPosition="top"
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: get(colors, "primary.700"),
        tabBarInactiveTintColor: get(colors, "grey.400"),
        tabBarLabelStyle: { fontWeight: "bold", textTransform: "none" },
        tabBarIndicatorStyle: {
          borderRadius: 2,
          height: 3,
          backgroundColor: get(colors, "primary.700"),
        },
        lazy: true,
      }}
      style={{ backgroundColor: "#F6F8FA" }}
      tabBar={(props) => (
        <TimeKeepingTabBar
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
        />
      )}
    >
      <TopTab.Screen
        name={SCREEN_NAME.EMPLOYEE_SCREEN}
        component={EmployeeScreen}
        options={{
          tabBarLabel: "Hoạt động",
        }}
      />
      <TopTab.Screen
        name={SCREEN_NAME.EMPLOYEE_INACTIVE_SCREEN}
        component={EmployeeInActiveScreen}
        options={{
          tabBarLabel: "Nghỉ việc",
        }}
      />
    </TopTab.Navigator>
  );
});

const Navigation = () => {
  const { colors } = useTheme();

  let initialRouteName;
  const getData = async () => {
    try {
      const access_token = await AsyncStorage.getItem("accessToken");
      if (!isEmpty(access_token)) {
        initialRouteName = SCREEN_NAME.HOME_SCREEN;
      } else {
        initialRouteName = SCREEN_NAME.LOGIN_SCREEN;
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerTitleAlign: "left",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerTintColor: get(colors, "primary.700"),
            headerTitleStyle: {
              color: get(colors, "grey.900"),
              fontWeight: "bold",
              fontSize: 18,
            },
            headerTitle: "",
          }}
        >
          <Stack.Screen
            name={SCREEN_NAME.LOGIN_SCREEN}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={SCREEN_NAME.HOME_SCREEN}
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={SCREEN_NAME.MANAGE_SCREEN}
            component={ManageScreen}
            options={{
              headerTitle: "Công cụ quản lý",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.MANAGE_CATEGORY}
            component={ManageCategory}
            options={{
              headerTitle: "Quản lý danh mục",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CONTRACT_CATEGORY}
            component={ContractCategoryScreen}
            options={{
              headerTitle: "Quản lý hợp đồng",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.ALLOWANCE_SCREEN}
            component={AllowanceScreen}
            options={{
              headerTitle: "Loại phụ cấp",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.ALLOWANCE_CREATE_SCREEN}
            component={AllowanceCreateScreen}
            options={{
              headerTitle: "Loại phụ cấp",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.ALLOWANCE_EDIT_SCREEN}
            component={AllowanceEdit}
            options={{
              headerTitle: "Loại phụ cấp",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.JOB_TITLE_SCREEN}
            component={JobTitleScreen}
            options={{
              headerTitle: "Chức danh",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.JOB_TITLE_CREATE_SCREEN}
            component={JobTitleCreateScreen}
            options={{
              headerTitle: "Thêm mới chức danh",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.JOB_TITLE_EDIT_SCREEN}
            component={JobTitleEditScreen}
            options={{
              headerTitle: "Chức danh",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.INSURANCE_SCREEN}
            component={InsuranceScreen}
            options={{
              headerTitle: "Bảo hiểm",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.INSURANCE_CREATE_SCREEN}
            component={InsuranceCreateScreen}
            options={{
              headerTitle: "Bảo hiểm",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.INSURANCE_EDIT_SCREEN}
            component={InsuranceEditScreen}
            options={{
              headerTitle: "Bảo hiểm",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.TIMEKEEPER_SCREEN}
            component={TimeKeeperScreen}
            options={{
              headerTitle: "Máy chấm công",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.TIMEKEEPER_CREATE_SCREEN}
            component={TimeKeeperCreateScreen}
            options={{
              headerTitle: "Máy chấm công",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.TIMEKEEPER_EDIT_SCREEN}
            component={TimeKeeperEditScreen}
            options={{
              headerTitle: "Máy chấm công",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.LEVEL_SCREEN}
            component={LevelScreen}
            options={{
              headerTitle: "Trình độ",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.LEVEL_CREATE_SCREEN}
            component={LevelCreateScreen}
            options={{
              headerTitle: "Trình độ",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.LEVEL_EDIT_SCREEN}
            component={LevelEditScreen}
            options={{
              headerTitle: "Trình độ",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DEPARTMENT_SCREEN}
            component={DepartmentScreen}
            options={{
              headerTitle: "Phòng ban",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DEPARTMENT_CREATE_SCREEN}
            component={DepartmentCreateScreen}
            options={{
              headerTitle: "Phòng ban",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DEPARTMENT_EDIT_SCREEN}
            component={DepartmentEditScreen}
            options={{
              headerTitle: "Phòng ban",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.SHIFT_SCREEN}
            component={ShiftScreen}
            options={{
              headerTitle: "Ca làm",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.SHIFT_CREATE_SCREEN}
            component={ShiftCreateScreen}
            options={{
              headerTitle: "Ca làm",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.SHIFT_EDIT_SCREEN}
            component={ShiftEditScreen}
            options={{
              headerTitle: "Ca làm",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.HOLIDAY_SCREEN}
            component={HolidayScreen}
            options={{
              headerTitle: "Ngày nghỉ",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.HOLIDAY_CREATE_SCREEN}
            component={HolidayCreateScreen}
            options={{
              headerTitle: "Ngày nghỉ",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.HOLIDAY_EDIT_SCREEN}
            component={HolidayEditScreen}
            options={{
              headerTitle: "Ngày nghỉ",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CONTRACT_SCREEN}
            component={ContractScreen}
            options={{
              headerTitle: "Loại hợp đồng",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CONTRACT_CREATE_SCREEN}
            component={ContractCreateScreen}
            options={{
              headerTitle: "Thêm mới loại hợp đồng",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CONTRACT_EDIT_SCREEN}
            component={ContractEditScreen}
            options={{
              headerTitle: "Hợp đồng",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.EMPLOYEE_SCREEN}
            component={EmployeeScreen}
          />
          <Stack.Screen
            name={SCREEN_NAME.EMPLOYEE_CREATE_SCREEN}
            component={EmployeeCreateScreen}
            options={{
              headerTitle: "Thêm mới nhân viên",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.EMPLOYEE_EDIT_SCREEN}
            component={EmployeeEditScreen}
          />
          <Stack.Screen name={SCREEN_NAME.DEV_SCREEN} component={DevScreen} />
          <Stack.Screen
            name={SCREEN_NAME.SALARY_CATEGORY_SCREEN}
            component={SalaryCategoryScreen}
            options={{
              headerTitle: "Quản lý tiền lương",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.PERSON_TAX_SCREEN}
            component={PersonTaxScreen}
            options={{
              headerTitle: "Thuế thu nhập cá nhân",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.KIND_OF_OVERTIME_SCREEN}
            component={KindOfOvertimeScreen}
            options={{
              headerTitle: "Loại tăng ca",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.PERSON_TAX_CREATE_SCREEN}
            component={PersonTaxCreateScreen}
            options={{
              headerTitle: "Thêm mới thuế thu nhập cá nhân",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.PERSON_TAX_EDIT_SCREEN}
            component={PersonTaxEditScreen}
            options={{
              headerTitle: "Thuế thu nhập cá nhân",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.KIND_OF_OVERTIME_CREATE_SCREEN}
            component={KindOfOverTimeCreateScreen}
            options={{
              headerTitle: "Loại tăng ca",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.KIND_OF_OVERTIME_EDIT_SCREEN}
            component={KindOfOvertimeEditScreen}
            options={{
              headerTitle: "Loại tăng ca",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.PERSON_SCREEN}
            component={PersonScreen}
            options={{
              headerTitle: "Quản lý tài khoản",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.ROLE_SCREEN}
            component={RoleScreen}
            options={{
              headerTitle: "Quản lý quyền truy cập",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.ROLE_CREATE_SCREEN}
            component={CreateRoleScreen}
            options={{
              headerTitle: "Thêm mới quyền",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.LEAVE_SCREEN}
            component={LeaveDeclareScreen}
            options={{
              headerTitle: "Danh sách nghỉ phép",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.LEAVE_CREATE_SCREEN}
            component={LeaveDeclareCreateScreen}
            options={{
              headerTitle: "Khai báo nghỉ phép",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DECLARE_OVERTIME_SCREEN}
            component={DeclareOvertimeScreen}
            options={{
              headerTitle: "Khai báo tăng ca",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DECLARE_OVERTIME_CREATE_SCREEN}
            component={DeclareOvertimeCreateScreen}
            options={{
              headerTitle: "Khai báo tăng ca",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.INCOME_CREATE_SCREEN}
            component={IncomeCreatecreen}
            options={{
              headerTitle: "Thêm mới mức thu nhập",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.SALARY_CAL_SCREEN}
            component={SalaryCalScreen}
            options={{
              headerTitle: "Bảng tính lương",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.SALARY_CAL_CREATE_SCREEN}
            component={SalaryCalCreateScreen}
            options={{
              headerTitle: "Thêm mới đợt tính lương",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DETAIL_SALARY_SCREEN}
            component={DetailSalaryScreen}
            options={{
              headerTitle: "Chi tiết bảng lương",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.DETAIL_SALARY_EMPLOYEE_SCREEN}
            component={SalaryDetailScreen}
            options={{
              headerTitle: "Chi tiết bảng lương của nhân viên",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CHANGE_PASSWORD_SCREEN}
            component={ChangePasswordScreen}
            options={{
              headerTitle: "Đổi mật khẩu",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CONTRACT_DETAIL_SCREEN}
            component={ContractDetailScreen}
            options={{
              headerTitle: "Chi tiết hợp đồng",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.CONTRACT_DETAIL_CREATE_SCREEN}
            component={ContractDetailCreateScreen}
            options={{
              headerTitle: "Thêm mới chi tiết hợp đồng",
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.EMPLOYEE_PICK_SCREEN}
            component={EmployeeScreen}
            options={{
              headerTitle: "Danh sách nhân viên",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar
        backgroundColor={get(colors, "shades.0")}
        barStyle="dark-content"
      />
    </>
  );
};

export default Navigation;
