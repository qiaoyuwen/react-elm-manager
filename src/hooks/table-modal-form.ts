import type { ActionType } from '@ant-design/pro-table';
import type { MutableRefObject } from 'react';
import { useCallback, useState } from 'react';
import { useSwitch } from './boolean';

export function useTableModalForm<T>(tableActionRef: MutableRefObject<ActionType | undefined>) {
  const [visible, show, hide] = useSwitch(false);
  const [curFormData, setCurFormData] = useState<T>();

  const openModal = useCallback(
    (data?: T) => {
      setCurFormData(data ? { ...data } : undefined);
      show();
    },
    [show],
  );

  const onOk = useCallback(() => {
    hide();
    tableActionRef.current?.reload();
  }, [hide, tableActionRef]);

  const onCancel = useCallback(() => {
    hide();
  }, [hide]);

  return {
    visible,
    curFormData,
    openModal,
    onOk,
    onCancel,
  };
}
