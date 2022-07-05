import { ApiUrl } from "../../constants/ApiUrl";
import Service from "../../services/api-services";
import { getTimesheetList, getTimesheetListRefresh } from "./timesheet.action";
const service = new Service();

export const useTimesheetService = () => {
  const GetTimesheetList = (data, onSuccess, onError) => {
    return async (dispatch) => {
      try {
        const params = new URLSearchParams();
        params.append("PageIndex", data.pageIndex + "");
        params.append("PageSize", data.pageSize);
        data.status && params.append("TrangThai", data.status);
        data.filter && params.append("KeyWord", data.filter);
        data.start && params.append("C_TuNgay", data.start);
        data.end && params.append("C_DenNgay", data.end);
        const res = await service.get(ApiUrl.timesheet, params);
        if (data.isRefresh) {
          dispatch(getTimesheetListRefresh(res));
        } else {
          dispatch(getTimesheetList(res));
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
    GetTimesheetList,
  };
};
