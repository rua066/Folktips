import CategoryCard from "./CategoryCard";
import {
  FaHeart,
  FaUtensils,
  FaHome,
  FaLeaf,
  FaThLarge,
} from "react-icons/fa";

type CategorySectionProps = {
  onSelectCategory: (id: number) => void;
};

function CategorySection({ onSelectCategory }: CategorySectionProps) {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">

      {/* Header */}

      <div className="mb-12 text-center">

        <h2 className="text-4xl font-bold text-gray-800">
          Danh mục
        </h2>

        <p className="mt-3 text-lg text-gray-500">
          Chọn chủ đề mà bạn quan tâm
        </p>

      </div>

      {/* All */}

      <div className="mb-10 flex justify-center">

        <button
          onClick={() => onSelectCategory(0)}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-105
            hover:bg-blue-700
          "
        >
          <FaThLarge />
          Tất cả
        </button>

      </div>

      {/* Categories */}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        <CategoryCard
    icon={<FaHeart className="text-5xl text-red-600" />}
    title="Sức khỏe"
    color="bg-red-100"
    onClick={() => onSelectCategory(9)}
/>

<CategoryCard
    icon={<FaUtensils className="text-5xl text-yellow-600" />}
    title="Nhà bếp"
    color="bg-yellow-100"
    onClick={() => onSelectCategory(10)}
/>

<CategoryCard
    icon={<FaHome className="text-5xl text-blue-600" />}
    title="Gia đình"
    color="bg-blue-100"
    onClick={() => onSelectCategory(12)}
/>

<CategoryCard
    icon={<FaLeaf className="text-5xl text-blue-600" />}
    title="Làm vườn"
    color="bg-blue-100"
    onClick={() => onSelectCategory(11)}
/>

      </div>

    </section>
  );
}

export default CategorySection;