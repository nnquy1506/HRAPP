import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getDetailContractList,
  getDetailContractListRefresh,
  getOptionContract,
} from "./contract.action";
const service = new Service();

export const useDetailContractService = () => {
  const GetDetailContractList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.detailContract, params);
        console.log(res);
        if (data.isRefresh) {
          dispatch(getDetailContractListRefresh(res));
        } else {
          dispatch(getDetailContractList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addContract = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenLoaiHopDong", data.C_TenLoaiHopDong);
        params.append("C_MoTa", data.C_MoTa);
        // params.append("C_FileDinhKem", data.C_FileDinhKem);
        params.append("C_TrangThai", data.C_TrangThai);
        params.append("C_DongBaoHiem", data.C_DongBaoHiem);
        params.append("C_CoPhuCap", data.C_CoPhuCap);
        const res = await service.post(ApiUrl.detailContract, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editContract = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenLoaiHopDong", data.C_TenLoaiHopDong);
        params.append("C_MoTa", data.C_MoTa);
        // params.append("C_FileDinhKem", data.C_FileDinhKem);
        params.append("C_TrangThai", data.C_TrangThai);
        params.append("C_DongBaoHiem", data.C_DongBaoHiem);
        params.append("C_CoPhuCap", data.C_CoPhuCap);
        const res = await service.put(
          ApiUrl.detailContract + `/${data.id}`,
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

  const deleteContract = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.detailContract + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  return {
    GetDetailContractList,
    addContract,
    editContract,
    deleteContract,
  };
};
