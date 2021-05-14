import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useCallback, useEffect } from 'react';

export interface CustomModalFormTransformField {
  origin: 'string';
  transform: 'file';
}

export interface CustomModalFormProps<T> {
  title: string;
  visible: boolean;
  isEdit?: boolean;
  formData?: T;
  onOk: () => void;
  onCancel: () => void;
  submit: (data: T) => Promise<void>;
  transformField?: Record<string, CustomModalFormTransformField>;
}

export function useCustomModalForm<T>(props: Omit<CustomModalFormProps<T>, 'title'>) {
  const { formData, onOk, submit, transformField, isEdit } = props;
  const [form] = useForm<T>();

  const initFormData = useCallback(() => {
    if ((isEdit === undefined && !formData) || isEdit === false) {
      form.resetFields();
    } else {
      const initData = { ...formData };
      // 转换参数
      if (transformField) {
        Object.keys(transformField).forEach((key) => {
          if (transformField[key].transform === 'file') {
            initData[key] = [
              {
                name: initData[key],
                status: 'done',
              },
            ];
          }
        });
      }
      form.setFieldsValue(initData as any);
    }
  }, [form, formData, isEdit, transformField]);

  const onFinish = useCallback(
    async (data: T) => {
      try {
        // 转换参数
        const transformData = { ...data };
        if (transformField) {
          Object.keys(transformField).forEach((key) => {
            if (!transformData[key]) {
              return;
            }
            if (transformField[key].transform === 'file') {
              const value = data[key][0];
              transformData[key] = value.name;
            }
          });
        }
        await submit(transformData);
        message.success('操作成功');
      } catch {
        message.error('操作失败');
      }
      onOk();
    },
    [onOk, submit, transformField],
  );

  useEffect(() => {
    initFormData();
  }, [initFormData]);

  return {
    form,
    onFinish,
  } as const;
}
