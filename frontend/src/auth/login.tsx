import React, { useEffect } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { login } from "../apis/apiLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "../apis/apiUser";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect"); // lấy đường dẫn trước đó

  // ❌ Nếu đã đăng nhập → redirect ra ngoài
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    form.resetFields(); // 👈 Clear form khi trang được load
  }, []);

  const onFinish = async (values: any) => {
    try {
      const res = await login(values.identifier, values.password);
      message.success("Đăng nhập thành công!");

      const jwt = res.jwt;
      const userId = res.user.id;
      const userLogin = await getUserById(userId);

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userLogin));
      form.resetFields();

      // 🎯 Điều hướng theo phân quyền
      if (userLogin.role === "admin") {
        navigate("/admin");
      } else {
        // Nếu có `redirect` trong query string, điều hướng về trang đó
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          // Nếu không có `redirect`, quay về trang mặc định (ví dụ: trang chủ)
          navigate("/profile");
        }
      }
    } catch (err: any) {
      message.error(err.response?.data?.error?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Card title="Đăng nhập" style={{ width: 350 }}>
        <Form form={form} autoComplete="off" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="identifier"
            label="Username"
            rules={[{ required: true, message: "Vui lòng nhập email hoặc tên đăng nhập" }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Đăng nhập</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block onClick={() => navigate(-1)}>Trở về</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
