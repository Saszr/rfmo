import { useLocalStorageState } from 'ahooks';

const useLocalData = () => {
  const [localData, setLocalData] = useLocalStorageState('rfmo', {
    defaultValue: {},
    serializer: (v) => {
      return JSON.stringify(v);
    },
    deserializer: (v) => {
      return JSON.parse(v);
    },
  });

  return [localData, setLocalData];
};

export default useLocalData;
