import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  filterJobTitleList,
  getJobTitleList,
  getJobTitleListRefresh,
  getOptionJobTitle,
} from "./jobTitle.action";

const service = new Service();

export const useJobTitleService = () => {
  const GetJobTitleList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.jobTitle, params);
        if (data.isRefresh) {
          dispatch(getJobTitleListRefresh(res));
        } else {
          dispatch(getJobTitleList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addJobTitle = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenChucDanh", data.C_TenChucDanh);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.jobTitle, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editJobTitle = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenChucDanh", data.C_TenChucDanh);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(ApiUrl.jobTitle + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteJobTitle = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.jobTitle + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const GetOptionJobTitle = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.jobTitle, params);
        const result = (res.items || []).map((item) => {
          return {
            label: item.c_TenChucDanh,
            value: item.id,
          };
        });
        dispatch(getOptionJobTitle(result));
        if (onSuccess) return onSuccess(result);
        return result;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  return {
    GetJobTitleList,
    addJobTitle,
    editJobTitle,
    deleteJobTitle,
    GetOptionJobTitle,
  };
};
