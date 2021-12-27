/* eslint-disable no-console */
import umiRequest from 'umi-request';

import type { RequestOptionsInit } from 'umi-request';
import type { RequestOptions as octokitRequestOptions } from '@octokit/types';

interface RequestMethod {
  <T = any>(options: octokitRequestOptions): Promise<T>;
}

const request: RequestMethod = async (options) => {
  const { url, ...requestOptions } = options;
  return umiRequest(url, requestOptions as unknown as RequestOptionsInit).catch((err) => {
    console.log(err);
  });
};

export default request;
