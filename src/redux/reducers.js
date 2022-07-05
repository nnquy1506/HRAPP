import { combineReducers } from "redux";
import AllowanceReducer from "./Allowance";
import AuthenticationReducer from "./Authentication";
import ContractReducer from "./Contract";
import DeclareOverTimeReducer from "./DeclareOvertime";
import DepartmentReducer from "./Department";
import DetailContractReducer from "./DetailContract";
import EmployeeReducer from "./Employee";
import HolidayReducer from "./Holiday";
import homePage from "./homePage";
import InsuranceReducer from "./Insurance";
import JobTitleReducer from "./JobTitle";
import KindOfOverTimeReducer from "./KindOfOvertime";
import LeaveDeclareReducer from "./LeaveDeclare";
import LevelReducer from "./Level";
import PersonTaxReducer from "./PersonTax";
import RoleReducer from "./Role/role.reducer";
import SalaryCalReducer from "./SalaryCalculation";
import ShiftReducer from "./Shift";
import TimeKeeperReducer from "./TimeKeeper/timeKeeper.reducer";
import TimekeepingReducer from "./TimeKeeping";
import TimesheetReducer from "./TimeSheet";

export default combineReducers({
  homePage,
  allowance: AllowanceReducer,
  jobTitle: JobTitleReducer,
  insurance: InsuranceReducer,
  timeKeeper: TimeKeeperReducer,
  level: LevelReducer,
  department: DepartmentReducer,
  shift: ShiftReducer,
  holiday: HolidayReducer,
  contract: ContractReducer,
  employee: EmployeeReducer,
  personTax: PersonTaxReducer,
  kindOfOvertime: KindOfOverTimeReducer,
  declareOvertime: DeclareOverTimeReducer,
  authentication: AuthenticationReducer,
  timesheet: TimesheetReducer,
  timekeeping: TimekeepingReducer,
  role: RoleReducer,
  detailContract: DetailContractReducer,
  leaveDeclare: LeaveDeclareReducer,
  salaryCal: SalaryCalReducer,
});
