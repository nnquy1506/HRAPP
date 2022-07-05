import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getDetailSalaryCalList,
  getDetailSalaryCalListRefresh,
  getSalaryCalList,
  getSalaryCalListRefresh,
} from "./salaryCal.action";

const service = new Service();

export const useSalaryCalService = () => {
  const GetSalaryCalList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.salaryCal, params);
        if (data.isRefresh) {
          dispatch(getSalaryCalListRefresh(res));
        } else {
          dispatch(getSalaryCalList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addSalaryCal = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_TenDotTinhLuong", data.C_TenDotTinhLuong);
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_TuNgay", data.C_TuNgay);
        params.append("C_DenNgay", data.C_DenNgay);
        params.append("C_ThangNam", data.C_ThangNam);
        const res = await service.post(ApiUrl.salaryCal, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editSalaryCal = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_TenDotTinhLuong", data.C_TenDotTinhLuong);
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_TuNgay", data.C_TuNgay);
        params.append("C_DenNgay", data.C_DenNgay);
        params.append("C_ThangNam", data.C_ThangNam);
        const res = await service.put(ApiUrl.salaryCal + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteSalaryCal = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.salaryCal + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const statusSalaryCal = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.put(
          ApiUrl.salaryCal +
            `/CapNhatTrangThai/${data.id}?trangThai=${data.trangThai}`
        );
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const getDetailSalary = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        params.append("Fk_DotTinhLuong", data.Fk_DotTinhLuong);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.salaryDetailCal, params);
        if (data.isRefresh) {
          dispatch(getDetailSalaryCalListRefresh(res));
        } else {
          dispatch(getDetailSalaryCalList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  return {
    GetSalaryCalList,
    addSalaryCal,
    editSalaryCal,
    deleteSalaryCal,
    statusSalaryCal,
    getDetailSalary,
  };
};
