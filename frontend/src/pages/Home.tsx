import { useState } from "react";

import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedTips from "../components/FeaturedTips";

import {
  getAllTips,
  getTipsByCategory,
  searchTips,
} from "../services/tipService";

import type { Tip } from "../types/tip";

function Home() {

  const [tips, setTips] = useState<Tip[]>([]);

  // ======================
  // Hiện tất cả mẹo
  // ======================

  const loadTips = async () => {

    try {

      const data = await getAllTips();

      setTips(data.tips);

    } catch (error) {

      console.error(error);

    }

  };

  // ======================
  // Tìm kiếm
  // ======================

  const handleSearch = async (keyword: string) => {

    if (!keyword.trim()) {

      setTips([]);

      return;

    }

    try {

      const data = await searchTips(keyword);

      setTips(data);

    } catch (error) {

      console.error(error);

    }

  };

  // ======================
  // Chọn danh mục
  // ======================

  const handleCategory = async (id: number) => {

    try {

      if (id === 0) {

        await loadTips();

        return;

      }

      const data = await getTipsByCategory(id);

      setTips(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <>

      <Hero onSearch={handleSearch} />

      <CategorySection
        onSelectCategory={handleCategory}
      />

      {tips.length === 0 ? (

        <section className="py-24 text-center">

          <div className="mx-auto max-w-xl">

            <h2 className="text-4xl font-bold text-gray-700">

              Chưa có kết quả

            </h2>

            <p className="mt-5 text-lg text-gray-500">

              Hãy nhập từ khóa hoặc chọn một danh mục để khám phá
              các mẹo dân gian Việt Nam.

            </p>

          </div>

        </section>

      ) : (

        <section className="mx-auto max-w-7xl px-8 pb-20">

          <h2 className="mb-10 text-3xl font-bold text-gray-800">

            Kết quả tìm kiếm

          </h2>

          <FeaturedTips tips={tips} />

        </section>

      )}

    </>

  );

}

export default Home;