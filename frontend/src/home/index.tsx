import { Button, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("Đăng xuất thành công!");
    navigate("/"); // về trang login
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Trang Home</h1>

      {/* ✅ Chỉ hiển thị nút Đăng xuất nếu user đã login */}
      {user && (
        <Button type="primary" danger onClick={handleLogout}>
          Đăng xuất
        </Button>
      )}
    </div>
  )
}
