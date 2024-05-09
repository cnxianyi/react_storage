import React, { useState } from "react";
import {
	AutoComplete,
	Button,
	Cascader,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Segmented,
	Tabs,
  notification,
} from "antd";
import "./index.scss";
import classNames from "classnames";
import { useImmer } from "use-immer";

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};
const Login = () => {
	const [form] = Form.useForm();
	const onFinish = () => {
    if(isLogin){
      if(loginInfo.email && loginInfo.password){
        openNotification("登录成功!" , 'success')
        console.log(loginInfo);
      }else{
        openNotification("邮箱或密码错误!" , 'error')
      }
    }else{
      console.log(registerInfo);
      if(registerInfo.email && registerInfo.password && registerInfo.confirmPassword){
        openNotification("注册成功!" , 'success')
      }else{
        openNotification("邮箱或密码错误!" , 'error')
      }
    }
	};

  function openNotification(msg , type){
    if(type == 'success'){
      notification.success({
        message: msg,
        duration: 1,
      });
    }else if(type == 'error'){
      notification.error({
        message: msg,
        duration: 1,
      });
    }
    
  };

	const [isLogin, setIsLogin] = useState(true);

	const [loginInfo, setLoginInfo] = useImmer({
		email: "",
		password: "",
	});

	const [registerInfo, setRegisterInfo] = useImmer({
		email: "",
		password: "",
		confirmPassword: "",
		nickname: "",
		code: "",
	});

	return (
    
		<div className="login-container">
			<Form
				className="login"
				{...formItemLayout}
				form={form}
				name="login"
				style={{
					maxWidth: 338,
				}}
				scrollToFirstError
			>
				<Segmented
					className="form"
					type="card"
					style={{
						marginBottom: 20,
					}}
					size="large"
					onChange={(key) => {setIsLogin(!isLogin); console.log(key);}}
					options={["登录", "注册"]}
				/>
				<div className={classNames("form-content", { hidden: !isLogin })}>
					<Form.Item
						name="login_email"
						label=""
						rules={[
							{
								type: "email",
								message: "请输入正确的邮箱!",
							},
							{
								required: true,
								message: "请输入邮箱!",
							},
						]}
					>
						<AutoComplete placeholder="邮箱">
              <Input onChange={(value) => { setLoginInfo({...loginInfo , email: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="login_password"
						label=""
						rules={[
							{
								required: true,
								message: "请输入密码!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || (value.length >= 8 && value.length <= 20)) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("密码长度必须在8到20位之间")
									);
								},
							}),
						]}
					>
						<AutoComplete placeholder="密码">
							<Input.Password onChange={(value) => { setLoginInfo({...loginInfo , password: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button onClick={()=>{onFinish()}} type="primary" htmlType="submit" size="large">
							登录
						</Button>
					</Form.Item>
				</div>

				<div className={classNames("form-content ", { hidden: isLogin })}>
					<Form.Item
						name="register_email"
						label=""
						style={{
							width: "100%",
						}}
						rules={[
							{
								type: "email",
								message: "请输入正确的邮箱!",
							},
							{
								required: true,
								message: "请输入邮箱!",
							},
						]}
					>
						<AutoComplete placeholder="邮箱">
							<Input onChange={(value) => { setRegisterInfo({...registerInfo , email: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="register_password"
						label=""
						rules={[
							{
								required: true,
								message: "请输入密码!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || (value.length >= 8 && value.length <= 20)) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("密码长度必须在8到20位之间！")
									);
								},
							}),
						]}
					>
						<AutoComplete placeholder="密码">
							<Input.Password onChange={(value) => { setRegisterInfo({...registerInfo , password: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="register_confirm"
						label=""
						dependencies={["password"]}
						rules={[
							{
								required: true,
								message: "请再次输入密码!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("register_password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("密码不一致!"));
								},
							}),
						]}
					>
						<AutoComplete placeholder="确认密码">
							<Input.Password onChange={(value) => { setRegisterInfo({...registerInfo , confirmPassword: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="register_nickname"
						label=""
						rules={[
							{
								required: false,
								message: "",
								whitespace: true,
							},
						]}
					>
						<AutoComplete placeholder="你想让我们怎么称呼您">
							<Input onChange={(value) => { setRegisterInfo({...registerInfo , nickname: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="register_InvitationCode"
						label=""
						rules={[
							{
								required: false,
								message: "如果你有的话",
							},
						]}
					>
						<AutoComplete placeholder="邀请码，如果你有的话">
							<Input onChange={(value) => { setRegisterInfo({...registerInfo , code: value.target.value}) }} />
						</AutoComplete>
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button onClick={()=>{onFinish()}} type="primary" htmlType="submit" size="large">
							注册
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};
export default Login;
