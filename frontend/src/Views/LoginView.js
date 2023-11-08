import React from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";
import { isLoggedInSel, login } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Input, Button, message } from "antd";

export const LoginView = () => {
  const isLoggedIn = useSelector(isLoggedInSel);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onFail = (content) => {
    messageApi.open({
      type: "error",
      content,
      duration: 2.5,
    });
  };

  const onFinish = (values) => {
    dispatch(login(values, onFail));
  };

  if (isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" className="logInRow">
        <Col xs={24} md={12} lg={6}>
          <Card title="Log In">
            <Form
              labelCol={{
                span: 24,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className="rigthBtnContainer">
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
