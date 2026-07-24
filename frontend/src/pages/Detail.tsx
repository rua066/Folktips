import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaLeaf,
  FaTag,
} from "react-icons/fa";

import type { Tip } from "../types/tip";

import { getTipById } from "../services/tipService";

import {
  saveFavorite,
  removeFavorite,
  checkFavorite,
} from "../services/favoriteService";
import {
    getComments,
    addComment,
} from "../services/commentService";
import {
    getRating,
    saveRating,
} from "../services/ratingService";

function Detail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [tip, setTip] = useState<Tip | null>(null);

  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [average, setAverage] = useState(0);

  const [totalRate, setTotalRate] = useState(0);

  const [myRate, setMyRate] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {

    loadTip();
    loadComments();
    loadRating();
  }, []);

  const loadTip = async () => {

    try {

      const data = await getTipById(Number(id));

      setTip(data);

      if (user) {

        const result = await checkFavorite(
          user.id,
          Number(id)
        );

        setSaved(result.data.saved);

      }

    } catch (err) {

      console.error(err);

    }

  };
  const loadComments = async () => {

    try {

        const data = await getComments(Number(id));

        setComments(data);

    } catch (err) {

        console.error(err);

    }

};

  const handleFavorite = async () => {

    if (!user) {

      alert("Bạn cần đăng nhập.");

      return;

    }

    if (!tip) return;

    try {

      if (saved) {

        await removeFavorite(user.id, tip.id);

        setSaved(false);

      } else {

        await saveFavorite(user.id, tip.id);

        setSaved(true);

      }

    } catch (err) {

      console.error(err);

    }

  };

 const handleComment = async () => {

    if (!user) {

        alert("Bạn cần đăng nhập.");

        return;

    }

    if (comment.trim() === "") {

        alert("Bạn chưa nhập bình luận.");

        return;

    }

    try {

        await addComment(

            user.id,

            tip!.id,

            comment

        );

        setComment("");

        loadComments();

    } catch (err) {

        console.error(err);

        alert("Không thể gửi bình luận.");

    }

};
const loadRating = async () => {

    try {

        const data = await getRating(Number(id));

        setAverage(data.average);

        setTotalRate(data.count);

    } catch (err) {

        console.error(err);

    }

};
const handleRate = async (star: number) => {

    if (!user) {

        alert("Bạn cần đăng nhập.");

        return;

    }

    try {

        await saveRating(

            user.id,

            Number(id),

            star

        );

        setMyRate(star);

        loadRating();

    } catch (err) {

        console.error(err);

    }

};
  

  if (!tip) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <h2 className="text-2xl font-semibold text-gray-500">

          Đang tải...

        </h2>

      </div>

    );

  }

  return (

    <section className="mx-auto max-w-5xl px-6 py-14">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
      >

        <FaArrowLeft />

        Quay lại

      </button>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-14 text-white">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20">

            <FaLeaf size={36} />

          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2">

            <FaTag />

            {tip.category}

          </div>

          <h1 className="text-5xl font-bold">

            {tip.title}

          </h1>

        </div>

        <div className="px-10 py-12">

          <p className="text-lg leading-9 text-gray-700">

            {tip.description}

          </p>

          <div className="mt-10">

    <div className="flex gap-2 text-4xl">

        {[1,2,3,4,5].map((star)=>(

            <button

                key={star}

                onClick={()=>handleRate(star)}

                className="transition hover:scale-110"

            >

                {star <= myRate ? "⭐" : "☆"}

            </button>

        ))}

    </div>

    <p className="mt-3 text-lg font-semibold text-gray-700">

        {average} / 5 ({totalRate} đánh giá)

    </p>

</div>
          <div className="mt-10 space-y-5">

    {comments.map((c) => (

        <div
            key={c.id}
            className="rounded-2xl border bg-white p-5"
        >

            <h3 className="font-bold text-blue-600">
    {c.user_name}
</h3>

<p className="mt-1 text-sm text-gray-400">
    {c.created_at}
</p>

<p className="mt-4 text-gray-700">
    {c.content}
</p>

            <p className="mt-3 text-gray-700">

                {c.content}

            </p>

        </div>

    ))}

</div>

          <button
            onClick={handleFavorite}
            className="mt-8 rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >

            {saved ? "❤️ Đã lưu" : "🤍 Lưu mẹo"}

          </button>

          <hr className="my-12" />

          <h2 className="text-3xl font-bold">

            Bình luận

          </h2>

          <div className="mt-8 rounded-2xl bg-gray-50 p-8">

            {!user ? (

              <p className="text-gray-500">

                Bạn cần đăng nhập để bình luận.

              </p>

            ) : (

              <>

                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  placeholder="Viết bình luận..."
                  className="h-36 w-full rounded-xl border p-4 outline-none"
                />

                <button
                  onClick={handleComment}
                  className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                  Gửi bình luận

                </button>
                <div className="mt-10 space-y-5">

    {comments.map((c) => (

        <div
            key={c.id}
            className="rounded-2xl border bg-white p-5"
        >

            <h3 className="font-bold text-blue-600">

                {c.user_name}

            </h3>

            <p className="text-sm text-gray-400">

                {c.created_at}

            </p>

            <p className="mt-3 text-gray-700">

                {c.content}

            </p>

        </div>

    ))}

</div>

              </>

            )}

          </div>

        </div>

      </div>

    </section>

  );

}

export default Detail;