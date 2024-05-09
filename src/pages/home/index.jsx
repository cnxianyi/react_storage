import React from "react";
import { Flex, Layout , FloatButton } from "antd";
import "./index.scss";
const { Sider, Content } = Layout;
import { FontSizeOutlined, InboxOutlined , UserSwitchOutlined} from "@ant-design/icons";
import { message, Upload } from "antd";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import { _notice } from "@/utils";

import { getUserFilesAPI } from "@/apis/user";
import axios from "axios";
import TopBar from "./topBar";
import ProgressNotice from "@/components/progressNotice";

const { Dragger } = Upload;

export default function Home(){

  const [customItems, setCustomItems] = useImmer([]);

  const [files, setFiles] = useImmer([]);


  useEffect( ()=>{
    getUserFilesAPI().then( (res)=>{
      console.log(res);
      setCustomItems([...res])
    })
  },[])

  const customItemRender = (originNode, file, customItems) => {
    return
  };
  

  const props = {
    name: "file",
    multiple: true,
    action: "http://localhost:3098/api/uploads/add",
    onChange(info) {

      console.log(info.file); // name percent
      info.fileList
      setFiles([...info.fileList]);
      const { status } = info.file;
      
      console.log(status);
      if (status == "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
      } else if (status === "error") {
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
    },
    // fileList: customItems,
    itemRender: customItemRender,
  };

  return (
    <>
      <Flex gap="middle" wrap>
		<Layout className="layout new">
      <div className="content">
				<Dragger 
        {...props}
         className="ant-upload-dragger">
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
  <TopBar></TopBar>
  <ProgressNotice files={files}></ProgressNotice>
    </>
  )
};
