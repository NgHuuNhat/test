import React, { useEffect, useState } from 'react'
import { addProduct, deleteProduct, getCategories, getProductImage, getProducts, updateProduct } from '../api/api';
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;

export default function ProductList() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const dataCate = await getCategories()
            console.log(dataCate)
            setCategories(dataCate)
            const data = await getProducts();
            setProducts(data);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdate = async (values: any) => {
        if (editingProduct) {
            console.log(editingProduct)
            await updateProduct(editingProduct.documentId, values);
        } else {
            await addProduct(values);
        }
        setIsModalOpen(false);
        loadProducts();
    };

    const handleDelete = async (id: any) => {
        console.log(id)
        await deleteProduct(id);
        loadProducts();
    };

    console.log(editingProduct)

    return (
        <div>
            <Button type="primary" onClick={() => { setEditingProduct(null); setIsModalOpen(true); form.resetFields(); }}>Thêm sản phẩm</Button>
            <Table dataSource={products} rowKey="id" loading={loading} columns={[
                {
                    title: "STT",
                    dataIndex: "documentId",
                    key: "stt",
                    render: (_: any, __: any, index: number) => index + 1,
                },
                { title: "documentID", dataIndex: "documentId", key: "documentId" },
                {
                    title: "Category", dataIndex: "category", key: "category",
                    render: (category: any) => category ? category.name : "Không có danh mục"
                },
                { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
                { title: "Giá", dataIndex: "price", key: "price" },
                { title: "Hình ảnh", dataIndex: "image", key: "image", render: (img: any) => <img src={getProductImage(img)} width={50} height={50} style={{ objectFit: "cover", border: '1px solid black', borderRadius: '50%' }} /> },
                {
                    title: "Hành động", key: "actions",
                    render: (_, record) => (
                        <>
                            <Button onClick={() => { setEditingProduct(record); setIsModalOpen(true); }}>Sửa</Button>
                            <Button danger onClick={() => handleDelete(record.documentId)}>Xóa</Button>
                        </>
                    )
                }
            ]} />

            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}
                afterOpenChange={(open) => {
                    if (open && editingProduct) {
                        form.setFieldsValue({
                            name: editingProduct.name,
                            price: editingProduct.price,
                            category: editingProduct.category?.documentId,
                        });
                    }
                }}>
                <Form form={form} onFinish={handleAddOrUpdate}>
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true }]}><InputNumber min={0} /></Form.Item>
                    <Form.Item name="category" label="Loại sản phẩm" rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}>
                        <Select placeholder="Chọn danh mục">
                            {categories.map((category) => (
                                <Option key={category.id} value={category.documentId}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
