import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import {
  filterTimeKeeperList,
  getTimeKeeperListRefresh,
  getTimeKeeperLists,
} from "./timeKeeper.action";
const service = new Service();

export const useTimeKeeperService = () => {
  const GetTimeKeeperList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize + "");
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.timeKeeper, params);
        if (data.isRefresh) {
          dispatch(getTimeKeeperListRefresh(res));
        } else {
          dispatch(getTimeKeeperLists(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addTimeKeeper = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenMayChamCong", data.C_TenMayChamCong);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.timeKeeper, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  // const GetEmailDetail = (id) => {
  //   return (dispatch) => {
  //     const response = service.get(ApiUrl.timeKeeper + `/${id}`);
  //     console.log(response);
  //   };
  // };

  const editTimeKeeper = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenMayChamCong", data.C_TenMayChamCong);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(
          ApiUrl.timeKeeper + `/${data.id}`,
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

  const deleteTimeKeeper = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.timeKeeper + `/${id}`);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  //   const RestoreEmail = (id: number, onSuccess?: any, onError?: any) => {
  //     return async (dispatch: any) => {
  //       try {
  //         const params = new URLSearchParams();
  //         params.append("id", id + "");
  //         const res: any = await service.put(ApiUrl.timeKeeper, params);
  //         if (res && res.content) {
  //           dispatch(
  //             editEmailList({
  //               items: res.content || [],
  //               totalItems: (res.content && res.content.totalItemCount) || 0,
  //             })
  //           );
  //         }
  //         if (onSuccess) onSuccess(res);
  //         return res;
  //       } catch (error) {
  //         if (onError) onError(error);
  //         throw error;
  //       }
  //     };
  //   };

  return {
    GetTimeKeeperList,
    addTimeKeeper,
    editTimeKeeper,
    deleteTimeKeeper,
    // GetEmailDetail,
    // UpdateEmail,
    // DeleteEmail,
    // RestoreEmail,
  };
};
