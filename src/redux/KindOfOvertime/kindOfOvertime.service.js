import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getKindOfOverTimeListRefresh,
  getKindOfOverTimeLists,
} from "./kindOfOvertime.action";

const service = new Service();

export const useKindOfOverTimeService = () => {
  const GetKindOfOverTimeList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.kindOfOvertime, params);
        if (data.isRefresh) {
          dispatch(getKindOfOverTimeListRefresh(res));
        } else {
          dispatch(getKindOfOverTimeLists(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addKindOfOverTime = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_LoaiTangCa", data.C_LoaiTangCa);
        params.append("C_HeSo", data.C_HeSo);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.kindOfOvertime, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editKindOfOverTime = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_LoaiTangCa", data.C_LoaiTangCa);
        params.append("C_HeSo", data.C_HeSo);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(
          ApiUrl.kindOfOvertime + `/${data.id}`,
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

  const deleteKindOfOverTime = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.kindOfOvertime + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetKindOfOverTimeList,
    addKindOfOverTime,
    editKindOfOverTime,
    deleteKindOfOverTime,
  };
};
