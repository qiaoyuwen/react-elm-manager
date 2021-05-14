import type { RequestConfig } from 'umi';
import { errorHandler, requestInterceptor } from './interceptors';
import { extend } from 'umi-request';
import { ContentType } from './constant';

export type HttpParams = Record<string, any> | URLSearchParams;

const request = extend({
  prefix: '/api',
});

async function getJson<T>(url: string, params?: HttpParams): Promise<T> {
  return request<T>(url, {
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

async function postJson<T>(url: string, data?: Record<string, any>): Promise<T> {
  return request(url, {
    method: 'POST',
    data,
  });
}

async function postFile<T>(url: string, data?: FormData): Promise<T> {
  return request(url, {
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
};

export default requestConfig;
