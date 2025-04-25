import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../apis/apiUser';
import { Button, message, Input, Card, Avatar, Upload, Descriptions, Typography, Row, Col, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { uploadImage } from '../../apis/apiUpload';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [fileList, setFileList] = useState<any[]>([]);
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const { Title, Text } = Typography;

  useEffect(() => {
    if (userStr) {
      const userProfile = JSON.parse(userStr);
      setProfile(userProfile);
      setFormData(userProfile);
    }
  }, []);

  const handleSave = async () => {
    try {
      let imageId;
      const isNewImage = fileList[0]?.originFileObj;

      // if (isNewImage) {
      //   const uploaded = await uploadImage(isNewImage);
      //   imageId = uploaded?.id;
      // } else if (profile?.image?.[0]?.id) {
      //   imageId = profile.image[0].id;
      // }

      const updatedData: any = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        // image: imageId ? [imageId] : [], // Gửi dưới dạng mảng ID nếu Strapi yêu cầu
      };

      // Nếu có ảnh mới hoặc đã có ảnh cũ → thêm vào `updatedData`
      if (isNewImage) {
        const uploaded = await uploadImage(isNewImage);
        const imageId = uploaded?.id;
        if (imageId) {
          updatedData.image = [imageId]; // Chỉ gửi khi có ảnh mới
          // window.dispatchEvent(new Event('userUpdated'));
        }
      }

      if (formData.password) {
        updatedData.password = formData.password;
      }

      console.log("updatedData", updatedData)

      await updateUser(profile.id, updatedData);
      const updatedUser = await getUserById(profile.id);

      setIsEditing(false);
      setProfile(updatedUser);
      setFormData(updatedUser); // Cập nhật lại formData
      setFileList([]);          // Reset fileList
      localStorage.setItem("user", JSON.stringify(updatedUser));
      // ⬅️ Bây giờ mới dispatch để đảm bảo `localStorage` đã được cập nhật
      window.dispatchEvent(new Event("userUpdated"));
      message.success("Thông tin đã được cập nhật!");

    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile); // reset lại thông tin
    setFileList([]);      // xóa ảnh tạm
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLogout"));
    message.success("Đăng xuất thành công!");
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-center">
      {!user ? (

        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <Button type="primary" onClick={() => navigate("/login")}>Đăng nhập</Button>
        </div>


      ) : (
        <Card
          title="Thông tin cá nhân"
          className="w-full max-w-4xl p-6 rounded-lg bg-white"
        >
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <Avatar
                size={360}
                src={
                  fileList.length > 0
                    ? URL.createObjectURL(fileList[0].originFileObj)
                    : profile?.image || "no image"
                }
              // className="border-4 border-gray-200"
              />
              {isEditing && (
                <Upload
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} className="mt-2">
                    Chọn ảnh
                  </Button>
                </Upload>
              )}
            </div>


            {/* Thông tin */}
            <div className="flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label>Tên</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Tài khoản</label>
                      <Input
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Số điện thoại</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Mật khẩu mới</label>
                      <Input.Password
                        value={formData.password || ""}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>ID</label>
                      <Input disabled value={profile?.id} />
                    </div>
                    <div>
                      <label>Role</label>
                      <Input disabled value={profile?.role} />
                    </div>
                  </>
                ) : (
                  <>
                    <Card
                      // title={<Title level={4}>Thông tin người dùng</Title>}
                      // bordered={false}
                      style={{
                        maxWidth: 800, margin: 'auto', border: 'none'
                        // boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                          <Text strong>Tên:</Text>
                          <br />
                          <Text>{profile?.name}</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Text strong>Tài khoản:</Text>
                          <br />
                          <Text>{profile?.username}</Text>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Text strong>Email:</Text>
                          <br />
                          <Text>{profile?.email}</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Text strong>Số điện thoại:</Text>
                          <br />
                          <Text>{profile?.phone}</Text>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Text strong>ID:</Text>
                          <br />
                          <Text>{profile?.id}</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Text strong>Vai trò:</Text>
                          <br />
                          <Text>{profile?.role}</Text>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Text strong>Ngày tạo:</Text>
                          <br />
                          <Text>{dayjs(profile?.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Text strong>Cập nhật:</Text>
                          <br />
                          <Text>{dayjs(profile?.updatedAt).format("DD/MM/YYYY HH:mm")}</Text>
                        </Col>
                      </Row>

                      {/* <Divider /> */}
                      {/* <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Text type="secondary" italic>
                          Được hiển thị bằng Ant Design ✨
                        </Text>
                      </div> */}
                    </Card>
                  </>
                )}
              </div>

              {/* Nút thao tác */}
              <div className="flex justify-end gap-3 mt-6">
                {isEditing ? (
                  <>
                    <Button onClick={handleCancel}>Hủy</Button>
                    <Button type="primary" onClick={handleSave}>Lưu</Button>
                  </>
                ) : (
                  <>
                    <Button type="primary" onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                    <Button type="primary" danger onClick={handleLogout}>
                      Đăng xuất
                    </Button>
                  </>
                )}

              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
