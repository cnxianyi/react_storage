import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://www.example.com/xxx.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://www.example.com/yyy.png',
  },
];

const CustomUpload = () => {
  const customItemRender = (originNode, file, fileList) => {
    console.log(file, fileList);
    return (
      <div key={file.uid}>
        <span>{file.name}</span>
        <Button type="link" size="small" onClick={() => handleRemove(file)}>
          删除1
        </Button>
      </div>
    );
  };

  const handleRemove = (file) => {
    console.log('Remove file:', file);
    // 处理删除文件逻辑
  };

  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      fileList={fileList}
      itemRender={customItemRender}
    >
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  );
};

export default CustomUpload;
