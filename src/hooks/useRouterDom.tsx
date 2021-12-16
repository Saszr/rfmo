import { useNavigate, createSearchParams } from 'react-router-dom';

/**
 * const navigateSearch = useNavigateSearch(); navigateSearch('/mine', { source: '' });
 */
const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname: string, params: Record<string, any>) =>
    navigate(`${pathname}?${createSearchParams(params)}`);
};

export { useNavigateSearch };
