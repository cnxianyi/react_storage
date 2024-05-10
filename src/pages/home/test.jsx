import React, { useMemo } from "react";
import {
	Button,
	Divider,
	InputNumber,
	notification,
	Space,
	Switch,
} from "antd";
const Context = React.createContext({
	name: "Default",
});
const App = () => {
	const [enabled, setEnabled] = React.useState(true);
	const [threshold, setThreshold] = React.useState(3);
  const handleLinkClick = (event) => {
    // 阻止默认行为，即阻止链接的访问
    event.preventDefault();

    // 获取链接的 href 属性值
    const link = event.target.href;

    // 复制链接到剪贴板
    navigator.clipboard.writeText(link)
      .then(() => {
        //console.log('Link copied to clipboard:', link);
      })
      .catch((error) => {
        //console.error('Failed to copy link to clipboard:', error);
      });
  };
	const [api, contextHolder] = notification.useNotification({
		stack: {threshold:1},
    top: 12,
	});
	const openNotification = () => {
		api.open({
			message: <>filename 上传完成，点击链接即可复制</>,
			description: <a href="http://localhost:3098/api/files/7beac6cee734c8f3fd69f4c5ff6b81886cf824f2.zip"
      title="点击复制链接"
      onClick={handleLinkClick}>
     http://localhost:3098/api/files/7beac6cee734c8f3fd69f4c5ff6b81886cf824f2.zip
   </a>,
			duration: null,
		});
	};
	const contextValue = useMemo(
		() => ({
			name: "Ant Design",
		}),
		[]
	);
	return (
		<Context.Provider value={contextValue}>
			{contextHolder}
			<div>
				<Space size="large">
					<Space
						style={{
							width: "100%",
						}}
					>
						<span>Enabled: </span>
						<Switch checked={enabled} onChange={(v) => setEnabled(v)} />
					</Space>
					<Space
						style={{
							width: "100%",
						}}
					>
						<span>Threshold: </span>
						<InputNumber
							disabled={!enabled}
							value={threshold}
							step={1}
							min={1}
							max={10}
							onChange={(v) => setThreshold(v || 0)}
						/>
					</Space>
				</Space>
				<Divider />
				<Button type="primary" onClick={openNotification}>
					Open the notification box
				</Button>
			</div>
		</Context.Provider>
	);
};
export default App;
