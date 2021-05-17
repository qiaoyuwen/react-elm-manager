import type { CustomFormHookProps } from '@/hooks/form/custom-form';
import { useCustomForm } from '@/hooks/form/custom-form';
import { ModalForm } from '@ant-design/pro-form';
import type { PropsWithChildren } from 'react';

interface CustomModalFormProps<T> extends CustomFormHookProps<T> {
  title: string;
}

function CustomModalForm<T>(props: PropsWithChildren<CustomModalFormProps<T>>) {
  const { title, visible, onCancel } = props;
  const { form, onFinish } = useCustomForm(props);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <ModalForm<T>
      width={600}
      title={title}
      form={form}
      visible={visible}
      onFinish={onFinish}
      modalProps={{
        onCancel,
      }}
      layout="horizontal"
      {...formItemLayout}
    >
      {props.children}
    </ModalForm>
  );
}

export default CustomModalForm;
