import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const BASE_URL = "http://192.168.87.104:5000";
const BASE_URL = "http://103.145.63.159:5001";
const isHandlerEnabled = true;
const requestHandler = async (request, isHandlerEnabled) => {
  if (isHandlerEnabled) {
    request.headers.common["Content-Type"] = "application/json; charset=utf-8";
    request.headers.common["Accept"] =
      "application/json, text/javascript, */*; q=0.01";
    request.headers.common["Access-Control-Allow-Origin"] = "*";
  }
  let token = "";
  await AsyncStorage.getItem("accessToken").then((res) => (token = res));
  if (token) {
    request.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return request;
};

const successHandler = (response, isHandlerEnabled) => {
  if (isHandlerEnabled) {
    //TODO: Do Success Handler
  }

  return response;
};

const errorHandler = (error, isHandlerEnabled) => {
  if (isHandlerEnabled) {
    //TODO: Do Error Handler
  }

  return Promise.reject({
    ...(error.response
      ? error.response.data
      : error?.message === "ExpiredTime"
      ? {
          errorType: "ExpiredTime",
          errorMessage: "Expired Time",
        }
      : {
          errorType: "UnhandledException",
          errorMessage: "Unhandled Exception",
        }),
  });
};

export default class Service {
  constructor(namespace) {
    this.namespace = namespace;
    this.axios = axios.create({
      baseURL: BASE_URL,
      responseType: "json",
      timeout: 60000,
      timeoutErrorMessage: "ExpiredTime",
    });

    //Enable request interceptor
    this.axios.interceptors.request.use(
      (request) => requestHandler(request, isHandlerEnabled),
      (error) => errorHandler(error, isHandlerEnabled)
    );

    //Response and Error handler
    this.axios.interceptors.response.use(
      (response) => successHandler(response, isHandlerEnabled),
      (error) => errorHandler(error, isHandlerEnabled)
    );
  }

  /**
   * Get Http Request
   * @param {an} action
   */
  get(action, params) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(params ? action + "?" + params : action, {
          method: "GET",
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.error("REST request error!", error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }

  downloadFile(action, params, headers, options) {
    return new Promise((resolve, reject) => {
      let _headers = headers || {};
      const token = localStorage.getItem("token");
      if (token) {
        _headers.Authorization = `hris ${localStorage.getItem("token")}`;
      }
      const requestOptions = {
        ...(options || {}),
        headers: _headers,
      };
      fetch(
        `${BASE_URL}${params ? action + "?" + params : action}`,
        requestOptions
      )
        .then((res) => res.blob())
        .then((blob) => resolve(blob))
        .catch((err) => reject(err));
    });
  }

  postParams(action, params, body) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(params ? action + "?" + params : action, {
          method: "POST",
          data: body,
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.error("REST request error!", error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }

  /**
   * Post Http Request
   * @param {an} action
   * @param {an} params
   */
  post(action, params) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(action, {
          method: "POST",
          data: params,
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.error("REST request error!", error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }

  /**
   * Put Http Request
   * @param {an} action
   * @param {an} params
   */
  put(action, requestBody, params = null) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(params ? action + "?" + params : action, {
          method: "PUT",
          data: requestBody,
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.error("REST request error!", error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }
  /**
   *Delete Http Request
   * @param {an} action
   * @param {an} params
   */
  delete(action, params = null, requestBody) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(params ? action + "?" + params : action, {
          method: "DELETE",
          data: requestBody,
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.error("REST request error!", error.response.data.error);
            reject(error.response.data.error);
          } else reject(error);
        });
    });
  }
}
