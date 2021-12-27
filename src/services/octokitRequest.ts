/* eslint-disable no-console */
import baseRequest from './baseRequest';
import type { RequestOptions as octokitRequestOptions } from '@octokit/types';

interface RequestMethod {
  <T = any>(options: octokitRequestOptions): Promise<T> | undefined;
}

const octokitRequest: RequestMethod = (options) => {
  const access_token = localStorage.getItem('rfmo');
  if (access_token) {
    const baseHeaders = {
      authorization: `token ${JSON.parse(access_token)}`,
    };

    return baseRequest({ ...options, headers: { ...baseHeaders, ...options.headers } });
  } else {
    console.group();
    console.log('请设置 access_token ');
    console.groupEnd();
  }
};

export default octokitRequest;
