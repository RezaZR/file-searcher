import React from 'react';

import { useRouter } from 'next/router';

import { Form, Input, Checkbox, Divider, Button, Table } from 'antd';
import glob from "glob";

import { COLUMNS } from "../constants/table";

const { Item } = Form;

export const getServerSideProps = ({ query }) => {
  let fileList = [];
  if (Object.keys(query).length) {
    const { target, ignoreList, hasDot, isAbsolutePath } = query;
    const options = {
      ignore: ignoreList.length ? ignoreList.split(',') : [],
      dot: hasDot,
      absolute: isAbsolutePath,
    };
    fileList = glob.sync(target, options);
  }

  return {
    props: {
      fileList,
    }
  };
};

const Index = ({ fileList }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const refreshData = (values) => {
    const { target, ignoreList = '', hasDot = false, isAbsolutePath = false } = values;
    router.replace(`${router.pathname}?target=${target}&ignoreList=${ignoreList.split(' ').filter(Boolean).join(',')}&hasDot=${hasDot}&isAbsolutePath=${isAbsolutePath}`);
  }

  const handleOnSearch = values => {
    refreshData(values);
  };

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
        >
          <Input placeholder="example: E:/Code/**/cache" />
        </Item>
        <Divider orientation="left" plain={false}>
          Options
        </Divider>
        <Item 
          name="ignoreList"
          label="Ignore Folder/File"
          tooltip="if you ignore folder/file, the dot folder/files will always be true"
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
        <Item 
          name="isAbsolutePath"
          label="Absolute Path"
          valuePropName="checked"
        >
          <Checkbox />
        </Item>
        <Button type='primary' htmlType='submit'>Search</Button>
      </Form>
      
      <Table dataSource={fileList} columns={COLUMNS} pagination={false} />
    </>
  );
};

export default Index;
