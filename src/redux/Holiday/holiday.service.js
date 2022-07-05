import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import { getHolidayList, getHolidayListRefresh } from "./holiday.action";
const service = new Service();

export const useHolidayService = () => {
  const GetHolidayList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        const res = await service.get(ApiUrl.holiday, params);
        if (data.isRefresh) {
          dispatch(getHolidayListRefresh(res));
        } else {
          dispatch(getHolidayList(res));
        }
        if (onSuccess) return onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const addHoliday = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenNgayNghi", data.C_TenNgayNghi);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TuNgay", data.C_TuNgay);
        params.append("C_DenNgay", data.C_DenNgay);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.post(ApiUrl.holiday, params);
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
  //     const response = service.get(ApiUrl.holiday + `/${id}`);
  //     console.log(response);
  //   };
  // };

  const editHoliday = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new FormData();
        params.append("C_Code", data.C_Code);
        params.append("C_TenNgayNghi", data.C_TenNgayNghi);
        params.append("C_MoTa", data.C_MoTa);
        params.append("C_TuNgay", data.C_TuNgay);
        params.append("C_DenNgay", data.C_DenNgay);
        params.append("C_TrangThai", data.C_TrangThai);
        const res = await service.put(ApiUrl.holiday + `/${data.id}`, params);
        if (onSuccess) onSuccess(res);
        return res;
      } catch (error) {
        if (onError) onError(error);
        throw error;
      }
    };
  };

  const deleteHoliday = (id, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const res = await service.delete(ApiUrl.holiday + `/${id}`);
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
  //         const res: any = await service.put(ApiUrl.holiday, params);
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
    GetHolidayList,
    addHoliday,
    editHoliday,
    deleteHoliday,
    // GetEmailDetail,
    // UpdateEmail,
    // DeleteEmail,
    // RestoreEmail,
  };
};
