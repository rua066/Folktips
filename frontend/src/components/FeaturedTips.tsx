import TipCard from "./TipCard";
import { deleteTip } from "../services/tipService";
import type { Tip } from "../types/tip";
import { toast } from "react-toastify";
import { FaFire } from "react-icons/fa";

type FeaturedTipsProps = {
  tips: Tip[];
};

function FeaturedTips({ tips }: FeaturedTipsProps) {

  const handleDelete = async (id: number) => {

    const ok = window.confirm("Bạn có chắc muốn xóa?");

    if (!ok) return;

    try {

      await deleteTip(id);

      toast.success("Đã xóa mẹo!");

      window.location.reload();

    } catch (error) {

      console.error(error);

      toast.error("Xóa thất bại!");

    }

  };

  return (

    <section className="mx-auto mt-20 max-w-7xl px-6">

      {/* Header */}

      <div className="mb-12 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">

              <FaFire size={22}/>

            </div>

            <h2 className="text-4xl font-bold text-gray-800">

              Mẹo nổi bật

            </h2>

          </div>

          <p className="mt-3 text-lg text-gray-500">

            Những mẹo dân gian hữu ích dành cho cuộc sống hằng ngày.

          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {tips.map((tip) => (

          <TipCard
            key={tip.id}
            id={tip.id}
            title={tip.title}
            description={tip.description}
            image={tip.image}
            category={tip.category}
            onDelete={handleDelete}
          />

        ))}

      </div>

    </section>

  );

}

export default FeaturedTips;