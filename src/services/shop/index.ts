import type { PaginationParams, PaginationData, HttpParams } from '@/http/request';
import { HttpUtils } from '@/http/request';
import type { Shop } from '@/models/shop';

const getShopPageList = async (params?: PaginationParams<HttpParams>) => {
  return HttpUtils.getJson<PaginationData<Shop>>('/shops', params);
};

export const ShopServices = {
  getShopPageList,
};
