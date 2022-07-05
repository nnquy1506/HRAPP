import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SCREEN_NAME from "../constants/ScreenName";

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

const ManageScreenStack = createNativeStackNavigator();
const HomeScreenStack = createNativeStackNavigator();
const NotificationScreenStack = createNativeStackNavigator();
const PersonScreenStack = createNativeStackNavigator();

const ManageScreenNavigator = () => {
  return (
    <ManageScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <ManageScreenStack.Screen
        name={SCREEN_NAME.MANAGE_SCREEN}
        component={ManageScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.MANAGE_CATEGORY}
        component={ManageCategory}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.ALLOWANCE_SCREEN}
        component={AllowanceScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.ALLOWANCE_CREATE_SCREEN}
        component={AllowanceCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.ALLOWANCE_EDIT_SCREEN}
        component={AllowanceEdit}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.JOB_TITLE_SCREEN}
        component={JobTitleScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.JOB_TITLE_CREATE_SCREEN}
        component={JobTitleCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.JOB_TITLE_EDIT_SCREEN}
        component={JobTitleEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.INSURANCE_SCREEN}
        component={InsuranceScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.INSURANCE_CREATE_SCREEN}
        component={InsuranceCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.INSURANCE_EDIT_SCREEN}
        component={InsuranceEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.TIMEKEEPER_SCREEN}
        component={TimeKeeperScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.TIMEKEEPER_CREATE_SCREEN}
        component={TimeKeeperCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.TIMEKEEPER_EDIT_SCREEN}
        component={TimeKeeperEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.LEVEL_SCREEN}
        component={LevelScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.LEVEL_CREATE_SCREEN}
        component={LevelCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.LEVEL_EDIT_SCREEN}
        component={LevelEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.DEPARTMENT_SCREEN}
        component={DepartmentScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.DEPARTMENT_CREATE_SCREEN}
        component={DepartmentCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.DEPARTMENT_EDIT_SCREEN}
        component={DepartmentEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.SHIFT_SCREEN}
        component={ShiftScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.SHIFT_CREATE_SCREEN}
        component={ShiftCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.SHIFT_EDIT_SCREEN}
        component={ShiftEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.HOLIDAY_SCREEN}
        component={HolidayScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.HOLIDAY_CREATE_SCREEN}
        component={HolidayCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.HOLIDAY_EDIT_SCREEN}
        component={HolidayEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.CONTRACT_SCREEN}
        component={ContractScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.CONTRACT_CREATE_SCREEN}
        component={ContractCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.CONTRACT_EDIT_SCREEN}
        component={ContractEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.EMPLOYEE_SCREEN}
        component={EmployeeScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.EMPLOYEE_CREATE_SCREEN}
        component={EmployeeCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.EMPLOYEE_EDIT_SCREEN}
        component={EmployeeEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.DEV_SCREEN}
        component={DevScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.SALARY_CATEGORY_SCREEN}
        component={SalaryCategoryScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.PERSON_TAX_SCREEN}
        component={PersonTaxScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.KIND_OF_OVERTIME_SCREEN}
        component={KindOfOvertimeScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.PERSON_TAX_CREATE_SCREEN}
        component={PersonTaxCreateScreen}
      />

      <ManageScreenStack.Screen
        name={SCREEN_NAME.PERSON_TAX_EDIT_SCREEN}
        component={PersonTaxEditScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.KIND_OF_OVERTIME_CREATE_SCREEN}
        component={KindOfOverTimeCreateScreen}
      />
      <ManageScreenStack.Screen
        name={SCREEN_NAME.KIND_OF_OVERTIME_EDIT_SCREEN}
        component={KindOfOvertimeEditScreen}
      />
    </ManageScreenStack.Navigator>
  );
};
const HomeScreenNavigator = () => {
  return (
    <HomeScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeScreenStack.Screen
        name={SCREEN_NAME.HOME_SCREEN}
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
    </HomeScreenStack.Navigator>
  );
};
const NotificationScreenNavigator = () => {
  return (
    <NotificationScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificationScreenStack.Screen
        name={SCREEN_NAME.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{ title: "Thông báo" }}
      />
    </NotificationScreenStack.Navigator>
  );
};
const PersonScreenNavigator = () => {
  return (
    <PersonScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <PersonScreenStack.Screen
        name={SCREEN_NAME.PERSON_SCREEN}
        component={PersonScreen}
        options={{ title: "Cá nhân" }}
      />
    </PersonScreenStack.Navigator>
  );
};
export {
  PersonScreenNavigator,
  NotificationScreenNavigator,
  HomeScreenNavigator,
  ManageScreenNavigator,
};
