import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  filterAllowanceList,
  getAllowanceList,
  getAllowanceListRefresh,
} from "./allowance.action";

const service = new Service();

export const useAllowanceService = () => {
  const GetAllowanceList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.getListAllowance, params);
        if (data.isRefresh) {
          dispatch(getAllowanceListRefresh(res));
        } else {
          dispatch(getAllowanceList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addAllowance = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenPhuCap", data.C_TenPhuCap);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_GiaTri", data.C_GiaTri);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.getListAllowance, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editAllowance = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenPhuCap", data.C_TenPhuCap);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_GiaTri", data.C_GiaTri);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(
          ApiUrl.getListAllowance + `/${data.id}`,
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

  const deleteAllowance = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.getListAllowance + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const GetAllowanceEmployeeList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.allowanceEmployee, params);
        // console.log(res);
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        console.log("error");
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const addAllowanceEmployee = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = {
          fk_NguoiDung: data.id,
          fk_PhuCap: data.phuCap,
        };
        const res = await service.post(ApiUrl.allowanceEmployee, params);
        console.log("addEmployee", res);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetAllowanceList,
    addAllowance,
    editAllowance,
    deleteAllowance,
    addAllowanceEmployee,
    GetAllowanceEmployeeList,
  };
};
