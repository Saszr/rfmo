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
      throw error.data;
    } else {
      throw error.message;
    }
  });
};

export default request;
