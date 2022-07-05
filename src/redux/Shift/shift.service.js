import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getOptionShift,
  getShiftList,
  getShiftListRefresh,
} from "./shift.action";
const service = new Service();

export const useShiftService = () => {
  const GetShiftList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.shift, params);
        if (data.isRefresh) {
          dispatch(getShiftListRefresh(res));
        } else {
          dispatch(getShiftList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addShift = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenCaLam", data.C_TenCaLam);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_BatDau", data.C_BatDau);
        params.append("C_KetThuc", data.C_KetThuc);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.shift, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editShift = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenCaLam", data.C_TenCaLam);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_BatDau", data.C_BatDau);
        params.append("C_KetThuc", data.C_KetThuc);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(ApiUrl.shift + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteShift = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.shift + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const GetOptionShiftList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.shift, params);
        const result = (res.items || []).map((item) => {
          return {
            label: item.c_TenCaLam,
            value: item.id,
          };
        });
        dispatch(getOptionShift(result));
        if (onSuccess) return onSuccess(result);
        return result;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetShiftList,
    addShift,
    editShift,
    deleteShift,
    GetOptionShiftList,
  };
};
