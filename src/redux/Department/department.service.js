import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  filterDepartmentList,
  getDepartmentListRefresh,
  getDepartmentLists,
  getOptionDepartment,
} from "./department.action";
const service = new Service();

export const useDepartmentService = () => {
  const GetDepartmentList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.department, params);
        if (data.isRefresh) {
          dispatch(getDepartmentListRefresh(res));
        } else {
          dispatch(getDepartmentLists(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addDepartment = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenPhongBan", data.C_TenPhongBan);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.department, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editDepartment = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenPhongBan", data.C_TenPhongBan);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(
          ApiUrl.department + `/${data.id}`,
          params
        );
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteDepartment = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.department + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const GetOptionDepartmentList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.department, params);
        const result = (res.items || []).map((item) => {
          return {
            label: item.c_TenPhongBan,
            value: item.id,
          };
        });
        dispatch(getOptionDepartment(result));
        if (onSuccess) return onSuccess(result);
        return result;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetDepartmentList,
    addDepartment,
    editDepartment,
    deleteDepartment,
    GetOptionDepartmentList,
  };
};
