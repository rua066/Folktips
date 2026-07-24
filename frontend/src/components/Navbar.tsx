import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          FolkTips
        </Link>

        {/* Menu */}

        <nav className="flex items-center gap-8 text-lg font-medium">

          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Trang chủ
          </Link>

          {user && (
            <Link
              to="/add-tip"
              className="text-gray-700 transition hover:text-blue-600"
            >
              Thêm mẹo
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-gray-700 transition hover:text-blue-600"
            >
              Dashboard
            </Link>
          )}

        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-blue-600 px-5 py-2 text-blue-600 transition hover:bg-blue-50"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="rounded-xl border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
              >
                Hồ sơ
              </Link>

              <button
                onClick={logout}
                className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
              >
                Đăng xuất
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;