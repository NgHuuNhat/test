import React, { useEffect } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { login } from "../apis/apiLogin";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apis/api";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
      const userRes = await fetch(`${API_URL}/api/users/${userId}?populate=role`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("userRes", userRes)

      const userWithRole = await userRes.json();
      const roleName = userWithRole.role?.name || "unknown";
      // Tạo user mới chỉ chứa role.name thay vì toàn bộ role object
      const simplifiedUser = {
        ...res.user,
        role: roleName,
      };
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(simplifiedUser));
      form.resetFields();

      // 🎯 Điều hướng theo phân quyền
      if (roleName === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
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
        </Form>
      </Card>
    </div>
  );
};

export default Login;
