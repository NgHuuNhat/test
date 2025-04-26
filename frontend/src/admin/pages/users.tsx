import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { API_URL } from "../../apis/api";
import { Input, Upload, Button, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addUser, deleteUser, getUsers, updateUser } from "../../apis/apiUser";
import { getRoles } from "../../apis/apiRole";
import { useQuery } from "react-query";
import { getCategories } from "../../apis/apiCategories";
import dayjs from "dayjs";

export default function Users() {
  const { data: categoryData } = useQuery("categories", getCategories);
  const { data: roleData } = useQuery("roles", getRoles);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Phone", dataIndex: "phone", sorter: (a: any, b: any) => a.phone - b.phone },
    { title: "Username", dataIndex: "username", sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    // { title: "Name", dataIndex: "name", sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    // { title: "Email", dataIndex: "email", sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    {
      title: "Hình ảnh",
      render: (_: any, record: any) => (
        <img src={record.imageUrl} alt="" style={{ width: 30, height: 30, borderRadius: "50%" }} />
      )
    },
    {
      title: "Role",
      render: (_: any, record: any) => record.role?.name,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text: string) => dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
      sorter: (a: any, b: any) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),  // Định dạng ngày giờ
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      render: (text: string) => dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
      sorter: (a: any, b: any) => dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),  // Định dạng ngày giờ
    },
  ];

  const formFields = (form: any, fileList: any, setFileList: any, categories: any[] = [], roles: any[] = []) => (
    <>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Mật khẩu">
        <Input />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Upload
          listType="picture"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select placeholder="Chọn role">
          {roleData?.map((role: any) => (
            <Select.Option key={role.id} value={role.id}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );

  return (
    <DataTable
      title="Quản lý tài khoản"
      queryKey="users"
      fetchData={getUsers}
      addItem={addUser}
      updateItem={updateUser}
      deleteItem={deleteUser}
      columns={columns}
      formFields={formFields}
      categories={categoryData?.data}
      roles={roleData?.data}
      apiUrl={API_URL}
    />
  );
}

