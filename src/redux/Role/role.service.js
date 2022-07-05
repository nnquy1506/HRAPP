import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import { getRoleList, getRoleListRefresh } from "./role.action";
const service = new Service();

export const useRoleService = () => {
  const GetListRole = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.role, params);
        if (data.isRefresh) {
          dispatch(getRoleListRefresh(res));
        } else {
          dispatch(getRoleList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addRole = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenQuyen", data.C_TenQuyen);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.role, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const editRole = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenQuyen", data.C_TenQuyen);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(ApiUrl.role + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteRole = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.role + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  return {
    GetListRole,
    addRole,
    deleteRole,
    editRole,
  };
};
