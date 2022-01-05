import React from 'react';

import { useRouter } from 'next/router';

import { Form, Input, Checkbox, Divider, Button, Table, message, Row } from 'antd';
import glob from "glob";

import { COLUMNS } from "../constants/table";
import { DEFAULT_IGNORE_LIST, DEFAULT_TARGET } from "../constants/default_entries";

const { Item } = Form;

export const getServerSideProps = ({ query }) => {
  let fileList = [];
  console.log(Object.keys(query).length);
  if (Object.keys(query).length) {
    const { target, ignoreList, hasDot } = query;
    const options = {
      ignore: ignoreList.length ? ignoreList.split(',') : [],
      dot: hasDot,
    };
    if (DEFAULT_TARGET?.[target]) {
      options.ignore = DEFAULT_IGNORE_LIST[target];
      const defaultTarget = DEFAULT_TARGET[target];
      for(let i = 0; i < defaultTarget.length; i++) {
        fileList = glob.sync(defaultTarget[i], options);
      }
    } else {
      fileList = glob.sync(target, options);
    }
  }

  return {
    props: {
      fileList,
      dir: __dirname,
      cwd: process.cwd(),
    }
  };
};

const Index = ({ fileList, dir, cwd }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  console.log(dir, cwd);

  const refreshData = (values) => {
    const { target, ignoreList = '', hasDot = false } = values;
    router.replace(`${router.pathname}?target=${target}&ignoreList=${ignoreList.split(' ').filter(Boolean).join(',')}&hasDot=${hasDot}`);
  }

  const handleOnSearch = values => {
    refreshData(values);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileList.toString().split(',').join('\n'));
    message.info('Copied');
  }

  return (
    <>
      <Form form={form} onFinish={values => handleOnSearch(values)}>
        <Item 
          name="target"
          label="Target Folder/File" 
          rules={[
            {
              required: true,
              message: 'Please input target folder/file',
            },
          ]}
          tooltip="if you input contentxite, it will automatically return all the services for contentxite, plus it will automatically add ignore folder/file list"
        >
          <Input placeholder="example: E:/Code/**/__buggy_tests__, contentxite" />
        </Item>
        <Divider orientation="left" plain={false}>
          Options
        </Divider>
        <Item 
          name="ignoreList"
          label="Ignore Folder/File"
          tooltip="if you ignore folder/file, the dot folder/file will always be true"
        >
          <Input placeholder="example: **/node_modules/** **/constants/** (splitted by space)" />
        </Item>
        <Item 
          name="hasDot"
          label="Include .dot Folder/File"
          tooltip="include files that has dot as the first character. example: .next"
          valuePropName="checked"
        >
          <Checkbox />
        </Item>
        <Row justify='end' style={{ marginBottom: 16 }}>
          <Button type='primary' htmlType='submit'>Search</Button>
        </Row>
      </Form>
      
      <Table dataSource={fileList} columns={COLUMNS} pagination={false} />
      <Row justify='end' style={{ marginTop: 16 }}>
        <Button onClick={copyToClipboard}>
          Copy Table Content to Clipboard
        </Button>
      </Row>
    </>
  );
};

export default Index;
