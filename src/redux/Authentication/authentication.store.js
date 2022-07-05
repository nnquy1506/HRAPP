import Service from "../../services/api-services";
import { ApiUrl } from "../../constants/ApiUrl";

const service = new Service();

export const Login = async (data) => {
  try {
    const formData = new FormData();
    formData.append("CTaiKhoan", data.CTaiKhoan);
    formData.append("CMatKhau", data.CMatKhau);
    const res = await service.post(ApiUrl.Login, formData);
    return res;
  } catch (err) {
    return err;
  }
};

export const ChangePass = async (data, onSuccess, onError) => {
  try {
    const res = await service.put(
      ApiUrl.employee +
        `/DoiMatKhau/${data.id}?passwordOld=${data.passwordOld}&passwordNew=${data.passwordNew}`
    );
    if (onSuccess) onSuccess(res);
    return res;
  } catch (error) {
    if (onError) onError(error);
    throw error;
  }
};
