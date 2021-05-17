import { useTableModalForm } from '@/hooks/table/table-modal-form';
import type { Shop } from '@/models/shop';
import type { ActionType } from '@ant-design/pro-table';
import { useRef } from 'react';

export const useShopList = () => {
  const tableActionRef = useRef<ActionType>();
  const { visible, curFormData, openModal, onOk, onCancel } =
    useTableModalForm<Shop>(tableActionRef);

  return [
    {
      tableActionRef,
    },
    {
      visible,
      curFormData,
      openModal,
      onOk,
      onCancel,
    },
  ] as const;
};
