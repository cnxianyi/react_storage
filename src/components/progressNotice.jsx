import React from "react";
import { Button, notification } from "antd";
import { CopyOutlined } from '@ant-design/icons';
import { Progress, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProgressNotice = ({ files = [] }) => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (files.length !== 0) {
      openNotification();
    }
  }, [files]);

  const conicColors = {
    "0%": "#87d068",
    "50%": "#ffe58f",
    "100%": "#108ee9",
  };

  const key = "updatable";

  const openNotification = () => {
    const temp = files.some((item) => item.percent !== 100);
    const isUploadComplete = !temp;

    const message = (
      <>
        {isUploadComplete ? (
          "上传完成!"
        ) : (
          <>
            正在上传 <Spin />
          </>
        )}
      </>
    );

    const description = isUploadComplete ? renderCompletedFiles(files) : renderUploadingFiles(files);
    
    api.open({
      key,
      placement: "bottomRight",
      message,
      description,
      duration: null,
    });
  };

  const renderCompletedFiles = (files) => {
    return (
      <>
        {files.map((item) => (
          <FileProgress key={item.name} item={item} isComplete={true} />
        ))}
      </>
    );
  };

  const renderUploadingFiles = (files) => {
    const temp = files.some((item) => item.status === 'error');
    return (
      <>
        {files.map((item) => (
          <FileProgress key={item.name} item={item} isComplete={false} hasError={item.status === 'error'} />
        ))}
        {temp && (
          <FileProgress
            item={{ name: "上传失败", percent: 100, status: "error" }}
            isComplete={false}
            hasError={true}
          />
        )}
      </>
    );
  };

  const handleLinkClick = (link) => {
    navigator.clipboard.writeText(`http://localhost:3098/api/files/`+link)
      .then(() => {
        console.log("复制成功");
      })
      .catch((error) => {
        console.error('Failed to copy link to clipboard:', error);
      });
  };

  const FileProgress = ({ item, isComplete, hasError }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          {item.name}
          <Progress
            percent={item.percent.toFixed(2)}
            strokeColor={conicColors}
            status={hasError ? "exception" : undefined}
          />
        </div>
        <div hidden={item.status === 'done' ? false : true}>
          <Button onClick={() => handleLinkClick(item.response.file.filename)} icon={<CopyOutlined />} />
        </div> 
        <br />
      </div>
    );
  };

  return <>{contextHolder}</>;
};

//handleLinkClick 待处理

export default ProgressNotice;