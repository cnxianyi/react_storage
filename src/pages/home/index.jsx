import React from "react";
import { Flex, Layout } from "antd";
import "./index.scss";
const { Sider, Content } = Layout;
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useImmer } from "use-immer";
import { useEffect } from "react";

const { Dragger } = Upload;

const props = {
	name: "file",
	multiple: true,
	action: "http://localhost:3098/api/uploads/add",
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	},
};

export default function Home(){

  const [customItems, setCustomItems] = useImmer([]);

  useEffect( ()=>{
    console.log(1);
  },[])

  const customItemRender = (originNode, file, customItems) => {
    console.log(file);
    return (
       <div key={file.uid}></div>
    );
  };

  return (
    <Flex gap="middle" wrap>
		<Layout className="layout">
      <div className="content">
				<Dragger
        fileList={customItems}
        itemRender={customItemRender}
        {...props} className="ant-upload-dragger">
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">
          可直接拖拽文件到页面上以发送
					</p>
					<p className="ant-upload-hint">
          可直接按 Ctrl+V 以发送剪贴板中的内容
					</p>
				</Dragger>
			</div>
			
		</Layout>
	</Flex>
  )
};
