import type { Tip } from "../types/tip";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaHeart,
  FaUtensils,
  FaHome,
  FaLeaf,
} from "react-icons/fa";

type TipCardProps = Tip & {
  onDelete: (id: number) => void;
};

function TipCard({
  id,
  title,
  description,
  category,
  onDelete,
}: TipCardProps) {
  const user = localStorage.getItem("user");
  const currentUser = user ? JSON.parse(user) : null;

  const categoryStyle: Record<
    string,
    {
      icon: React.ReactNode;
      bg: string;
      text: string;
    }
  > = {
    "Sức khỏe": {
      icon: <FaHeart />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    "Nhà bếp": {
      icon: <FaUtensils />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    "Gia đình": {
      icon: <FaHome />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    "Làm vườn": {
      icon: <FaLeaf />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  };

  const style = categoryStyle[category] || {
    icon: "📖",
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  return (
    <div
      className="
      rounded-[28px]
      bg-white
      p-8
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >
      {/* Icon */}

      <div
        className={`flex h-20 w-20 items-center justify-center rounded-3xl text-4xl ${style.bg} ${style.text}`}
      >
        {style.icon}
      </div>

      {/* Category */}

      <span
        className={`mt-6 inline-block rounded-full px-4 py-2 text-sm font-semibold ${style.bg} ${style.text}`}
      >
        {category}
      </span>

      {/* Title */}

      <h2 className="mt-5 text-3xl font-bold text-slate-800 line-clamp-2">
        {title}
      </h2>

      {/* Description */}

      <p className="mt-4 line-clamp-3 text-lg leading-8 text-gray-500">
        {description}
      </p>

      {/* Buttons */}

      <div className="mt-8 flex flex-wrap gap-3">

        <Link
          to={`/tip/${id}`}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaEye />
          Xem
        </Link>

        {currentUser?.role === "admin" && (
          <>
            <Link
              to={`/edit-tip/${id}`}
              className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white transition hover:bg-yellow-600"
            >
              <FaEdit />
              Sửa
            </Link>

            <button
              onClick={() => onDelete(id)}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <FaTrash />
              Xóa
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default TipCard;