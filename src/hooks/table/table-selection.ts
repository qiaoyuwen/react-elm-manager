import { useCallback, useState } from 'react';

export const useTableSelection = (initialSelections: string[] = []) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(initialSelections);

  const onSelectionChange = useCallback((changeKeys: (string | number)[]) => {
    setSelectedKeys(changeKeys.map((key) => `${key}`));
  }, []);

  return [selectedKeys, onSelectionChange] as const;
};
