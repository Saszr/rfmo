/* eslint-disable no-console */
import baseRequest from './baseRequest';
import type { RequestOptions as octokitRequestOptions } from '@octokit/types';

interface RequestMethod {
  <T = any>(options: octokitRequestOptions): Promise<T> | undefined;
}

const octokitRequest: RequestMethod = (options) => {
  const rfmo = localStorage.getItem('rfmo')!;
  const access_token = JSON.parse(rfmo).github.token;

  if (access_token) {
    const baseHeaders = {
      authorization: `token ${access_token}`,
    };

    return baseRequest({ ...options, headers: { ...baseHeaders, ...options.headers } });
  } else {
    console.group();
    console.log('请设置 access_token ');
    console.groupEnd();
  }
};

export default octokitRequest;
