import React, { useState } from "react";
import { Form, Input, Button, AutoComplete, Segmented } from "antd";
import { useDispatch } from "react-redux";
import { fetchLogin, fetchRegister } from "@/store/user";
import { _notice } from "@/utils";
import { useNavigate } from "react-router-dom";
import "./index.scss"

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);

  const onFinish = (values) => {
    if (isLogin) {
      dispatch(fetchLogin(values))
      .then((res) => {
        if (res) {
          navigate('/'); // Redirect to home page
        }
      })
      .catch((error) => {
        // 在这里处理错误
        console.error('Login failed:', error);
      });
    } else {
      if (values.password !== values.confirmPassword) {
        _notice("密码不一致!", "error");
      } else {
        dispatch(fetchRegister(values))
          .then((res) => {
            if(res){
              setIsLogin(true);
              form.resetFields();
            }
          })
          .catch(error => _notice(error.message, 'error'));
      }
    }
  };

  return (
    <div className="login-container">
      <Form
        {...formItemLayout}
        form={form}
        name="login"
        onFinish={onFinish}
        scrollToFirstError
        className="login"
        style={{ maxWidth: 338 }}
      >
        <Segmented
          className="form-segment"
          type="card"
          style={{ marginBottom: 20 }}
          size="large"
          onChange={(key) => setIsLogin(key === "登录")}
          value={isLogin ? "登录" : "注册"}
          options={["登录", "注册"]}
        />
        {isLogin ? (
          <>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "请输入正确的邮箱!" },
                { required: true, message: "请输入邮箱!" },
              ]}
            >
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 8, max: 20, message: "密码长度必须在8到20位之间" },
              ]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "请输入正确的邮箱!" },
                { required: true, message: "请输入邮箱!" },
              ]}
            >
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 8, max: 20, message: "密码长度必须在8到20位之间" },
              ]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "请确认密码!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="确认密码" />
            </Form.Item>
          </>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">
            {isLogin ? "登录" : "注册"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
