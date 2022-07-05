import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getDeclareOverTimeList,
  getDeclareOverTimeListRefresh,
} from "./declareOvertime.action";

const service = new Service();

export const useDeclareOverTimeService = () => {
  const GetDeclareOverTimeList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.declareOvertime, params);
        if (data.isRefresh) {
          dispatch(getDeclareOverTimeListRefresh(res));
        } else {
          dispatch(getDeclareOverTimeList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addDeclareOverTime = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_NgayTangCa", data.C_NgayTangCa);
        params.append("C_ThoiGianBatDau", data.C_ThoiGianBatDau);
        params.append("C_ThoiGianKetThuc", data.C_ThoiGianKetThuc);
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_SoGio", data.C_SoGio + "");
        params.append("C_TrangThai", 1 + "");
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        params.append("Fk_LoaiTangCa", data.Fk_LoaiTangCa);
        const res = await service.post(ApiUrl.declareOvertime, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editDeclareOverTime = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_NgayTangCa", data.C_NgayTangCa);
        params.append("C_ThoiGianBatDau", data.C_ThoiGianBatDau);
        params.append("C_ThoiGianKetThuc", data.C_ThoiGianKetThuc);
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_SoGio", data.C_SoGio + "");
        params.append("C_TrangThai", 1 + "");
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        params.append("Fk_LoaiTangCa", data.Fk_LoaiTangCa);
        const res = await service.put(
          ApiUrl.declareOvertime + `/${data.id}`,
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

  const deleteDeclareOverTime = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.declareOvertime + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const statusDeclareOverTime = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.put(
          ApiUrl.declareOvertime +
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
  return {
    GetDeclareOverTimeList,
    addDeclareOverTime,
    editDeclareOverTime,
    deleteDeclareOverTime,
    statusDeclareOverTime,
  };
};
