import { endpoint } from '@octokit/endpoint';
import { nanoid } from 'nanoid';
import { encode as base64_encode } from 'js-base64';

import octokitRequest from './octokitRequest';

export const get_user = async () => {
  const options = endpoint('GET /user', {});
  return await octokitRequest(options);
};

export const get_user_repo = async () => {
  const { login } = await get_user();

  const options = endpoint('GET /repos/{owner}/{repo}', {
    owner: login,
    repo: 'rfmo-library',
  });
  return await octokitRequest(options);
};

export const get_user_repos = async () => {
  const options = endpoint('GET /user/repos', {});
  return await octokitRequest(options);
};

export const create_user_repo = async () => {
  const options = endpoint('POST /user/repos', {
    data: JSON.stringify({
      name: 'rfmo-library',
      private: true,
      description: 'Data storage for RFMO APP',
    }),
  });
  return await octokitRequest(options);
};

export const update_file_contents = async (curInputValue: string) => {
  const rfmo = localStorage.getItem('rfmo')!;
  const login = JSON.parse(rfmo).owner.login;

  const options = endpoint('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: login,
    repo: 'rfmo-library',
    path: `notes/${nanoid()}.raw`,

    data: JSON.stringify({
      message: 'test rfmo app',
      content: base64_encode(curInputValue),
    }),
  });
  return await octokitRequest(options);
};
