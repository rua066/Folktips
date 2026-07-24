import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault();

    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
    ) {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (password.length < 8) {
        toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
    }

    if (password !== confirmPassword) {
        toast.error("Mật khẩu xác nhận không khớp!");
        return;
    }

    try {

        await register({
            full_name: name,
            email,
            password,
        });

        toast.success("Đăng ký thành công!");

        setTimeout(() => {
            navigate("/login");
        }, 1500);

    } catch (error: any) {

        toast.error(
            error.response?.data?.message ||
            "Đăng ký thất bại!"
        );

    }

};

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-100 px-4">
      <Card>
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-700">
           FolkTips
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Tạo tài khoản mới
        </p>

        <form onSubmit={handleRegister}>
          <Input
            label="Họ và tên"
            placeholder="Nhập họ và tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
         />

         <Input
           label="Email"
           type="email"
           placeholder="Nhập email..."
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />

         <Input
           label="Mật khẩu"
           type="password"
           placeholder="Nhập mật khẩu..."
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />

         <Input
           label="Xác nhận mật khẩu"
           type="password"
           placeholder="Nhập lại mật khẩu..."
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
         />

          <Button type="submit">
            Đăng ký
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;