import type { CustomModalFormProps } from '@/hooks/custom-modal-form';
import { useCustomModalForm } from '@/hooks/custom-modal-form';
import { ModalForm } from '@ant-design/pro-form';
import type { PropsWithChildren } from 'react';

function CustomModalForm<T>(props: PropsWithChildren<CustomModalFormProps<T>>) {
  const { title, visible, onCancel } = props;
  const { form, onFinish } = useCustomModalForm(props);
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
