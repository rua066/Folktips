import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "",password: "",});
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

  const newErrors = {
    email: "",
    password: "",
  };

   if (!email) {
    newErrors.email = "Vui lòng nhập email.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Email không hợp lệ.";
  }

  if (!password) {
    newErrors.password = "Vui lòng nhập mật khẩu.";
  } else if (password.length < 8) {
    newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
  }

  setErrors(newErrors);

  if (newErrors.email || newErrors.password) {
    return;
  }

  try {

    const data = await login(email, password);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    toast.success("Đăng nhập thành công!");

    navigate("/");

} catch (error: any) {

    toast.error(
    error.response?.data?.message ||
    "Đăng nhập thất bại!"
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
          Chào mừng bạn quay trở lại!
        </p>

        <form onSubmit={handleLogin}>
            <Input
                label="Email"
                type="email"
                placeholder="Nhập email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
            />

            <Input
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />

          <Button type="submit">
            Đăng nhập
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-700 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </Card>
    </div>
  );
}
export default Login;