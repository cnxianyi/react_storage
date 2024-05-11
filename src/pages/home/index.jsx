import React from "react";
import { Flex, Layout, FloatButton } from "antd";
import "./index.scss";
const { Sider, Content } = Layout;
import {
	FontSizeOutlined,
	InboxOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import { _notice, getToken } from "@/utils";
import { getUserFilesAPI } from "@/apis/upload";
import { fetchUserInfo } from "@/store/user";
import axios from "axios";
import TopBar from "./topBar";
import ProgressNotice from "@/components/progressNotice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Outlet , useNavigate , useLocation } from 'react-router-dom'
//import _Drawer from "@/components/drawer";

const { Dragger } = Upload;

export default function Home() {
	const [customItems, setCustomItems] = useImmer([]);
  const dispatch = useDispatch()
	const [files, setFiles] = useImmer([]);

  const info = useSelector( state => state.user.userInfo)
  //console.log(info); // {id:0}
	const customItemRender = (originNode, file, customItems) => {
		return;
	};
  

  // const [drawOpen, setDrawOpen] = useImmer(false);
  // const [drawUrl , setDrawUrl] = useImmer('')

	const props = {
		name: "file",
		multiple: true,
		action: "http://localhost:3098/api/uploads/add",
		onChange(info) {
			const validFiles = info.fileList.filter(file => file.status);
      console.log(validFiles); // 只显示有状态的文件列表
      setFiles(validFiles); // 更新状态，只包含有status属性的文件
      
			const { status } = info.file;

			if (status == "uploading") {

			}
			if (status === "done") {
        //console.log(info.file.response.file.destination+info.file.response.file.filename);
        // setDrawOpen(true)
			} else if (status === "error") {
        _notice(info.file.response.err , "error")
			}
		},
    headers: {
      Authorization: `${getToken() ? "Bearer " +getToken() : ''}`, // 将 token 添加到请求头中
    },
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
		progress: {
			strokeColor: {
				"0%": "#108ee9",
				"100%": "#87d068",
			},
		},
		// fileList: customItems,
		itemRender: customItemRender,
    beforeUpload(file){
      const maxSize = info.id === 0 ? 5 * 1024 * 1024 : 500 * 1024 * 1024; // 5MB 或 500MB

      if (file.size > maxSize) {
        const errorMessage = info.id === 0
          ? "游客仅能上传一个文件，登录的话能上传更多哦!(^ワ^＝)"
          : "文件大小不能超过500MB哦";
        _notice(errorMessage, "error");
        return false; // 取消上传
      }
      return true;
    }
	};

	return (
		<>
			<Flex gap="middle" wrap>
				<Layout className="layout new">
        <Outlet></Outlet>
					<div className="content">
						<Dragger {...props} className="ant-upload-dragger">
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">可直接拖拽文件到页面上以发送</p>
							<p className="ant-upload-hint">
								可直接按 Ctrl+V 以发送剪贴板中的内容
							</p>
              <p className="ant-upload-hint" hidden={info.id != 0}>
								欢迎您: 游客<br />您仅能在本站上传一个不超过5MB的文件，想要上传更多或更大的文件还请登录哦
							</p>
              <p className="ant-upload-hint" hidden={info.id == 0}>
								欢迎您: {info.nickname}<br />您能在本站上传不限数量且文件大小小于500MB的文件
							</p>
              <p className="ant-upload-hint" hidden={info.id == 0}>
							您已经在 XIANYI_STORAGE 上传了: <strong>{(info.uploaded_file_size/1048576).toFixed(2)}</strong> MB
							</p>
						</Dragger>
					</div>
				</Layout>
        <TopBar></TopBar>
			</Flex>
			<ProgressNotice files={files}></ProgressNotice>
      {/* <_Drawer open={drawOpen} url={drawUrl}></_Drawer> */}
		</>
	);
}
