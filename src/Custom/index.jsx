import React from 'react';
import { Form, Button, Input } from 'antd';
import App from '../App';

const RichArea = ({ value, onChange }) => {
  return <App onChange={onChange} value={value} />;
};

const Demo = () => {
  const [initVal] = React.useState({ test: '66666' });
  const [formRef] = Form.useForm();

  const onFinish = async (values) => {
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
      <Form.Item label="自定义按钮">
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

export default Demo;
