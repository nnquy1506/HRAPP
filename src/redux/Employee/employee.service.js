import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getEmployeeInActiveList,
  getEmployeeInActiveListRefresh,
  getEmployeeList,
  getEmployeeListRefresh,
} from "./employee.action";
const service = new Service();

export const useEmployeeService = () => {
  const GetEmployeeList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.employee, params);
        console.log("active", res);
        if (data.isRefresh) {
          dispatch(getEmployeeListRefresh(res));
        } else {
          dispatch(getEmployeeList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const GetEmployeeInActiveList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", 1 + "");
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.employee, params);
        console.log("inactive", res);
        if (data.isRefresh) {
          dispatch(getEmployeeInActiveListRefresh(res));
        } else {
          dispatch(getEmployeeInActiveList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addEmployee = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Email", data.C_Email);
        params.append("C_MatKhau", data.C_MatKhau);
        params.append("C_HoVaTen", data.C_HoVaTen);
        params.append("C_SoDienThoai", data.C_SoDienThoai);
        params.append("C_Code", data.C_Code);
        params.append("Fk_ChucDanh", data.Fk_ChucDanh);
        params.append("Fk_PhongBan", data.Fk_PhongBan);
        params.append("C_GioiTinh", data.C_GioiTinh);
        params.append("C_EmailCaNhan", data.C_EmailCaNhan);
        params.append("C_NgaySinh", data.C_NgaySinh);
        params.append("C_TrangThai", data.C_TrangThai + "");
        params.append("Fk_DanhMucTenQuyen", data.Fk_DanhMucTenQuyen);
        params.append("Fk_CaLam", data.Fk_CaLam);
        params.append("Fk_TrinhDo", data.Fk_TrinhDo);
        params.append("C_SoNgayNghiPhep", data.C_SoNgayNghiPhep + "");
        params.append(
          "C_SoNgayNghiPhepDaSuDung",
          data.C_SoNgayNghiPhepDaSuDung + ""
        );
        params.append("C_TinhTrangHonNhan", data.C_TinhTrangHonNhan + "");
        params.append("C_TrangThaiLamViec", data.C_TrangThaiLamViec + "");
        params.append("C_Avatar", data.C_Avatar);
        const res = await service.post(ApiUrl.employee, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editEmployee = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Email", data.C_Email);
        params.append("C_HoVaTen", data.C_HoVaTen);
        params.append("C_SoDienThoai", data.C_SoDienThoai);
        params.append("C_Code", data.C_Code);
        params.append("Fk_ChucDanh", data.Fk_ChucDanh);
        params.append("Fk_PhongBan", data.Fk_PhongBan);
        params.append("C_GioiTinh", data.C_GioiTinh);
        params.append("C_EmailCaNhan", data.C_EmailCaNhan);
        params.append("C_NgaySinh", data.C_NgaySinh);
        params.append("C_TrangThai", data.C_TrangThai + "");
        params.append("Fk_DanhMucTenQuyen", data.Fk_DanhMucTenQuyen);
        params.append("Fk_CaLam", data.Fk_CaLam);
        params.append("Fk_TrinhDo", data.Fk_TrinhDo);
        params.append("C_SoNgayNghiPhep", data.C_SoNgayNghiPhep + "");
        params.append(
          "C_SoNgayNghiPhepDaSuDung",
          data.C_SoNgayNghiPhepDaSuDung + ""
        );
        params.append("C_TinhTrangHonNhan", data.C_TinhTrangHonNhan + "");
        params.append("C_TrangThaiLamViec", data.C_TrangThaiLamViec + "");
        params.append("C_Avatar", data.C_Avatar);
        const res = await service.put(ApiUrl.employee + `/${data.id}`, params);
        console.log("res", res);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteEmployee = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.employee + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetEmployeeList,
    addEmployee,
    editEmployee,
    deleteEmployee,
    GetEmployeeInActiveList,
  };
};
