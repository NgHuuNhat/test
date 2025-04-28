import React, { ReactNode, useEffect, useState } from "react";
import { Table, Modal, Input, Button, Form, message, Pagination } from "antd";
import { uploadImage } from "../../apis/apiUpload";

interface Props {
  title: string;
  queryKey: string;
  fetchData: (params: any) => Promise<any>;
  addItem: (values: any) => Promise<any>;
  updateItem: (id: string, values: any) => Promise<any>;
  deleteItem: (id: string) => Promise<any>;
  columns: any[];
  formFields: (form: any, fileList: any, setFileList: any, categories?: any[], roles?: any[]) => ReactNode;
  categories?: any[];
  roles?: any[];
  apiUrl?: string;
}

const DataTable = ({
  title,
  queryKey,
  fetchData,
  addItem,
  updateItem,
  deleteItem,
  columns,
  formFields,
  categories = [],
  roles = [],
  apiUrl = "",
}: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, total: 0 });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!search) {
      fetchTableData();
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        setIsSearching(true);
        fetchAllDataForSearch();
      } else {
        setIsSearching(false);
        setAllData([]);
        fetchTableData();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const res = await fetchData({ page: pagination.page, pageSize: pagination.pageSize });
      setData(res.data);
      setPagination(prev => ({
        ...prev,
        total: res?.meta?.pagination?.total || 0,
      }));
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDataForSearch = async () => {
    setLoading(true);
    try {
      const res = await fetchData({ page: 1, pageSize: 10000 });
      setAllData(res.data);
    } catch {
      message.error("Lỗi khi tìm kiếm dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      let imageId;
      const isNewImage = fileList[0]?.originFileObj;
      if (isNewImage) {
        const uploaded = await uploadImage(isNewImage);
        imageId = uploaded?.id;
      } else if (editing?.image?.[0]?.id) {
        imageId = editing.image[0].id;
      }

      const payload = { ...values, image: imageId || null };
      const isUser = editing?.username !== undefined;
      const idToUse = isUser ? editing?.id : editing?.documentId;

      editing ? await updateItem(idToUse, payload) : await addItem(payload);
      message.success(`${editing ? "Cập nhật" : "Thêm"} thành công`);

      form.resetFields();
      setModalOpen(false);
      setEditing(null);
      setFileList([]);

      if (isSearching) {
        fetchAllDataForSearch();
      } else {
        fetchTableData();
      }
    } catch {
      message.error("Lỗi khi lưu dữ liệu");
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xoá?",
      onOk: async () => {
        await deleteItem(id);
        message.success("Đã xoá");
        fetchTableData();
        if (data.length === 1 && pagination.page > 1) {
          setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        }
      },
    });
  };

  const filteredData = isSearching
    ? allData.filter(item => {
      const searchValue = search.toLowerCase();
      const matchFlatFields = Object.values(item).some(val =>
        val?.toString().toLowerCase().includes(searchValue)
      );
      const matchCategory = item.category?.name?.toLowerCase().includes(searchValue);
      const matchRole = item.role?.name?.toLowerCase().includes(searchValue);
      return matchFlatFields || matchCategory || matchRole;
    })
    : data;

  return (
    <div className="pb-20 lg:pb-0 container mx-auto px-2">
      <h3 className="my-5 font-bold text-lg">{title}</h3>

      <div className="flex justify-between mb-4">
        <Button
          type="primary"
          onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}
          className="bg-blue-500 text-white"
        >
          + Thêm
        </Button>
        <Input.Search
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          enterButton
          className="w-full sm:w-64"
        />
      </div>

      <div className="overflow-x-auto">

        <Table
          rowKey="documentId"
          columns={[
            {
              title: "STT",
              key: "stt",
              render: (_: any, __: any, index: number) =>
                (pagination.page - 1) * pagination.pageSize + index + 1,
            },
            ...columns,
            {
              title: "Hành động",
              render: (_: any, record: any) => (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setEditing(record);
                      form.setFieldsValue({
                        ...record,
                        category: record.category?.documentId,
                        role: record.role?.id || null,
                      });
                      setFileList(record.imageUrl ? [{
                        uid: '-1',
                        name: 'ảnh cũ',
                        status: 'done',
                        url: record.imageUrl,
                      }] : []);
                      setModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white"
                  >
                    Sửa
                  </Button>
                  <Button
                    danger
                    onClick={() => handleDelete(record?.phone !== undefined ? record.id : record.documentId)}
                  >
                    Xoá
                  </Button>
                </div>
              ),
            },
          ]}
          dataSource={filteredData}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: isSearching ? filteredData.length : pagination.total,
            onChange: (page, pageSize) => setPagination({ ...pagination, page, pageSize }),
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            className: "w-full", // Đảm bảo pagination có chiều rộng đầy đủ
          }}
          loading={loading}
          footer={() => (
            <div className="text-left font-bold w-full">
              Tổng số lượng: {isSearching || filteredData?.[0]?.email ? filteredData.length : pagination.total}
            </div>
          )}
          className="w-full" // Đảm bảo table có chiều rộng đầy đủ
        />

        {/* Container bao bọc pagination và footer */}
        {/* <div className="w-full overflow-hidden">
          <Pagination
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={isSearching ? filteredData.length : pagination.total}
            onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
            showSizeChanger={true}
            pageSizeOptions={['5', '10', '20', '50', '100']}
            className="w-full"
          />
          <div className="w-full text-left font-bold">
            Tổng số lượng: {isSearching || filteredData?.[0]?.email ? filteredData.length : pagination.total}
          </div>
        </div> */}


      </div>

      <Modal
        title={editing ? "Cập nhật" : "Thêm"}
        open={modalOpen}
        onOk={() => form.submit()}
        onCancel={() => setModalOpen(false)}
        className="w-full sm:w-96"
        style={{ top: 0 }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {formFields(form, fileList, setFileList, categories, roles)}
        </Form>
      </Modal>
    </div>
  );
};

export default DataTable;
