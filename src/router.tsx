import React from 'react';
import { set } from 'lodash-es';
import { useRoutes } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

/**
 * 根据 pages 目录生成路径配置
 */
function generatePathConfig(): Record<string, any> {
  const modules = import.meta.glob(`/src/pages/**/$*.{ts,tsx}`);

  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      .replace(`/src/pages/`, '')
      .replace(/.tsx?/, '')
      .replace(/\$\[([\w-]+)]/, ':$1')
      .replace(/\$([\w-]+)/, '$1')
      .split('/');
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}

/**
 * 为动态 import 包裹 lazy 和 Suspense
 */
function wrapSuspense(importer: () => Promise<{ default: React.ComponentType }>) {
  if (!importer) {
    return undefined;
  }
  const Component = React.lazy(importer);
  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

/**
 * 将文件路径配置映射为 react-router 路由
 */
function mapPathConfigToRoute(cfg: Record<string, any>): RouteObject[] {
  return Object.entries(cfg).map(([routePath, child]) => {
    if (typeof child === 'function') {
      const isIndex = routePath === 'index';
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        element: wrapSuspense(child),
      };
    }
    const { $, ...rest } = child;
    return {
      path: routePath,
      element: wrapSuspense($),
      children: mapPathConfigToRoute(rest),
    };
  });
}

function generateRouteConfig(): RouteObject[] {
  const { $, ...pathConfig } = generatePathConfig();
  return [
    {
      path: '/',
      element: wrapSuspense($),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}

const routeConfig = generateRouteConfig();

export default function PageRoutes() {
  return useRoutes(routeConfig);
}
