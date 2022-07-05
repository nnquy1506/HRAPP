import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  getLeaveDeclareList,
  getLeaveDeclareListRefresh,
} from "./leaveDeclare.action";
const service = new Service();

export const useLeaveDeclareService = () => {
  const GetLeaveDeclareList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        data.start && params.append("C_NgayNghiPhep", data.start);
        data.end && params.append("Fk_NguoiDung", data.end);
        const res = await service.get(ApiUrl.leaveDeclare, params);
        if (data.isRefresh) {
          dispatch(getLeaveDeclareListRefresh(res));
        } else {
          dispatch(getLeaveDeclareList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addLeaveDeclare = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_NgayNghiPhep", data.C_NgayNghiPhep);
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        const res = await service.post(ApiUrl.leaveDeclare, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };
  const editLeaveDeclare = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_NgayNghiPhep", data.C_NgayNghiPhep);
        params.append("Fk_NguoiDung", data.Fk_NguoiDung);
        const res = await service.put(
          ApiUrl.leaveDeclare + `/${data.id}`,
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
  const deleteLeaveDeclare = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.leaveDeclare + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const statusLeaveDeclare = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.put(
          ApiUrl.leaveDeclare +
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
    GetLeaveDeclareList,
    addLeaveDeclare,
    editLeaveDeclare,
    deleteLeaveDeclare,
    statusLeaveDeclare,
  };
};
