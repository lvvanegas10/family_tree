import React from 'react';
// Antd
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import 'antd/lib/form/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/spin/style/index.less';
const FormItem = Form.Item;

const DiagramButton = ({
  addParents,
  addWife,
  addHusband,
  addChildren,
  saveTree,
}) => (
  <div>
    <Form className="div-form">
      <FormItem>
        <Button
          type="default"
          className="login-form-button"
          block
          onClick={addParents}
        >
          Add parents
        </Button>
      </FormItem>
      <FormItem>
        <Button
          type="default"
          className="login-form-button"
          block
          onClick={addWife}
        >
          Add wife
        </Button>
      </FormItem>
      <FormItem>
        <Button
          type="default"
          className="login-form-button"
          block
          onClick={addHusband}
        >
          Add husband
        </Button>
      </FormItem>
      <FormItem>
        <Button
          type="default"
          className="login-form-button"
          block
          onClick={addChildren}
        >
          Add children
        </Button>
      </FormItem>
      <FormItem>
        <Button
          type="primary "
          className="login-form-button"
          block
          onClick={saveTree}
        >
          Save
        </Button>
      </FormItem>
    </Form>
  </div>
);

export default DiagramButton;
