import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getContractDetailList,
  getContractDetailListRefresh,
  getContractList,
  getContractListRefresh,
  getOptionContract,
} from "./contract.action";
const service = new Service();

export const useContractService = () => {
  const GetContractList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.contract, params);
        if (data.isRefresh) {
          dispatch(getContractListRefresh(res));
        } else {
          dispatch(getContractList(res));
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
        const res = await service.post(ApiUrl.contract, params);
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
        const res = await service.put(ApiUrl.contract + `/${data.id}`, params);
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
        const res = await service.delete(ApiUrl.contract + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const GetContractDetailList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.contractDetail, params);
        if (data.isRefresh) {
          dispatch(getContractDetailListRefresh(res));
        } else {
          dispatch(getContractDetailList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addContractDetail = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_MucLuongCoBan", data.C_MucLuongCoBan);
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_DiaDiemLamViec", data.C_DiaDiemLamViec);
        params.append("C_NgayLap", data.C_NgayLap);
        params.append("C_TuNgay", data.C_TuNgay);
        params.append("C_DenNgay", data.C_DenNgay);
        params.append("C_TrangThai", data.C_TrangThai);
        params.append("Fk_NguoiDaiDien", data.Fk_NguoiDaiDien);
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        params.append("Fk_LoaiHopDong", data.Fk_LoaiHopDong);
        const res = await service.post(ApiUrl.contractDetail, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editContractDetail = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_MucLuongCoBan", data.C_MucLuongCoBan);
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_DiaDiemLamViec", data.C_DiaDiemLamViec);
        params.append("C_NgayLap", data.C_NgayLap);
        params.append("C_TuNgay", data.C_TuNgay);
        params.append("C_DenNgay", data.C_DenNgay);
        params.append("C_TrangThai", data.C_TrangThai);
        params.append("Fk_NguoiDaiDien", data.Fk_NguoiDaiDien);
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        params.append("Fk_LoaiHopDong", data.Fk_LoaiHopDong);
        const res = await service.put(
          ApiUrl.contractDetail + `/${data.id}`,
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

  const deleteContractDetail = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.contractDetail + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const GetOptionContractList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.contract, params);
        const result = (res.items || []).map((item) => {
          return {
            label: item.c_TenLoaiHopDong,
            value: item.id,
          };
        });
        dispatch(getOptionContract(result));
        if (onSuccess) return onSuccess(result);
        return result;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  return {
    GetContractList,
    addContract,
    editContract,
    deleteContract,
    GetOptionContractList,
    GetContractDetailList,
    addContractDetail,
    editContractDetail,
    deleteContractDetail,
  };
};
