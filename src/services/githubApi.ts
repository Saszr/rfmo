import { endpoint } from '@octokit/endpoint';
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

export const get_backup_file_sha = async () => {
  const rfmo = localStorage.getItem('rfmo')!;
  const login = JSON.parse(rfmo).github.owner.login;

  const treeOptions = endpoint('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
    owner: login,
    repo: 'rfmo-library',
    tree_sha: 'HEAD',
  });
  const files_tree = await octokitRequest(treeOptions);
  const backup_file = files_tree.tree.filter((item: { path: string }) => {
    return item.path === 'rfmoDB.backup.json';
  })[0];

  return backup_file.sha;
};

export const get_file_contents = async () => {
  const rfmo = localStorage.getItem('rfmo')!;
  const login = JSON.parse(rfmo).github.owner.login;

  const file_sha = await get_backup_file_sha();

  const options = endpoint('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
    owner: login,
    repo: 'rfmo-library',
    file_sha,
  });
  return await octokitRequest(options);
};

export const update_file_contents = async (curInputValue: string) => {
  const rfmo = localStorage.getItem('rfmo')!;
  const login = JSON.parse(rfmo).github.owner.login;

  const file_sha = await get_backup_file_sha().catch(() => {});

  const parameter: {
    message: string;
    content: string;
    sha?: string;
  } = {
    message: 'backup rfmo app',
    content: base64_encode(curInputValue),
  };

  if (file_sha) parameter.sha = file_sha;

  const options = endpoint('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: login,
    repo: 'rfmo-library',
    path: `rfmoDB.backup.json`,

    data: JSON.stringify(parameter),
  });
  return await octokitRequest(options);
};
