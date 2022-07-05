import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import { getLevelList, filterLevelList, getOptionLevel, getLevelListRefresh } from "./level.action";
const service = new Service();

export const useLevelService = () => {
  const GetLevelList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.level, params);
        if (data.isRefresh) {
          dispatch(getLevelListRefresh(res));
        } else {
          dispatch(getLevelList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addLevel = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenTrinhDo", data.C_TenTrinhDo);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.level, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editLevel = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenTrinhDo", data.C_TenTrinhDo);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(ApiUrl.level + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteLevel = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.level + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const GetOptionLevelList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.level, params);
        const result = (res.items || []).map((item) => {
          return {
            label: item.c_TenCaLam,
            value: item.id,
          };
        });
        dispatch(getOptionLevel(result));
        if (onSuccess) return onSuccess(result);
        return result;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  return {
    GetLevelList,
    addLevel,
    editLevel,
    deleteLevel,
    GetOptionLevelList,
  };
};
