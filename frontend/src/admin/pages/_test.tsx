import React from 'react'

export default function _test() {
    return (
        <div>_test</div>
    )
}


// import React, { useEffect, useState } from 'react'
// import { useQuery, useQueryClient } from 'react-query';
// import { addProduct, deleteProduct, getProducts, updateProduct } from '../services/apis/apiProducts';
// import { Container } from '@mui/material';
// import { Table, Button, message, Modal, Input, Select, Upload, Form } from "antd";
// import { UploadOutlined } from '@ant-design/icons'
// import { API_URL, getCategories } from '../services/apis/api';
// import axios from 'axios';

// export default function Products() {
//   const queryClient = useQueryClient();
//   const [products, setProducts] = useState<any[]>([]);
//   const [pagination, setPagination] = useState({ page: 1, pageSize: 5, total: 0 });
//   const [categories, setCategories] = useState<any[]>([]);
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState<any[]>([]);
//   const { data, isLoading, error } = useQuery(
//     ["products", { page: pagination.page, pageSize: pagination.pageSize }],
//     getProducts,
//     { keepPreviousData: true }
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<any>(null);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     if (data) {
//       setProducts(data?.data || []);
//       setPagination((prev) => ({
//         ...prev,
//         total: data?.meta?.pagination?.total || 0,
//       }));
//     }
//   }, [data]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const dataCate = await getCategories();
//       setCategories(dataCate.data);
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   }, [searchText]);

//   const handleAddOrUpdate = async (values: any) => {
//     try {
//       let imageId;

//       // Nếu user chọn ảnh mới
//       if (fileList[0]?.originFileObj) {
//         const formData = new FormData();
//         formData.append("files", fileList[0].originFileObj);

//         const uploadRes = await axios.post(`${API_URL}/api/upload`, formData);
//         imageId = uploadRes.data[0].id;
//       }
//       // Nếu không chọn ảnh mới, dùng lại ảnh cũ
//       else if (editingProduct?.image[0]?.id) {
//         imageId = editingProduct.image[0].id;
//       }

//       const newValues = {
//         ...values,
//         image: imageId ? imageId : null, // nếu không có ảnh luôn thì để null
//       };

//       if (editingProduct) {
//         await updateProduct(editingProduct.documentId, newValues);
//         message.success("Cập nhật sản phẩm thành công!");
//       } else {
//         await addProduct(newValues);
//         message.success("Thêm sản phẩm thành công!");
//       }

//       setIsModalOpen(false);
//       form.resetFields();
//       setFileList([]);
//       queryClient.invalidateQueries("products");
//     } catch (error) {
//       console.error("Lỗi khi thêm/cập nhật:", error);
//       message.error("Có lỗi xảy ra khi thêm/cập nhật sản phẩm.");
//     }
//   };

//   const handleDelete = (id: any) => {
//     Modal.confirm({
//       title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
//       content: "Hành động này không thể hoàn tác.",
//       okText: "Xóa",
//       okType: "danger",
//       cancelText: "Hủy",
//       onOk: async () => {
//         try {
//           await deleteProduct(id);
//           message.success("Sản phẩm đã được xóa thành công!");
//           if (products.length === 1 && pagination.page > 1) {
//             setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
//           }
//           queryClient.invalidateQueries("products");
//         } catch (error) {
//           message.error("Có lỗi xảy ra khi xóa sản phẩm.");
//         }
//       },
//     });
//   };

//   const handlePagination = (pagi: any) => {
//     setPagination({ page: pagi.current, pageSize: pagi.pageSize, total: pagination.total });
//   };

//   const handleOk = () => {
//     form.submit();
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     form.resetFields();
//     setFileList([]);
//   };

//   const getIndex = (index: number) => {
//     return index + 1 + (pagination.page - 1) * pagination.pageSize;
//   };

//   const filteredProducts = products?.filter((product) => {
//     const keyword = searchText.toLowerCase();
//     return (
//       product.name?.toLowerCase().includes(keyword) ||
//       product.price?.toString().includes(keyword) ||
//       product.documentId?.toLowerCase().includes(keyword) ||
//       product.category?.name?.toLowerCase().includes(keyword)
//     );
//   });

