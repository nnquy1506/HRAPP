import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import { getPersonTaxList, getPersonTaxListRefresh } from "./personTax.action";

const service = new Service();

export const usePersonTaxService = () => {
  const GetPersonTaxList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.personTax, params);
        if (data.isRefresh) {
          dispatch(getPersonTaxListRefresh(res));
        } else {
          dispatch(getPersonTaxList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addPersonTax = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_HieuLucTuNgay", data.C_HieuLucTuNgay);
        params.append("C_ThueSuat", data.C_ThueSuat);
        const res = await service.post(ApiUrl.personTax, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editPersonTax = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_GhiChu", data.C_GhiChu);
        params.append("C_HieuLucTuNgay", data.C_HieuLucTuNgay);
        params.append("C_ThueSuat", data.C_ThueSuat);
        const res = await service.put(ApiUrl.personTax + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deletePersonTax = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.personTax + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetPersonTaxList,
    addPersonTax,
    editPersonTax,
    deletePersonTax,
  };
};
