import React from "react";
import DataTable from "../components/DataTable";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/apis/apiProducts";
import { API_URL } from "../services/apis/api";
import { Input, Select, Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { getCategories } from "../services/apis/apiCategories";

export default function Products() {
  const { data: categoryData } = useQuery("categories", getCategories);

  const columns = [
    { title: "ID", dataIndex: "documentId" },
    { title: "Tên", dataIndex: "name", sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    { title: "Giá", dataIndex: "price", sorter: (a: any, b: any) => a.price - b.price },
    { title: "Tồn kho", dataIndex: "stock",sorter: (a: any, b: any) => a.stock - b.stock },
    {
      title: "Hình ảnh",
      render: (_: any, record: any) => (
        <img src={record.imageUrl} alt="" style={{ width: 30, height: 30, borderRadius: "50%" }} />
      )
    },
    {
      title: "Loại",
      render: (_: any, record: any) => record.category?.name
    }
  ];

  const formFields = (form: any, fileList: any, setFileList: any, categories: any[] = []) => (
    <>
      <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Loại" rules={[{ required: true }]}>
        <Select>
          {categories.map((c: any) => (
            <Select.Option key={c.documentId} value={c.documentId}>{c.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="stock" label="Tồn kho">
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
    </>
  );

  return (
    <DataTable
      title="Quản lý sản phẩm"
      queryKey="products"
      fetchData={getProducts}
      addItem={addProduct}
      updateItem={updateProduct}
      deleteItem={deleteProduct}
      columns={columns}
      formFields={formFields}
      categories={categoryData?.data}
      apiUrl={API_URL}
    />
  );
}
