import React from "react";
import {
	AutoComplete,
	Button,
	Form,
	Input,
	Segmented,
} from "antd";
import { useImmer } from "use-immer";
import { useDispatch } from "react-redux";
import { _notice, removeToken } from "@/utils";
import { useNavigate } from "react-router-dom";
import { editPassword } from "@/apis/user";
import { message } from "antd";
import { router } from "@/router";

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
    if(editInfo.oldPassword && editInfo.password && editInfo.confirmPassword){
      if(editInfo.oldPassword == editInfo.password){
        message.open({
          type: 'error',
          content: '原密码与新密码不可一致',
        });
        return
      }
      editPassword({
        oldPassword: editInfo.oldPassword,
        password: editInfo.password
      }).then( (res)=>{
        //console.log(res);
        if(res.message == 'success'){
          removeToken();
          message.open({
            type: 'success',
            content: '修改，即将跳转登录...',
          });
          setTimeout(() => {
            router.navigate('/login').then(() => {
              window.location.reload();
            });
          }, 1000);
        }
      })
    }else{
      return
    }
    
	};

	const [editInfo, setEditInfo] = useImmer({
		oldPassword: "",
		password: "",
		confirmPassword: "",
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
				<div style={{ display: 'grid', placeItems: 'center', marginBottom: 20 }}>
        <Segmented
          type="card"
          size="large"
          value={"修改密码"}
          options={["修改密码"]}
        />
      </div>
				<div className="form-content">
					<Form.Item
						name="edit_oldPassword"
						label=""
						rules={[
							{
								required: true,
								message: "请输入原密码!",
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
						<AutoComplete placeholder="原密码">
							<Input.Password
								onChange={(value) => {
									setEditInfo({ ...editInfo, oldPassword: value.target.value });
								}}
							/>
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="edit_password"
						label=""
						rules={[
							{
								required: true,
								message: "请输入新密码!",
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
						<AutoComplete placeholder="新密码">
							<Input.Password
								onChange={(value) => {
									setEditInfo({ ...editInfo, password: value.target.value });
								}}
							/>
						</AutoComplete>
					</Form.Item>

					<Form.Item
						name="edit_confirm"
						label=""
						dependencies={["edit_password"]}
						rules={[
							{
								required: true,
								message: "请再次输入新密码!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("edit_password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("密码不一致!"));
								},
							}),
						]}
					>
						<AutoComplete placeholder="请确认新密码">
							<Input.Password
								onChange={(value) => {
									setEditInfo({
										...editInfo,
										confirmPassword: value.target.value,
									});
								}}
							/>
						</AutoComplete>
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button
							onClick={() => {
								onFinish();
							}}
							type="primary"
							htmlType="submit"
							size="large"
						>
							确认修改
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};
export default Login;
