import type { RequestConfig } from 'umi';
import { errorHandler, requestInterceptor } from './interceptors';
import { request } from 'umi';
import { ContentType } from './constant';

export type HttpParams = Record<string, any> | URLSearchParams;

export interface ResponseData<T> {
  statusCode: number;
  message: string;
  error?: Record<string, string>;
  data: T;
}

async function getJson<T>(url: string, params?: HttpParams) {
  return request<ResponseData<T>>(url, {
    method: 'GET',
    params,
  });
}

async function getImageToBase64(url: string, params?: HttpParams): Promise<string> {
  return request(url, {
    method: 'GET',
    params,
    responseType: 'arrayBuffer',
  }).then(({ data }) => {
    return `data:image/png;base64,${btoa(
      new Uint8Array(data).reduce((resData, byte) => resData + String.fromCharCode(byte), ''),
    )}`;
  });
}

async function postJson<T>(url: string, data?: Record<string, any>) {
  return request<ResponseData<T>>(url, {
    method: 'POST',
    data,
  });
}

async function postFile<T>(url: string, data?: FormData) {
  return request<ResponseData<T>>(url, {
    method: 'POST',
    data,
    headers: {
      ...ContentType.formData,
    },
  });
}

async function deleteRequest(url: string, data?: Record<string, any>): Promise<void> {
  return request(url, {
    method: 'DELETE',
    data,
  });
}

export const HttpUtils = { getJson, postJson, postFile, getImageToBase64, deleteRequest };

const requestConfig: RequestConfig = {
  errorHandler,
  requestInterceptors: [requestInterceptor],
  prefix: '/api',
};

export default requestConfig;
