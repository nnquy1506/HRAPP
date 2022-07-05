import SCREEN_NAME from "./ScreenName";
import { COLORS } from "./Theme";

export const ManageCategorys = [
  {
    id: 1,
    nameList: "Loại phụ cấp",
    icon: "gift-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.ALLOWANCE_SCREEN,
    create: SCREEN_NAME.ALLOWANCE_CREATE_SCREEN,
  },
  {
    id: 2,
    nameList: "Chức danh",
    icon: "ribbon-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.JOB_TITLE_SCREEN,
    create: SCREEN_NAME.JOB_TITLE_CREATE_SCREEN,
  },
  {
    id: 2,
    nameList: "Phòng ban",
    icon: "people-circle-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.DEPARTMENT_SCREEN,
    create: SCREEN_NAME.DEPARTMENT_CREATE_SCREEN,
  },
  {
    id: 4,
    nameList: "Ngày nghỉ",
    icon: "airplane-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.HOLIDAY_SCREEN,
    create: SCREEN_NAME.HOLIDAY_CREATE_SCREEN,
  },
  {
    id: 5,
    nameList: "Máy chấm công",
    icon: "alarm-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.TIMEKEEPER_SCREEN,
    create: SCREEN_NAME.TIMEKEEPER_CREATE_SCREEN,
  },
  {
    id: 6,
    nameList: "Ca làm",
    icon: "timer-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.SHIFT_SCREEN,
    create: SCREEN_NAME.SHIFT_CREATE_SCREEN,
  },
  {
    id: 7,
    nameList: "Loại hợp đồng",
    icon: "briefcase-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.CONTRACT_SCREEN,
  },
  {
    id: 8,
    nameList: "Loại bảo hiểm",
    icon: "bed-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.INSURANCE_SCREEN,
    create: SCREEN_NAME.INSURANCE_CREATE_SCREEN,
  },
  {
    id: 9,
    nameList: "Trình độ",
    icon: "school-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.LEVEL_SCREEN,
    create: SCREEN_NAME.LEVEL_CREATE_SCREEN,
  },
];

export const ManageList = [
  {
    id: 1,
    nameList: "Danh mục",
    icon: "albums-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.MANAGE_CATEGORY,
  },
  {
    id: 4,
    nameList: "Tiền lương",
    icon: "cash-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.SALARY_CATEGORY_SCREEN,
  },
  {
    id: 2,
    nameList: "Quyền truy cập",
    icon: "hand-left-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.ROLE_SCREEN,
  },
];

export const gioiTinh = [
  { label: "Nam", value: 0 },
  { label: "Nữ", value: 1 },
];
export const trangThaiLamViec = [
  { label: "Đang làm", value: 2 },
  { label: "Đã nghỉ", value: 1 },
];
export const trangThai = [
  { label: "Sử dụng", value: 2 },
  { label: "Không sử dụng", value: 1 },
];
export const tinhTrangHonNhan = [
  { label: "Độc thân", value: 1 },
  { label: "Đã kết hôn", value: 2 },
];

export const SalaryCategoryList = [
  {
    id: 1,
    nameList: "Thuế thu nhập cá nhân",
    icon: "receipt-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.PERSON_TAX_SCREEN,
  },
  {
    id: 2,
    nameList: "Loại báo tăng ca",
    icon: "clipboard-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.KIND_OF_OVERTIME_SCREEN,
  },
  {
    id: 3,
    nameList: "Khai báo tăng ca",
    icon: "reader-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.DECLARE_OVERTIME_SCREEN,
  },
  {
    id: 4,
    nameList: "Khai báo nghỉ phép",
    icon: "alarm-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.LEAVE_SCREEN,
  },
  {
    id: 5,
    nameList: "Bảng tính lương",
    icon: "hourglass-outline",
    color: COLORS.primary,
    screen: SCREEN_NAME.SALARY_CAL_SCREEN,
  },
];
