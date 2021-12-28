/* eslint-disable no-console */
import umiRequest from 'umi-request';

import type { RequestMethod as umiRequestMethod } from 'umi-request';
import type { RequestOptions as octokitRequestOptions } from '@octokit/types';

interface RequestMethod {
  <T = any>(options: octokitRequestOptions): Promise<T>;
}

const request: RequestMethod = async (options) => {
  const { url, ...requestOptions } = options;
  return umiRequest(url, {
    ...requestOptions,
  } as unknown as umiRequestMethod).catch((error) => {
    if (error.response) {
      // 请求已发送但服务端返回状态码非 2xx 的响应
      // console.log(error.response.status);
      // console.log(error.data);
      throw error.data;
    } else {
      // 请求初始化时出错或者没有响应返回的异常
      throw error.message;
    }
  });
};

export default request;
