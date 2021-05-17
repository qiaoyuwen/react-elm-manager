import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useCallback, useEffect } from 'react';
import type { FormTransformField } from './utils';
import { transformFormValueToModel } from './utils';
import { transformModelToFormValue } from './utils';

export interface CustomFormHookProps<T> {
  visible: boolean;
  isEdit?: boolean;
  formData?: T;
  onOk: () => void;
  onCancel: () => void;
  submit: (data: T) => Promise<void>;
  transformFields?: Record<string, FormTransformField>;
}

export function useCustomForm<T>(props: CustomFormHookProps<T>) {
  const { formData, onOk, submit, transformFields, isEdit } = props;
  const [form] = useForm<T>();

  const initFormData = useCallback(() => {
    if ((isEdit === undefined && !formData) || isEdit === false) {
      form.resetFields();
    } else {
      form.resetFields();
      form.setFieldsValue(transformModelToFormValue(formData, transformFields) as any);
    }
  }, [form, formData, isEdit, transformFields]);

  const onFinish = useCallback(
    async (data: T) => {
      try {
        await submit(transformFormValueToModel(data));
        message.success('操作成功');
      } catch {
        message.error('操作失败');
      }
      onOk();
    },
    [onOk, submit],
  );

  useEffect(() => {
    initFormData();
  }, [initFormData]);

  return {
    form,
    onFinish,
  } as const;
}
