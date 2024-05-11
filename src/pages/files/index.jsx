import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm, message, Tag } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import "./index.scss"; // 导入样式文件
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useImmer } from "use-immer";
import { getFilesList } from "@/apis/file";
import { Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { deleteFile } from "@/apis/file";

const { Column } = Table;
const { Search } = Input;

const App = () => {
	const info = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const timerRef = useRef(null);
	const [fileListShow, setFileListShow] = useImmer(true);
	const [filesInit, setFilesInit] = useImmer([]);

	const handleLinkClick = (link) => {
		navigator.clipboard
			.writeText(`http://localhost:3098/api/files/${link}`)
			.then(() => {
				message.success("复制成功");
			})
			.catch((error) => {
				console.error("Failed to copy link to clipboard:", error);
				message.error("复制失败");
			});
	};

	useEffect(() => {
		if (info.id === 0) {
			timerRef.current = setTimeout(() => {
				navigate("/login");
			}, 1500);
		} else {
			getFilesList().then((res) => {
				setFilesInit(res.data.file);
			});
			setFileListShow(false);
		}

		// 清理函数
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [info]);

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
  const inputRef = React.useRef(null);

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (dataIndex, placeholder , inputRef) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => {


      return (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={placeholder}
            value={selectedKeys[0]}
            ref={inputRef}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              size="small"
              style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </Space>
        </div>
      );
    },
		filterIcon: (filtered) => (
			<SearchOutlined onClick={()=>{
        setTimeout(() => {
          if(inputRef.current){
            inputRef.current.focus()
          }
      }, 200);}}
				style={{ color: filtered ? "#1890ff" : undefined, padding: "0 10px" }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			),
	});

	const handleDelete = (id, index) => {
		deleteFile({ id: id, file_index: index }).then((res) => {
			setFileListShow(true);
			getFilesList().then((res) => {
				setFilesInit(res.data.file);
				setFileListShow(false);
				message.success(res.message);
			});
		});
	};

	return (
		<div className="table-container">
			<Table
				dataSource={filesInit}
				pagination={{ hideOnSinglePage: true }}
				loading={fileListShow}
				scroll={{ x: true }}
				tableLayout="fixed"
			>
				<Column
					title="文件名"
					dataIndex="file_name"
					key="fileName"
					fixed="left"
					{...getColumnSearchProps("file_name", "搜索文件名" , inputRef)}
					render={(text) => (
						<Tooltip title={decodeURIComponent(escape(text))}>
							<span
								style={{
									display: "inline-block",
									maxWidth: "100px",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{decodeURIComponent(escape(text))}
							</span>
						</Tooltip>
					)}
				/>
				<Column
					title="文件地址"
					dataIndex="file_index"
					key="fileAddress"
					render={(text, record) => (
						<>
							<div style={{ display: "flex", alignItems: "center" }}>
								<a
									style={{ flex: "1" }}
								>{`http://localhost:3098/api/files/${text}`}</a>
								<Button
									icon={<CopyOutlined />}
									onClick={() => handleLinkClick(text)}
								/>
							</div>
						</>
					)}
				/>
				<Column
					title="文件大小"
					dataIndex="file_size"
					key="fileSize"
					sorter={(a, b) => a.file_size - b.file_size}
					render={(text) => {
						let size = text / (1024 * 1024); // 将字节转换为 MB
						let unit = "MB";

						if (size < 1) {
							size = text / 1024; // 将字节转换为 KB
							unit = "KB";
						}

						return `${size.toFixed(2)} ${unit}`;
					}}
				/>
				<Column
					title="文件类型"
					dataIndex="file_name"
					key="fileType"
					render={(text) => {
						const fileType = text.substring(text.lastIndexOf(".") + 1);
						return fileType;
					}}
				/>
				<Column
					title="下载次数"
					dataIndex="download_count"
					key="downloadCount"
					sorter={(a, b) => a.download_count - b.download_count}
				/>
				<Column
    title="状态"
    dataIndex="is_banned"
    key="status"
    filters={[
        { text: "ban", value: "ban" },
        { text: "del", value: "del" },
        { text: "active", value: "action" },
    ]}
    defaultFilteredValue={['action', 'ban']}
    onFilter={(value, record) => {
        if(value === 'ban' && record.is_banned === 1){
            return record;
        } else if(value === 'del' && record.is_deleted === 1){
            return record;
        } else if(value === 'action' && record.is_deleted === 0 && record.is_banned === 0){
            return record;
        }
    }}
    render={(text, record) => {
        if (record.is_deleted === 0 && record.is_banned === 0) {
            return <Tag color="success">active</Tag>;
        } else if (record.is_banned === 1) {
            return <Tag color="warning">ban</Tag>
        } else if (record.is_deleted === 1) {
            return <Tag color="error">del</Tag>
        }
    }}
/>

				<Column
					title="文件版本"
					dataIndex="file_version"
					key="fileVersion"
					sorter={(a, b) => a.fileVersion - b.fileVersion}
				/>
				<Column title="云" dataIndex="cloud" key="cloud" />
				<Column
					title="上传时间"
					dataIndex="created_at"
					key="uploadTime"
					sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)}
					render={(text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss")} // 使用 Day.js 格式化时间，并设置时区为 UTC+8
				/>
				<Column
					fixed="right"
					title="操作"
					dataIndex="operation"
					key="operation"
					width={56}
					render={(text, record) => (
						<>
							{record.is_deleted !== 1 && (
								<Popconfirm
									title="确定删除?"
									onConfirm={() => handleDelete(record.id, record.file_index)}
								>
									<Button
										type="primary"
										size="small"
										danger
										icon={<DeleteOutlined />}
									/>
								</Popconfirm>
							)}
						</>
					)}
				/>
			</Table>
		</div>
	);
};

export default App;
