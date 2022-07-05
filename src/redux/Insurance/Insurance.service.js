import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  filterInsuranceList,
  getInsuranceList,
  getInsuranceListRefresh,
} from "./Insurance.action";
const service = new Service();

export const useInsuranceService = () => {
  const GetInsuranceList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.insurance, params);
        if (data.isRefresh) {
          dispatch(getInsuranceListRefresh(res));
        } else {
          dispatch(getInsuranceList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addInsurance = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenBaoHiem", data.C_TenBaoHiem);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        params.append("C_TienBaoHiem", data.C_TienBaoHiem);
        const res = await service.post(ApiUrl.insurance, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editInsurance = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenBaoHiem", data.C_TenBaoHiem);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        params.append("C_TienBaoHiem", data.C_TienBaoHiem);
        const res = await service.put(ApiUrl.insurance + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteInsurance = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.insurance + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetInsuranceList,
    addInsurance,
    editInsurance,
    deleteInsurance,
  };
};
