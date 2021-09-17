import React from 'react';
import { Form, Button, Input } from 'antd';
import HighLightCore from 'components/HighlightCore';

export interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const RichArea: React.FC<IProps> = ({ value = '', onChange }) => {
  return <HighLightCore onChange={onChange} value={value} />;
};

const WithAntdForm = () => {
  const [initVal] = React.useState({ test: 'init value' });
  const [formRef] = Form.useForm();

  const onFinish = async () => {
    formRef.getFieldsValue();
    await formRef.validateFields();
  };

  return (
    <Form
      form={formRef}
      name="customized_form_controls"
      layout="horizontal"
      onFinish={onFinish}
      initialValues={initVal}
    >
      <Form.Item
        name="test"
        label="自定义表单"
        rules={[{ message: 'reg rules test' }]}
      >
        <RichArea />
      </Form.Item>
      <Form.Item label="常规输入框">
        <Input />
      </Form.Item>
      <Form.Item label="自定义按钮">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WithAntdForm;
