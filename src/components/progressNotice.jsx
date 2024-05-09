import React from "react";
import { Button, notification } from "antd";

import { Progress, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const conicColors = {
	"0%": "#87d068",
	"50%": "#ffe58f",
	"100%": "#108ee9",
};

const key = "updatable";
const ProgressNotice = ({ files = [] }) => {
	const [api, contextHolder] = notification.useNotification();
	const navigate = useNavigate();
	useEffect(() => {
		if (files.length !== 0) {
			openNotification(true);
		}
	}, [files]);

	const openNotification = () => {
		let temp = false;
		api.open({
			key,
			message: (
				<>
					正在上传 <Spin></Spin>
				</>
			),
			description: files.map((item) => {
				if (item.percent !== 100) {
					temp = true;
				}
				return (
					<>
						{item.name}{" "}
						<Progress
							percent={item.percent.toFixed(2)}
							strokeColor={conicColors}
						/>
						<br />
					</>
				);
			}),
			duration: null,
		});

		if (!temp) {
			api.open({
				key,
				message: "上传完成!",
				description: (
					<>
						{files.map((item) => {
							return (
								<>
									{item.name}{" "}
									<Progress
										percent={item.percent.toFixed(2)}
										strokeColor={conicColors}
									/>
									<br />
								</>
							);
						})}
						<p>是否前往查看文件?</p>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Button
								type="primary"
								onClick={() => {
									navigate("/files");
								}}
							>
								是
							</Button>
							<Button
								onClick={() => {
									console.log(1);
									api.open({
										key,
										message: "请继续选择文件!",
										description: (
											<>
												或<br />
												<br />
												<Button
													type="primary"
													onClick={() => {
														navigate("/files");
													}}
												>
													前往查看已上传文件
												</Button>
											</>
										),
										duration: 1,
									});
								}}
							>
								否，我还想继续上传
							</Button>
						</div>
					</>
				),

				duration: 4,
			});
		}
	};
	return <>{contextHolder}</>;
};
export default ProgressNotice;