//   const productsWithSTT = filteredProducts?.map((product, index) => ({
//     ...product,
//     stt: getIndex(index),
//   }));

//   const columns = [
//     { title: "STT", key: "stt", render: (_: any, record: any) => record.stt, sorter: (a: any, b: any) => a.stt - b.stt },
//     { title: "ID", dataIndex: "documentId", key: "documentId" },
//     { title: "TÊN", dataIndex: "name", key: "name", sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
//     { title: "GIÁ", dataIndex: "price", key: "price", sorter: (a: any, b: any) => a.price - b.price },
//     {
//       title: "HÌNH ẢNH",
//       render: (_: any, record: any) => (
//         <img src={record.imageUrl} alt="" width={30} height={30} style={{ borderRadius: "50%" }} />
//       ),
//     },
//     { title: "TỒN KHO", dataIndex: "stock", key: "stock", sorter: (a: any, b: any) => a.stock - b.stock },
//     // { title: "MÔ TẢ", dataIndex: "description", key: "description" },
//     {
//       title: "LOẠI", dataIndex: "category", key: "category",
//       render: (category: any) => category?.name,
//       sorter: (a: any, b: any) => a.category.name.localeCompare(b.category.name),
//     },
//     {
//       title: "HÀNH ĐỘNG",
//       render: (_: any, record: any) => (
//         <>
//           <Button onClick={() => {
//             setEditingProduct(record);
//             setIsModalOpen(true);
//             form.setFieldsValue({
//               name: record.name,
//               price: record.price,
//               category: record.category?.documentId,
//               description: record.description,
//               stock: record.stock,
//             });
//             setFileList(record.imageUrl ? [{
//               uid: '-1',
//               name: 'ảnh cũ',
//               status: 'done',
//               url: record.imageUrl,
//             }] : []);
//           }} color="primary" style={{ marginRight: '3px' }}>Sửa</Button>
//           <Button onClick={() => handleDelete(record.documentId)} danger>Xóa</Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Container>
//       <h3>Danh sách sản phẩm</h3>

//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//         <Button type="primary" onClick={() => {
//           setEditingProduct(null);
//           setIsModalOpen(true);
//           form.resetFields();
//           setFileList([]);
//         }}>+ Thêm</Button>

//         <Input.Search
//           placeholder="Tìm sản phẩm theo tên, giá, ID hoặc loại"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           allowClear
//           enterButton
//           style={{ maxWidth: 400 }}
//         />
//       </div>

//       <Table
//         columns={columns}
//         dataSource={productsWithSTT}
//         rowKey={(record) => record.documentId}
//         pagination={{
//           current: pagination.page,
//           pageSize: pagination.pageSize,
//           total: pagination.total,
//           showSizeChanger: true,
//           pageSizeOptions: ['5', '10', '20', '50', '100'],
//         }}
//         onChange={handlePagination}
//         footer={() => (
//           <div style={{ textAlign: 'left', fontWeight: 'bold' }}>
//             Tổng số lượng: {data?.meta?.pagination?.total}
//           </div>
//         )}
//       />

//       <Modal
//         title={editingProduct ? 'Cập nhật dữ liệu' : 'Thêm dữ liệu'}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form form={form} onFinish={handleAddOrUpdate}>
//           <Form.Item name="name" rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}>
//             <Input placeholder="Tên" />
//           </Form.Item>

//           <Form.Item name="price" rules={[{ required: true, message: 'Nhập giá!' }]}>
//             <Input placeholder="Giá" />
//           </Form.Item>

//           <Form.Item name="description">
//             <Input placeholder="Mô tả" />
//           </Form.Item>

//           <Form.Item name="category" rules={[{ required: true, message: 'Chọn loại sản phẩm!' }]}>
//             <Select placeholder="Chọn thể loại">
//               {categories.map((category: any) => (
//                 <Select.Option key={category.documentId} value={category.documentId}>
//                   {category.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="stock">
//             <Input placeholder="Tồn kho" />
//           </Form.Item>

//           <Form.Item label="Hình ảnh">
//             <Upload
//               listType="picture"
//               beforeUpload={() => false}
//               fileList={fileList}
//               onChange={({ fileList }) => setFileList(fileList)}
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Container>
//   );
// }
